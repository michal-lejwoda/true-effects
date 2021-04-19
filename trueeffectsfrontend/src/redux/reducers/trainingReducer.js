import {POST_LOGOUT,GET_MEASUREMENTS,GET_MEASUREMENTS_SUCCESS,POST_TRAINING,GET_TRAININGS,GET_TRAININGS_SUCCESS,
    GET_GOALS,GET_GOALS_SUCCESS,POST_MEASUREMENT,GET_EXERCISES,GET_EXERCISES_SUCCESS,GET_OWN_EXERCISES_SUCCESS,END_TRAINING_SUCCESS,POST_TIME} from '../actions/types';

const initialState = {
    measurements: [],
    trainings: [],
    goals:[],
    defaultexercises:[],
    loadingtrainings: false,
    loadedtrainings: false,
    loadingmeasurements: false,
    loadedmeasurements: false,
    loadinggoals: false,
    loadedgoals:false,
    loadingexercises: false,
    loadedexercises:false,
    loadedtime :false,
    ownexercises:[],
    seconds: '',
    minutes: '',
    hours: ''
    
};
export default function trainreducer(state=initialState,action){
    switch(action.type){
        case GET_MEASUREMENTS:
            return{
                ...state,
                loadingmeasurements:true,
            }
        case GET_MEASUREMENTS_SUCCESS:
            return{
                ...state,
                measurements:action.payload,
                loadingmeasurements:false,
                loadedmeasurements:true
            }
        case GET_EXERCISES:
            return{
                ...state,
                loadingexercises:true,
            }
            case GET_EXERCISES_SUCCESS:
                return{
                    ...state,
                    exercises: action.payload,
                    loadedexercises: true,
                }
        case GET_TRAININGS:
            return{
                ...state,
                loadingtrainings:true,
            
            }
        case GET_TRAININGS_SUCCESS:
            return{
                ...state,
                trainings:action.payload,
                loadingtrainings:false,
                loadedtrainings:true
            }
        case GET_GOALS:
            return{
                ...state,
                loadinggoals:true
            }
        case GET_GOALS_SUCCESS:
            return{
                ...state,
                goals:action.payload,
                loadinggoals:false,
                loadedgoals:true

            }
        case POST_TRAINING:
            return{
                ...state
            }
        case POST_MEASUREMENT:
            return{
                ...state
            }
        case POST_LOGOUT:
            return{
                ...state,
                measurements: [],
                trainings: [],
                goals:[],
                loadedtrainings: false,
                loadedgoals: false,
                loadedmeasurements: false
            }
        case GET_OWN_EXERCISES_SUCCESS:
            return{
                ...state,
                ownexercises:action.payload
            }
        case END_TRAINING_SUCCESS:
            return{
                ...state,
                
            }
        case POST_TIME:
            return{
                ...state,
                seconds: action.second,
                minutes: action.minute,
                hours: action.hour,
            }
        
        default: 
            return state;
    }
}