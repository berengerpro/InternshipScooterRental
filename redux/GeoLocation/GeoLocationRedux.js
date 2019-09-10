import { createActions, createReducer } from 'reduxsauce'
import { produce } from 'immer'
import { reducerPrefixFormat } from '../common'
import * as R from 'ramda'

const stateKey = 'geoLocation'

/* ------------- Initial State ------------- */
const INITIAL_STATE = {
  geolocation: null
}
Object.freeze(INITIAL_STATE)

const { Types, Creators } = createActions({
  geoLocationSuccess: ['geolocation'],
  watchGeoLocationChange: null,

  requestFailure: ['error']
}, {
  prefix: reducerPrefixFormat(stateKey)
})

/* ------------- Reducers ------------- */

const watchGeoLocationChange = R.identity

const geoLocationSuccess = (state, { geolocation }) =>
  produce(state, draft => {
    draft.geolocation = geolocation
  })

const requestFailure = R.identity

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
  [Types.GEO_LOCATION_SUCCESS]: geoLocationSuccess,
  [Types.WATCH_GEO_LOCATION_CHANGE]: watchGeoLocationChange,

  [Types.REQUEST_FAILURE]: requestFailure
})

const reducerMap = { [stateKey]: reducer }

/* ------------- Selectors ------------- */
const getReducerState = (state) => (state[stateKey])

/* ------------- Export ------------- */
export default {
  // default export
  INITIAL_STATE,
  Types,
  Creators,

  stateKey,
  getReducerState,
  reducerMap
}
