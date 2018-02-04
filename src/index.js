import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import categories from './reducers'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  categories,
  composeEnhacers(
    applyMiddleware(
      thunk,
      logger
    )
  )  
)

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
   document.getElementById('root'));
registerServiceWorker();
