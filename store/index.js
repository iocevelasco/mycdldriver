import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import promiseMiddleware from 'redux-promise';
import Reducers from './reducers';

export function initializeStore (initialState = {}) {
    return createStore(
        Reducers,
        initialState,
        composeWithDevTools(applyMiddleware(promiseMiddleware))
    )
  }
