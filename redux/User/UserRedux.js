import { createActions, createReducer } from 'reduxsauce'
import produce from 'immer'
import { reducerPrefixFormat } from '../common'
import * as R from 'ramda'

const stateKey = 'user'

/* ------------- Initial State ------------- */
const INITIAL_STATE = {
  user: null,
  userInfo: null,
  usersList: {}
}
Object.freeze(INITIAL_STATE)

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  loginRequest: ['email', 'password', 'resolveCb'],
  loginSessionSuccess: ['user'],
  logoutSessionSuccess: null,

  signupRequest: ['formData', 'resolveCb'],
  adminLoginRequest: ['email', 'password', 'resolveCb'],
  adminLoginSessionSuccess: ['user'],

  getInfoRequest: null,
  getTripRequest: ['pageNumber'],
  getInfoSuccess: ['user'],

  updateInfoRequest: ['update', 'resolveCb'],
  updateInfoSuccess: null,
  updatePasswordRequest: ['update', 'resolveCb'],
  updatePasswordSuccess: null,

  getUsersListRequest: ['resolveCb'],
  getUsersListSuccess: ['usersList'],

  getUsersById: ['uid', 'resolveCb'],
  getUsersByIdSuccess: null,

  logoutRequest: ['resolveCb'],
  logoutSuccess: null,

  deleteUserRequest: ['uid', 'resolveCb'],
  deleteUserSuccess: null,

  updateUserRequest: ['formData', 'uid', 'resolveCb'],
  updateUserSuccess: null,

  addUserRequest: ['formData', 'resolveCb'],
  addUserSuccess: null,

  userInfo: null,
  userInfoSuccess: ['userInfo'],

  resetPassword: ['email', 'resolveCb'],
  resetPasswordSuccess: null,

  watchAuthStateChange: null,

  requestFailure: ['error']
}, {
  prefix: reducerPrefixFormat(stateKey)
})

/* ------------- Reducers ------------- */
const loginRequest = R.identity
const userInfo = R.identity
const resetPassword = R.identity

const loginSessionSuccess = (state, { user }) =>
  produce(state, draft => {
    draft.user = user
  })

const adminLoginRequest = R.identity

const adminLoginSessionSuccess = (state, { user }) =>
  produce(state, draft => {
    draft.user = user
  })

const logoutSessionSuccess = (state) =>
  produce(state, draft => {
    draft.user = null
    draft.userInfo = null
    draft.usersList = {}
  })

const userInfoSuccess = (state, { userInfo }) =>
  produce(state, draft => {
    draft.userInfo = userInfo
  })

const signupRequest = R.identity

const getInfoRequest = R.identity

const getTripRequest = R.identity

const getInfoSuccess = (state, { user }) =>
  produce(state, draft => {
    draft.user = user
  })

const getUsersListRequest = R.identity

const getUsersById = R.identity

const getUsersListSuccess = (state, { usersList }) =>
  produce(state, draft => {
    draft.usersList = usersList
  })

const updateInfoRequest = R.identity

const updateInfoSuccess = R.identity

const updatePasswordRequest = R.identity

const updatePasswordSuccess = R.identity

const getUsersByIdSuccess = R.identity

const logoutRequest = R.identity

const logoutSuccess = (state) =>
  produce(state, draft => {
    draft.user = null
    draft.userInfo = null
    draft.usersList = {}
  })

const deleteUserRequest = R.identity

const deleteUserSuccess = R.identity

const updateUserRequest = R.identity

const updateUserSuccess = R.identity

const addUserRequest = R.identity

const addUserSuccess = R.identity

const resetPasswordSuccess = R.identity

const watchAuthStateChange = R.identity

const requestFailure = R.identity

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SESSION_SUCCESS]: loginSessionSuccess,
  [Types.LOGOUT_SESSION_SUCCESS]: logoutSessionSuccess,

  [Types.ADMIN_LOGIN_REQUEST]: adminLoginRequest,
  [Types.ADMIN_LOGIN_SESSION_SUCCESS]: adminLoginSessionSuccess,

  [Types.SIGNUP_REQUEST]: signupRequest,

  [Types.GET_INFO_REQUEST]: getInfoRequest,
  [Types.GET_TRIP_REQUEST]: getTripRequest,
  [Types.GET_INFO_SUCCESS]: getInfoSuccess,

  [Types.GET_USERS_LIST_REQUEST]: getUsersListRequest,
  [Types.GET_USERS_LIST_SUCCESS]: getUsersListSuccess,

  [Types.GET_USERS_BY_ID]: getUsersById,
  [Types.GET_USERS_BY_ID_SUCCESS]: getUsersByIdSuccess,

  [Types.UPDATE_INFO_REQUEST]: updateInfoRequest,
  [Types.UPDATE_INFO_SUCCESS]: updateInfoSuccess,

  [Types.UPDATE_PASSWORD_REQUEST]: updatePasswordRequest,
  [Types.UPDATE_PASSWORD_SUCCESS]: updatePasswordSuccess,

  [Types.LOGOUT_REQUEST]: logoutRequest,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,

  [Types.DELETE_USER_REQUEST]: deleteUserRequest,
  [Types.DELETE_USER_SUCCESS]: deleteUserSuccess,

  [Types.UPDATE_USER_REQUEST]: updateUserRequest,
  [Types.UPDATE_USER_SUCCESS]: updateUserSuccess,

  [Types.ADD_USER_REQUEST]: addUserRequest,
  [Types.ADD_USER_SUCCESS]: addUserSuccess,

  [Types.USER_INFO]: userInfo,
  [Types.USER_INFO_SUCCESS]: userInfoSuccess,

  [Types.RESET_PASSWORD]: resetPassword,
  [Types.RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,

  [Types.WATCH_AUTH_STATE_CHANGE]: watchAuthStateChange,

  [Types.REQUEST_FAILURE]: requestFailure
})

const reducerMap = { [stateKey]: reducer }

/* ------------- Selectors ------------- */
const getReducerState = (state) => (state[stateKey])
const isLoggedIn = (reducerState) => (reducerState.user != null)

/* ------------- Export ------------- */
export default {
  isLoggedIn,

  // default export
  INITIAL_STATE,
  Types,
  Creators,

  stateKey,
  getReducerState,
  reducerMap
}
