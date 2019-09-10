import { createActions, createReducer } from 'reduxsauce'
import produce from 'immer'
import { reducerPrefixFormat } from '../common'
import * as R from 'ramda'

const stateKey = 'app'

/* ------------- Initial State ------------- */
const INITIAL_STATE = {
  app_state_restored: false,
  assets_cached: false,
  redux_state_restored: false
}
Object.freeze(INITIAL_STATE)

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  initializeApp: null,
  cacheAssetsStart: null,
  cacheAssetsFinish: ['error'],
  setAppStateRestored: null,
  setReduxStateRestored: null,
  initCheck: null,

  requestFailure: ['error']
}, {
  prefix: reducerPrefixFormat(stateKey)
})

/* ------------- Reducers ------------- */

const initializeApp = R.identity

const initCheck = R.identity

const setAppStateRestored = (state) =>
  produce(state, draft => {
    draft.app_state_restored = true
  })

const requestFailure = R.identity

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
  [Types.INITIALIZE_APP]: initializeApp,
  [Types.SET_APP_STATE_RESTORED]: setAppStateRestored,
  [Types.INIT_CHECK]: initCheck,

  [Types.REQUEST_FAILURE]: requestFailure
})

const reducerMap = { [stateKey]: reducer }

/* ------------- Selectors ------------- */
const getReducerState = (state) => (state[stateKey])
const isAppStateRestored = (reducerState) => (reducerState.app_state_restored)
const isAssetsCached = (reducerState) => (reducerState.assets_cached)
const isReduxStateRestored = (reducerState) => (reducerState.redux_state_restored)
const isReady = (reducerState) => (reducerState.app_state_restored)

/* ------------- Export ------------- */
export default {
  isAppStateRestored,
  isAssetsCached,
  isReduxStateRestored,
  isReady,

  // default export
  INITIAL_STATE,
  Types,
  Creators,

  stateKey,
  getReducerState,
  reducerMap
}
