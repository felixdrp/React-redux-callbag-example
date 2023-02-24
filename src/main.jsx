import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import './index.css'

import { Provider } from 'react-redux'
// Create a store where we can manage reducers 
import { configureStore } from './redux-reducer-manager'

import fromFunction from 'callbag-from-function';
// import subscribe from 'callbag-subscribe';
// import {pipe} from 'callbag-basics';

const {source, emitter} = fromFunction();

// We can read dispatchs reaching the callbag
// pipe(
//   source,
//   subscribe( val => console.log('callbag: '+ JSON.stringify(val) ) )
// );

// Middleware where we can subscribe and recibe actions dispatched to store
// function middlewareCallbagReactive({ getState }) {
const middlewareCallbagReactive = ({ getState }) => {
  return next => action => {
    console.log('will dispatch', action)
    // send action to callbag
    emitter(action)
    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)

    console.log('state after dispatch', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

const store = configureStore({
  initialState: {},
  initialReducers: {},
  middlewares: [
    middlewareCallbagReactive    
  ],
})

// Add callbag to the store
// Used to subscribe to store with callbags from components
store.callbagSource = source

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

