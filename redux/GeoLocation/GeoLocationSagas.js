import { put, spawn, take, takeLatest } from 'redux-saga/effects'
import { channel } from 'redux-saga'
import GeoLocationRedux from './GeoLocationRedux'

const GeoLocationChannel = channel()

export const startWatchingGeoLocation = function * () {
  yield spawn(watchGeoLocationChannel)
  yield subscribeGeoLocationChange()
}

const subscribeGeoLocationChange = function * () {
  window.navigator.geolocation.watchPosition((position) => {
    GeoLocationChannel.put({ geoLocation: { lat: position.coords.latitude, lng: position.coords.longitude } })
  })
}

const watchGeoLocationChannel = function * () {
  while (true) {
    try {
      const { geoLocation } = yield take(GeoLocationChannel)
      yield put(GeoLocationRedux.Creators.geoLocationSuccess(geoLocation))
    } catch (e) {
      console.error(e.message)
    }
  }
}

export default [
  takeLatest(GeoLocationRedux.Types.WATCH_GEO_LOCATION_CHANGE, subscribeGeoLocationChange)
]
