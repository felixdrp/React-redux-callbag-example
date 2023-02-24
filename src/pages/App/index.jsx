import reactLogo from '../../assets/react.svg'
import './App.css'

import {
  useSelector,
  useDispatch,
} from 'react-redux';

import appActions from './actions';
import reducer from './reducer';
import useInjectReduxCallbag from '../../useInjectReduxCallbag';
import { useInjectReducer } from '../../injectReducer';

function App() {
  useInjectReducer({ key: 'count', reducer })
  const total = useSelector(
    state => state?.count ?
      state.count.total
      : 0
  )

  const dispatch = useDispatch()

  const addOne = () => 
    dispatch(appActions.add.action(1))
  const minusOne = () => 
    dispatch(appActions.minus.action(1))
  const exampleAsyncCall = () => 
    dispatch(appActions.exampleAsyncCall.action())
  const exampleAsyncCall2 = () => 
    dispatch(appActions.exampleAsyncCall2.action())
  // Inject async actions fired by redux dispatch or Redux side effects
  useInjectReduxCallbag(async (action) => {
    switch (action.type) {
      case appActions.exampleAsyncCall.type:
        // console.log(action)
        await Promise.resolve('fetch')
        console.log('hacer algo asincrono aqui')
        break
      case appActions.exampleAsyncCall2.type:
        break
      default:  
    }
  })

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>redux-callbag-example with</h1>
      <h1>Vite + React</h1>

      <div className="card">
        count is {total} <br/>
        <button onClick={addOne}>
          plus
        </button>
        <button onClick={minusOne}>
          minus
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <button onClick={exampleAsyncCall}>
          Example Async Call
        </button>
        <br/>
        <button onClick={exampleAsyncCall2}>
          Example Async Call 2
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
