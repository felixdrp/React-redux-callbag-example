/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
  * 2023 Felix D RP
  * Inspiration from:
  * - https://redux.js.org/usage/code-splitting
*/
import {
  combineReducers as combineReducersOriginal,
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux'

const combineReducers = (reducers) => {
  // if reducers is empty return a temporal reducer
  if (Object.keys(reducers).length == 0) {
    return (state = null, action)=> state
  }

  return combineReducersOriginal(reducers)
}

export function createReducerManager(initialReducers) {

  // Create an object which maps keys to reducers
  const reducers = { ...initialReducers }

  // Create the initial combinedReducer
  let combinedReducer = combineReducers(reducers)

  // An array which is used to delete state keys when reducers are removed
  let keysToRemove = []

  return {
    getReducerMap: () => reducers,

    // The root reducer function exposed by this object
    // This will be passed to the store
    reduce: (state, action) => {
      // If any reducers have been removed, clean up their state first
      if (keysToRemove.length > 0) {
        state = { ...state }
        for (let key of keysToRemove) {
          delete state[key]
        }
        keysToRemove = []
      }

      // Delegate to the combined reducer
      return combinedReducer(state, action)
    },

    // Adds a new reducer with the specified key
    add: (key, reducer) => {
      if (!key || reducers[key]) {
        return
      }

      // Add the reducer to the reducer mapping
      reducers[key] = reducer

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers)
    },

    // Removes a reducer with the specified key
    remove: key => {
      if (!key || !reducers[key]) {
        return
      }

      // Remove it from the reducer mapping
      delete reducers[key]

      // Add the key to the list of keys to clean up
      keysToRemove.push(key)

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers)
    }
  }
}

export function configureStore({
  initialState,
  initialReducers,
  middlewares,
}) {
  let composeEnhancers = compose;

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/Features/Trace.md
        trace: true,
        traceLimit: 25,
      });
    /* eslint-enable */
  }

  const reducerManager = createReducerManager(initialReducers)
  const enhancers = [applyMiddleware(...middlewares)];
  // Create a store with the root reducer function being the one exposed by the manager.
  const store = createStore(
    reducerManager.reduce,
    initialState,
    composeEnhancers(...enhancers),
  )

  // Optional: Put the reducer manager on the store so it is easily accessible
  store.reducerManager = reducerManager

  return store
}