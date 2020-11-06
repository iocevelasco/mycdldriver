import { combineReducers } from 'redux';
import { userReducer } from './user_reducer';
import { landingReducer } from './lading_reducer';

const rootReducer = combineReducers({
    user: userReducer,
    landing: landingReducer
});

export default rootReducer;