import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { all } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'
import * as R from 'ramda'
import * as reducers from './reducers'
import * as sagas from './sagas'

/* ------------- Reducers ------------- */
const allReducers = R.pipe(
  R.values,
  R.map(R.prop('reducerMap')),
  R.mergeAll
)(reducers)

const rootReducer = combineReducers(allReducers)

/* ------------- Sagas ------------- */
const allSagas = R.pipe(
  R.values,
  R.flatten
)(sagas)

const rootSaga = function * () {
  yield all(allSagas)
}

// creates the store
export default (initialState, { isServer, req, res, debug, storeKey }) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Saga Middleware ------------- */

  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

  /* ------------- createStore ------------- */

  let store

  if (isServer) {
    store = createStore(rootReducer, initialState, compose(...enhancers))
  } else {
    // we need it only on client side
    const { persistStore, persistReducer } = require('redux-persist')
    const storage = require('redux-persist/lib/storage').default

    const persistConfig = {
      key: 'root',
      storage
    }

    const persistedReducer = persistReducer(persistConfig, rootReducer)

    store = createStore(persistedReducer, initialState, compose(...enhancers))

    store.__persistor = persistStore(store) // Nasty hack
  }

  // kick off root saga
  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}
