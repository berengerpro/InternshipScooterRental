import { createActions, createReducer } from 'reduxsauce'
import produce from 'immer'
import { reducerPrefixFormat } from '../common'
import * as R from 'ramda'

const stateKey = 'station'

/* ------------- Initial State ------------- */
const INITIAL_STATE = {
  stations: {},
  stationsInfo: null
}
Object.freeze(INITIAL_STATE)

const { Types, Creators } = createActions({
  getStationsRequest: null,
  getStationsSuccess: ['stations'],

  getStationsInfo: null,
  getStationsInfoSuccess: ['stationsInfo'],

  addStationRequest: ['formData', 'resolveCb'],
  addStationSuccess: null,

  editStationRequest: ['stationId', 'formData', 'resolveCb'],
  editStationSuccess: null,

  deleteStationRequest: ['stationId'],
  deleteStationSuccess: null,

  requestFailure: ['error'],

  resetStation: null
}, {
  prefix: reducerPrefixFormat(stateKey)
})

/* ------------- Reducers ------------- */
const getStationsRequest = R.identity
const getStationsSuccess = (state, { stations }) => {
  const produced = produce(state, draft => {
    draft.stations = stations
  })
  return produced
}

const getStationsInfo = R.identity
const getStationsInfoSuccess = (state, { stationsInfo }) =>
  produce(state, draft => {
    draft.stationsInfo = stationsInfo
  })

const addStationRequest = R.identity
const addStationSuccess = R.identity

const editStationRequest = R.identity
const editStationSuccess = R.identity

const deleteStationRequest = R.identity
const deleteStationSuccess = R.identity

const requestFailure = R.identity

const resetStation = (state) =>
  produce(state, draft => {
    draft.stationsInfo = null
  })

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_STATIONS_REQUEST]: getStationsRequest,
  [Types.GET_STATIONS_SUCCESS]: getStationsSuccess,

  [Types.GET_STATIONS_INFO]: getStationsInfo,
  [Types.GET_STATIONS_INFO_SUCCESS]: getStationsInfoSuccess,

  [Types.ADD_STATION_REQUEST]: addStationRequest,
  [Types.ADD_STATION_SUCCESS]: addStationSuccess,

  [Types.EDIT_STATION_REQUEST]: editStationRequest,
  [Types.EDIT_STATION_SUCCESS]: editStationSuccess,

  [Types.DELETE_STATION_REQUEST]: deleteStationRequest,
  [Types.DELETE_STATION_SUCCESS]: deleteStationSuccess,

  [Types.REQUEST_FAILURE]: requestFailure,

  [Types.RESET_STATION]: resetStation
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
