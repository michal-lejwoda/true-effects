import {combineReducers} from 'redux';
import trainingReducer from './trainingReducer';
import authenticationReducer from './authenticationReducer';
export default combineReducers({
    training:trainingReducer,
    authentication:authenticationReducer,
    
})