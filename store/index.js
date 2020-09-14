import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import promiseMiddleware from 'redux-promise';
import Reducers from './reducers';

const exampleInitialState =  {
    users:[{
        name:'Steve',
        lastname:'Jones'
    }]
}


export function initializeStore (initialState = exampleInitialState ) {
    return createStore(
        Reducers,
        initialState,
        composeWithDevTools(applyMiddleware(promiseMiddleware))
    )
  }
