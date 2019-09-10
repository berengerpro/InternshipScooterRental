import { all, put, takeLatest } from 'redux-saga/effects'
import { AppRedux } from '../reducers'
import { startWatchingGeoLocation } from '../GeoLocation/GeoLocationSagas'

const initializeApp = function * () {
  // cache assets and register push ...
  yield all([
    put(AppRedux.Creators.cacheAssetsStart())
  ])
  yield put(AppRedux.Creators.setAppStateRestored())
  yield startWatchingGeoLocation()
}

const cacheAssetsStart = function * () {
  try {
    // yield cacheAssetsAsync()
    yield put(AppRedux.Creators.cacheAssetsFinish(null))
  } catch (e) {
    __DEV__ && console.warn(
      'There was an error caching assets (see: main.js), perhaps due to a ' +
      'network timeout, so we skipped caching. Reload the app to try again.'
    )
    __DEV__ && console.warn(e.message)
    yield put(AppRedux.Creators.cacheAssetsFinish(e))
  }
}

export default [
  takeLatest(AppRedux.Types.INITIALIZE_APP, initializeApp),
  takeLatest(AppRedux.Types.CACHE_ASSETS_START, cacheAssetsStart)
]
