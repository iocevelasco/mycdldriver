import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import promiseMiddleware from 'redux-promise';
import Reducers from './reducers';

const InitialProps =  {
    userProps:{
        props:{
            typeUser:0
        }
    }
}


export function initializeStore (initialState = InitialProps ) {
    return createStore(
        Reducers,
        initialState,
        composeWithDevTools(applyMiddleware(promiseMiddleware))
    )
  }
