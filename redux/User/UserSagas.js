import { call, cancelled, put, select, spawn, take, takeLatest } from 'redux-saga/effects'
import apiService from '@app/services/apis'
import { APP_CONFIG } from '@app/constants'
import appfire from 'firebase/app'
import { channel } from 'redux-saga'
import firebase from '@app/services/firebase'
import moment from 'moment'
import Router from 'next/router'
import StationRedux from '../Station/StationRedux'
import TripRedux from '../Trip/TripRedux'
import UserRedux from './UserRedux'

const loginRequest = function * ({ email, password, resolveCb }) {
  let error
  try {
    const res = yield call(() => apiService.loginFirebase({ email, password }))
    const { user } = res

    // save user id only to avoid firebase auth user circular structure
    const saveUser = {
      id: user.uid,
      email: user.email
    }
    const query = yield firebase.firestore().collection('usersAdmin').doc(saveUser.id).get()
    if (query.exists && query.data().admin) {
      yield call(() => apiService.logoutFirebase())
      const err = { code: 'auth/admin-on-regular-login', message: 'You cannot signin with this form' }
      throw err
    }
    yield put(UserRedux.Creators.loginSessionSuccess(saveUser))
    Router.push('/stationsMap')
  } catch (e) {
    error = e
    yield put(UserRedux.Creators.requestFailure(e))
  } finally {
    if (resolveCb) {
      yield resolveCb(error)
    }
    if (yield cancelled()) {
      yield put(UserRedux.Creators.requestFailure())
    }
  }
}

const adminLoginRequest = function * ({ email, password, resolveCb }) {
  let error
  try {
    let saveUser = {}
    const res = yield call(() => apiService.loginFirebase({ email, password }))
    const { user } = res
    saveUser.id = user.uid
    saveUser.email = user.email
    const query = yield firebase.firestore().collection('usersAdmin').doc(saveUser.id).get()
    if (query.exists) {
      const isAdmin = query.data().admin
      if (isAdmin) {
        saveUser.isAdmin = true
        yield put(UserRedux.Creators.adminLoginSessionSuccess(saveUser))
        Router.push('/admin/dashboard')
      } else {
        const err = { code: 'auth/user-not-admin', message: 'You are not an admin' }
        throw err
      }
    } else {
      const err = { code: 'auth/user-not-in-usersAdmin-collection', message: 'You are not an admin' }
      throw err
    }
  } catch (e) {
    error = e
    yield put(UserRedux.Creators.requestFailure(e))
  } finally {
    if (resolveCb) {
      yield resolveCb(error)
    }
    if (yield cancelled()) {
      yield put(UserRedux.Creators.requestFailure())
    }
  }
}

const signupRequest = function * ({ formData, resolveCb }) {
  let error
  const { email, name, password } = formData
  try {
    const { user } = yield call(() => firebase.auth().createUserWithEmailAndPassword(email, password))
    const initUserCall = appfire.functions().httpsCallable('initUserCall')
    initUserCall({ name, email, uid: user.uid })
  } catch (e) {
    error = e
    yield put(UserRedux.Creators.requestFailure(e))
  } finally {
    if (yield cancelled()) {
      yield put(UserRedux.Creators.requestFailure())
    } else {
      yield put(UserRedux.Creators.logoutSessionSuccess())
    }
    if (resolveCb) {
      yield resolveCb(error)
    }
  }
}

const logoutRequest = function * ({ resolveCb }) {
  try {
    const user = yield select(getUser)
    yield call(() => apiService.logoutFirebase())
    if (user && user.isAdmin) {
      Router.push('/admin/signin')
    } else {
      Router.push('/stationsMap')
    }
    yield put(UserRedux.Creators.logoutSuccess())
    yield put(StationRedux.Creators.resetStation())
    yield put(TripRedux.Creators.resetTrip())
  } catch (e) {
    yield put(UserRedux.Creators.requestFailure(e))
  } finally {
    if (yield cancelled()) {
      yield put(UserRedux.Creators.requestFailure())
    } else {
      yield put(UserRedux.Creators.logoutSessionSuccess())
    }
    if (resolveCb) {
      resolveCb()
    }
  }
}

// UserRedux
const getUser = state => UserRedux.getReducerState(state).user

const getTripRequest = function * ({ pageNumber }) {
  const maxTrips = APP_CONFIG.FETCH_COUNT_PER_PAGE
  const user = yield select(getUser)
  const updatedUser = { ...user }
  const db = firebase.firestore()
  if (pageNumber > 1) {
    let tripRef = db.collection('trips').orderBy('date', 'desc').where('userId', '==', user.docuid).limit(maxTrips * (pageNumber - 1))
    let query = yield tripRef.get()
    let last = query.docs[query.docs.length - 1]
    let next = db.collection('trips')
      .orderBy('date', 'desc')
      .where('userId', '==', user.docuid)
      .startAfter(last.data().date)
      .limit(maxTrips)
    query = yield next.get()
    updatedUser.tripList = query.docs.reduce((obj, doc) => {
      obj[doc.id] = doc.data()
      return obj
    }, {})
  } else {
    let tripRef = db.collection('trips').orderBy('date', 'desc').where('userId', '==', user.docuid).limit(maxTrips)
    let query = yield tripRef.get()
    updatedUser.tripList = query.docs.reduce((obj, doc) => {
      obj[doc.id] = doc.data()
      return obj
    }, {})
  }

  yield put(UserRedux.Creators.getInfoSuccess(updatedUser))
}

