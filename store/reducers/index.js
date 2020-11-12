import { combineReducers } from 'redux';
import { userReducer } from './user_reducer';
import { landingReducer } from './landing_reducer';
import { userDriverReducer } from './user_driver';

const rootReducer = combineReducers({
    user: userReducer,
    landing: landingReducer,
    driver: userDriverReducer
});

export default rootReducer;