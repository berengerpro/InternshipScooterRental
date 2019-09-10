import { createActions, createReducer } from 'reduxsauce'
import produce from 'immer'
import { reducerPrefixFormat } from '../common'
import * as R from 'ramda'

const stateKey = 'trip'

/* ------------- Initial State ------------- */
const INITIAL_STATE = {
  tripInfo: null,
  tripsList: {}
}
Object.freeze(INITIAL_STATE)

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  tripRequest: null,
  tripInfo: null,
  tripSuccess: ['tripInfo'],
  tripInfoSuccess: ['tripInfo'],

  getTripsListRequest: ['resolveCb'],
  getTripsListSuccess: ['tripsList'],

  deleteTripRequest: ['tid', 'resolveCb'],
  deleteTripSuccess: null,

  updateTripRequest: ['formData', 'tid', 'resolveCb'],
  updateTripSuccess: null,

  addTripRequest: ['formData', 'resolveCb'],
  addTripSuccess: null,

  requestFailure: ['error'],

  resetTrip: null
}, {
  prefix: reducerPrefixFormat(stateKey)
})

/* ------------- Reducers ------------- */
const tripRequest = R.identity
const tripInfo = R.identity
const getTripsListRequest = R.identity

const deleteTripRequest = R.identity

const deleteTripSuccess = R.identity

const updateTripRequest = R.identity

const updateTripSuccess = R.identity

const addTripRequest = R.identity

const addTripSuccess = R.identity
const tripSuccess = (state, { tripInfo }) =>
  produce(state, draft => {
    draft.tripInfo = tripInfo
  })

const tripInfoSuccess = (state, { tripInfo }) =>
  produce(state, draft => {
    draft.tripInfo = tripInfo
  })

const getTripsListSuccess = (state, { tripsList }) =>
  produce(state, draft => {
    draft.tripsList = tripsList
  })

const requestFailure = R.identity

const resetTrip = (state) =>
  produce(state, draft => {
    draft.tripsList = {}
    draft.tripInfo = null
  })

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
  [Types.TRIP_REQUEST]: tripRequest,
  [Types.TRIP_SUCCESS]: tripSuccess,

  [Types.TRIP_INFO]: tripInfo,
  [Types.TRIP_INFO_SUCCESS]: tripInfoSuccess,

  [Types.GET_TRIPS_LIST_REQUEST]: getTripsListRequest,
  [Types.GET_TRIPS_LIST_SUCCESS]: getTripsListSuccess,

  [Types.DELETE_TRIP_REQUEST]: deleteTripRequest,
  [Types.DELETE_TRIP_SUCCESS]: deleteTripSuccess,

  [Types.UPDATE_TRIP_REQUEST]: updateTripRequest,
  [Types.UPDATE_TRIP_SUCCESS]: updateTripSuccess,

  [Types.ADD_TRIP_REQUEST]: addTripRequest,
  [Types.ADD_TRIP_SUCCESS]: addTripSuccess,

  [Types.REQUEST_FAILURE]: requestFailure,

  [Types.RESET_TRIP]: resetTrip
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