const getInfoRequest = function * () {
  let user = yield select(getUser)
  const updatedUser = { ...user }
  const db = firebase.firestore()

  /* Profile */
  let userRef = db.collection('user').where('email', '==', user.email)
  let query = yield userRef.get()
  if (query.docs.length !== 1) {
    yield put(UserRedux.Creators.requestFailure())
  } else {
    const doc = query.docs[0].data()
    updatedUser.docuid = query.docs[0].id
    updatedUser.name = doc.name
    // user.email = doc.email
    updatedUser.trips = doc.trips
    updatedUser.distance = doc.distance
    // Duration is {x} h {y} m
    if (doc.duration > 59) {
      updatedUser.duration = Math.floor(doc.duration / 60) + ' h ' + doc.duration % 60 + ' m'
    } else {
      updatedUser.duration = doc.duration + ' m'
    }
    // Member since {Month}, {Year}
    updatedUser.memberSince = moment.unix(doc.memberSince.seconds).format('MMMM, YYYY')
    yield put(UserRedux.Creators.getInfoSuccess(updatedUser))
    yield call(getTripRequest, 1)
  }
}

const updateInfoRequest = function * ({ update, resolveCb }) {
  let error
  try {
    const ref = firebase.firestore().collection('user').where('email', '==', update.email)
    const user = yield ref.get()
    if (user.docs.length !== 1) {
      if (user.docs.length === 0) {
        const err = { code: 'editProfile/user-not-found', message: 'There is no user record corresponding to this email. The user may have been deleted.' }
        throw err
      } else {
        const err = { code: 'editProfile/several-users-with-same-email', message: 'ERROR : Several users share this email, please contact an admin' }
        throw err
      }
    } else {
      user.docs[0].ref.update({ name: update.username })
    }
  } catch (e) {
    error = e
    yield put(UserRedux.Creators.requestFailure(e))
  } finally {
    if (yield cancelled()) {
      yield put(UserRedux.Creators.requestFailure())
    } else {
      yield put(UserRedux.Creators.updateInfoSuccess())
    }
    if (resolveCb) {
      yield resolveCb(error)
    }
  }
}

const updatePasswordRequest = function * ({ update, resolveCb }) {
  let error
  try {
    let currentUser = firebase.auth().currentUser
    const credential = appfire.auth.EmailAuthProvider.credential(
      update.email,
      update.oldPassword
    )
    yield currentUser.reauthenticateAndRetrieveDataWithCredential(credential)
    currentUser = firebase.auth().currentUser
    yield currentUser.updatePassword(update.password)
  } catch (e) {
    error = e
    yield put(UserRedux.Creators.requestFailure(e))
  } finally {
    if (yield cancelled()) {
      yield put(UserRedux.Creators.requestFailure())
    } else {
      yield put(UserRedux.Creators.updatePasswordSuccess())
    }
    if (resolveCb) {
      yield resolveCb(error)
    }
  }
}

// Get the number of users in Firebase
const userInfo = function * () {
  try {
    // Get all the users stored in the collection user
    const user = yield call(() => firebase.firestore().collection('user').get())

    let userNumber = user.docs.length

    const userInfo = {
      count: userNumber
    }

    yield put(UserRedux.Creators.userInfoSuccess(userInfo))
  } catch (e) {
    yield put(UserRedux.Creators.requestFailure(e))
  } finally {
    if (yield cancelled()) {
      yield put(UserRedux.Creators.requestFailure())
    }
  }
}

const getUsersListRequest = function * ({ resolveCb }) {
  try {
    const response = yield call(() => firebase.firestore().collection('user').get())
    const users = response.docs.reduce((prevDict, currUserSnapshot) => {
      if (currUserSnapshot.data().status !== 'deactivated') {
        prevDict[currUserSnapshot.id] = { ...currUserSnapshot.data(), id: currUserSnapshot.id, formatDate: moment.unix(currUserSnapshot.data().memberSince.seconds).format('YYYY-MM-DD') }
      }
      return prevDict
    }, {})
    yield put(UserRedux.Creators.getUsersListSuccess(users))
  } catch (e) {
    yield put(UserRedux.Creators.requestFailure(e))
  } finally {
    if (resolveCb) {
      yield resolveCb()
    }
  }
}

