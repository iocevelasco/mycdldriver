import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import Reducers from './reducers';

export function initializeStore(initialState = {}) {
    return createStore(
        Reducers,
        initialState,
        composeWithDevTools(applyMiddleware(thunk))
    )
}
