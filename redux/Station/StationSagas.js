import { call, cancelled, put, takeLatest } from 'redux-saga/effects'
import appfire from 'firebase/app'
import firebase from '@app/services/firebase'
import StationRedux from './StationRedux'

const getStationsRequest = function * () {
  try {
    const stationsSnapshot = yield call(() => firebase.firestore().collection('stations').get())
    const stationDictionary = stationsSnapshot.docs.reduce((stationDict, st) => {
      stationDict[st.id] = { ...st.data(), id: st.id }
      return stationDict
    }, {})
    yield put(StationRedux.Creators.getStationsSuccess(stationDictionary))
  } catch (e) {
    yield put(StationRedux.Creators.requestFailure(e))
  } finally {
    if (yield cancelled()) {
      yield put(StationRedux.Creators.requestFailure())
    }
  }
}

const addStationRequest = function * ({ formData, resolveCb }) {
  let error
  const { name, address, latitude, longitude, number } = formData
  try {
    yield firebase.firestore().collection('stations').add({
      name,
      address,
      location: new appfire.firestore.GeoPoint(latitude, longitude),
      createdAt: new Date(),
      status: number > 0 ? 'available' : 'unavailable',
      number
    })
  } catch (e) {
    error = e
    yield put(StationRedux.Creators.requestFailure(e))
  } finally {
    if (yield cancelled()) {
      yield put(StationRedux.Creators.requestFailure())
    } else {
      yield put(StationRedux.Creators.addStationSuccess())
    }
    if (resolveCb) {
      yield resolveCb(error)
    }
  }
}

const editStationRequest = function * ({ stationId, formData, resolveCb }) {
  let error
  const { name, address, latitude, longitude, number } = formData
  try {
    const ref = firebase.firestore().collection('stations').doc(stationId)
    const station = yield ref.get()
    if (station.exists) {
      yield ref.update({
        name,
        address,
        location: new appfire.firestore.GeoPoint(latitude, longitude),
        number,
        status: number > 0 ? 'available' : 'unavailable'
      })
    } else {
      const err = { code: 'editStation/badURL', message: 'No station corresponding to the id in the URL' }
      throw err
    }
  } catch (e) {
    error = e
    yield put(StationRedux.Creators.requestFailure(e))
  } finally {
    if (yield cancelled()) {
      yield put(StationRedux.Creators.requestFailure())
    } else {
      yield put(StationRedux.Creators.editStationSuccess())
    }
    if (resolveCb) {
      yield resolveCb(error)
    }
  }
}

const deleteStationRequest = function * ({ stationId }) {
  yield firebase.firestore().collection('stations').doc(stationId).delete()
  yield put(StationRedux.Creators.deleteStationSuccess())
  yield put(StationRedux.Creators.getStationsRequest())
}

// Get the number of all the stations, and the number of available in Firebase
const getStationsInfo = function * () {
  try {
    // Get all the stations stored in the collection
    const res = yield call(() => firebase.firestore().collection('stations').get())
    const stationsNumber = res.docs.length

    const stationsAvailable = yield call(() => firebase.firestore().collection('stations').where('status', '==', 'available').get())

    const stationsInfo = {
      count: stationsNumber,
      available: stationsAvailable.docs.length
    }
    yield put(StationRedux.Creators.getStationsInfoSuccess(stationsInfo))
  } catch (e) {
    yield put(StationRedux.Creators.requestFailure(e))
  } finally {
    if (yield cancelled()) {
      yield put(StationRedux.Creators.requestFailure())
    }
  }
}

// MARK: export sagas
export default [
  // sorted alphabetically Reducers, same Types/Creators order inside Reducer
  takeLatest(StationRedux.Types.GET_STATIONS_REQUEST, getStationsRequest),
  takeLatest(StationRedux.Types.ADD_STATION_REQUEST, addStationRequest),
  takeLatest(StationRedux.Types.EDIT_STATION_REQUEST, editStationRequest),
  takeLatest(StationRedux.Types.DELETE_STATION_REQUEST, deleteStationRequest),
  takeLatest(StationRedux.Types.GET_STATIONS_INFO, getStationsInfo)
]
