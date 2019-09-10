import { call, cancelled, put, takeLatest } from 'redux-saga/effects'
import appfire from 'firebase/app'

import firebase from '@app/services/firebase'
import moment from 'moment'
import TripRedux from './TripRedux'
import UserRedux from '../User/UserRedux'

// Get informations about the currentTrip in Firebase
const tripRequest = function * () {
  try {
    // Get the uid of the current User
    const user = firebase.auth().currentUser
    let uid = null
    if (user != null) {
      uid = '3g99nlp3xQZM5oeNMJjX'
    } else {
      uid = '3g99nlp3xQZM5oeNMJjX'
    }

    // Get the corresponding trip from firebase
    const res = yield call(() => firebase.firestore().collection('trips').doc(uid).get())

    // Transform the data of tripPoints to read them in the View
    const tripPoints = res.data().tripPoints.map((point) => ({ lat: point.latitude, lng: point.longitude }))
    let tripInfo = res.data()

    yield put(TripRedux.Creators.tripSuccess({ ...tripInfo, tripPoints }))
  } catch (e) {
    yield put(TripRedux.Creators.requestFailure(e))
  } finally {
    if (yield cancelled()) {
      yield put(TripRedux.Creators.requestFailure())
    }
  }
}

// Get the number of all the trips in Firebase
const tripInfo = function * () {
  try {
    // Get all the trips stored in the collection
    const res = yield call(() => firebase.firestore().collection('trips').get())
    const tripInfo = {
      count: res.docs.length
    }
    yield put(TripRedux.Creators.tripInfoSuccess(tripInfo))
  } catch (e) {
    yield put(TripRedux.Creators.requestFailure(e))
  } finally {
    if (yield cancelled()) {
      yield put(TripRedux.Creators.requestFailure())
    }
  }
}

// Get all the data of the trips collection
const getTripsListRequest = function * ({ resolveCb }) {
  try {
    const response = yield call(() => firebase.firestore().collection('trips').get())

    const trips = response.docs.reduce((trips, tripsSnapshot) => {
      if (tripsSnapshot.data().status !== 'deactivated') {
        trips[tripsSnapshot.id] = ({ ...tripsSnapshot.data(), id: tripsSnapshot.id, formatDate: moment.unix(tripsSnapshot.data().date.seconds).format('YYYY-MM-DD') })
      }
      return trips
    }, {})

    yield put(TripRedux.Creators.getTripsListSuccess(trips))
  } catch (e) {
    yield put(TripRedux.Creators.requestFailure(e))
  } finally {
    if (resolveCb) {
      yield resolveCb()
    }
  }
}

// Delete the trip selected
const deleteTripRequest = function * ({ tid, resolveCb }) {
  try {
    // get the old Trip's data
    const oldTripData = yield firebase.firestore().collection('trips').doc(tid).get()
    // delete
    yield call(() => firebase.firestore().collection('trips').doc(tid).delete())

    const UserId = oldTripData.data().userId
    // get the old User's data
    const oldUserData = yield firebase.firestore().collection('user').doc(UserId).get()

    // update user collection
    yield firebase.firestore().collection('user').doc(UserId).update({
      distance: oldUserData.data().distance - oldTripData.data().distance,
      duration: oldUserData.data().duration - oldTripData.data().duration,
      trips: oldUserData.data().trips - 1
    })
    yield put(TripRedux.Creators.deleteTripSuccess())
  } catch (e) {
    yield put(TripRedux.Creators.requestFailure(e))
  } finally {
    if (resolveCb) {
      yield resolveCb()
    }
  }
}

// Update the trip with the new datas
const updateTripRequest = function * ({ formData, tid, resolveCb }) {
  try {
    // get the old trip's Data
    const oldTripData = yield firebase.firestore().collection('trips').doc(tid).get()

    // get the old User's data
    const oldUserData = yield firebase.firestore().collection('user').doc(formData.userId).get()
    // Mapping
    const tripPoints = formData.tripPoints.reduce((array, point) => {
      if (point.lat && point.lng) {
        array.push(new appfire.firestore.GeoPoint(point.lat, point.lng))
      }

      return array
    }, [])

    // Check if the entered uid exists
    yield put(UserRedux.Creators.getUsersById(formData.userId,
      (e) => {
        if (e) {
          resolveCb({ error: e })
        } else {
          // update the new Datas
          firebase.firestore().collection('trips').doc(tid).update({ ...formData, tripPoints })

          // get the new User's info
          const newDistance = (oldTripData.data().distance - formData.distance)
          const newDuration = (oldTripData.data().duration - formData.duration)

          // update user collection
          firebase.firestore().collection('user').doc(formData.userId).update({
            distance: oldUserData.data().distance - newDistance,
            duration: oldUserData.data().duration - newDuration
          })
          resolveCb({ error: null })
        }
      }))
  } catch (e) {
    yield put(TripRedux.Creators.requestFailure(e))
  }
}

// Add a new trip in firebase
const addTripRequest = function * ({ formData, resolveCb }) {
  try {
    // Check if the entered uid exists
    yield put(UserRedux.Creators.getUsersById(formData.userId,
      (e) => {
        if (e) {
          resolveCb({ error: e })
        } else {
          // Mapping for tripPoints format
          const tripPoints = formData.tripPoints.reduce((array, point) => {
            if (point.lat && point.lng) {
              array.push(new appfire.firestore.GeoPoint(point.lat, point.lng))
            }
            return array
          }, [])

          // add the trip
          firebase.firestore().collection('trips').add({ ...formData, tripPoints })
          resolveCb({ error: null })
        }
      }))

    // get the old User's data
    const oldUserData = yield firebase.firestore().collection('user').doc(formData.userId).get()

    // update user collection
    yield firebase.firestore().collection('user').doc(formData.userId).update({
      distance: oldUserData.data().distance + formData.distance,
      duration: oldUserData.data().duration + formData.duration,
      trips: oldUserData.data().trips + 1
    })
  } catch (e) {
    yield put(TripRedux.Creators.requestFailure(e))
  }
}

// MARK: export sagas
export default [
// sorted alphabetically Reducers, same Types/Creators order inside Reducer
  takeLatest(TripRedux.Types.TRIP_REQUEST, tripRequest),
  takeLatest(TripRedux.Types.TRIP_INFO, tripInfo),
  takeLatest(TripRedux.Types.GET_TRIPS_LIST_REQUEST, getTripsListRequest),
  takeLatest(TripRedux.Types.DELETE_TRIP_REQUEST, deleteTripRequest),
  takeLatest(TripRedux.Types.UPDATE_TRIP_REQUEST, updateTripRequest),
  takeLatest(TripRedux.Types.ADD_TRIP_REQUEST, addTripRequest)

]