// get the user with the entered uid
const getUsersById = function * ({ uid, resolveCb }) {
  try {
    const err = { code: 'UidNotFound', message: 'Sorry, this uid doesn\'t exists' }
    // get
    const res = yield call(() => firebase.firestore().collection('user').doc(uid).get())
    // check if this uid exists
    if (!res.data()) {
      throw err
    } else {
      resolveCb(null)
    }
    yield put(UserRedux.Creators.getUsersByIdSuccess())
  } catch (e) {
    resolveCb(e)
    yield put(UserRedux.Creators.requestFailure(e))
  }
}

const deleteUserRequest = function * ({ uid, resolveCb }) {
  try {
    yield call(() => firebase.firestore().collection('user').doc(uid).update({
      status: APP_CONFIG.USER_STATUS.deactivated
    }))
    yield put(UserRedux.Creators.deleteUserSuccess())
  } catch (e) {
    yield put(UserRedux.Creators.requestFailure(e))
  } finally {
    if (resolveCb) {
      yield resolveCb()
    }
  }
}

const updateUserRequest = function * ({ formData, uid, resolveCb }) {
  try {
    yield firebase.firestore().collection('user').doc(uid).update(formData)
  } catch (e) {
    yield put(UserRedux.Creators.requestFailure(e))
  } finally {
    if (resolveCb) {
      yield resolveCb()
    }
  }
}

const addUserRequest = function * ({ formData, resolveCb }) {
  const { email, password } = formData
  let error
  try {
    const user = yield call(() => firebase.auth().createUserWithEmailAndPassword(email, password))
    yield firebase.firestore().collection('user').doc(user.user.uid).set(formData)
  } catch (e) {
    error = e
    yield put(UserRedux.Creators.requestFailure(e))
  } finally {
    if (resolveCb) {
      yield resolveCb(error)
    }
  }
}

// send an email to reset the password
const resetPassword = function * ({ email, resolveCb }) {
  let error
  try {
    yield call(() => firebase.auth().sendPasswordResetEmail(email))

    yield put(UserRedux.Creators.resetPasswordSuccess())
  } catch (e) {
    error = e
    yield put(UserRedux.Creators.requestFailure(e))
  } finally {
    if (resolveCb) {
      yield resolveCb(error)
    }
    if (yield cancelled()) {
      yield put(UserRedux.Creators.requestFailure())
    }
  }
}

// channel for auth state change
const AuthChangeEvent = channel()

const subscribeAuthStateChange = function * () {
  try {
    firebase.auth().onAuthStateChanged(user => {
      AuthChangeEvent.put({ user })
    })
  } catch (e) {
    yield put(UserRedux.Creators.requestFailure(e))
  }
}

const watchAuthChangeChannel = function * () {
  while (true) {
    try {
      // TODO: handle auth state changed
      // eslint-disable-next-line no-unused-vars
      const { user } = yield take(AuthChangeEvent)
      // example
      // if (!user) {
      //   localStorage.removeItem(KEY_USER_ID);
      //   history.push("/login");
      // }
    } catch (e) {
      yield put(UserRedux.Creators.requestFailure(e))
    }
  }
}

// MARK: export sagas
export default [
// sorted alphabetically Reducers, same Types/Creators order inside Reducer
  takeLatest(UserRedux.Types.LOGIN_REQUEST, loginRequest),
  takeLatest(UserRedux.Types.ADMIN_LOGIN_REQUEST, adminLoginRequest),
  takeLatest(UserRedux.Types.SIGNUP_REQUEST, signupRequest),
  takeLatest(UserRedux.Types.LOGOUT_REQUEST, logoutRequest),
  takeLatest(UserRedux.Types.GET_INFO_REQUEST, getInfoRequest),
  takeLatest(UserRedux.Types.GET_TRIP_REQUEST, getTripRequest),
  takeLatest(UserRedux.Types.UPDATE_INFO_REQUEST, updateInfoRequest),
  takeLatest(UserRedux.Types.UPDATE_PASSWORD_REQUEST, updatePasswordRequest),
  takeLatest(UserRedux.Types.USER_INFO, userInfo),
  takeLatest(UserRedux.Types.GET_USERS_LIST_REQUEST, getUsersListRequest),
  takeLatest(UserRedux.Types.GET_USERS_BY_ID, getUsersById),
  takeLatest(UserRedux.Types.DELETE_USER_REQUEST, deleteUserRequest),
  takeLatest(UserRedux.Types.UPDATE_USER_REQUEST, updateUserRequest),
  takeLatest(UserRedux.Types.ADD_USER_REQUEST, addUserRequest),
  takeLatest(UserRedux.Types.RESET_PASSWORD, resetPassword),

  takeLatest(UserRedux.Types.WATCH_AUTH_STATE_CHANGE, subscribeAuthStateChange),

  spawn(watchAuthChangeChannel)
]
