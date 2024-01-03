import {
    END_TRAINING_SUCCESS,
    GET_EXERCISES,
    GET_EXERCISES_SUCCESS,
    GET_GOALS,
    GET_GOALS_SUCCESS,
    GET_MEASUREMENTS,
    GET_MEASUREMENTS_SUCCESS,
    GET_OWN_EXERCISES_SUCCESS,
    GET_TRAININGS,
    GET_TRAININGS_SUCCESS,
    GET_USER_COMPLETED_GOALS_SUCCESS, GET_USER_DIMENSION_CONFIGURATION_SUCCESS,
    GET_USER_DIMENSIONS_SUCCESS,
    GET_USER_GOALS_TO_ACHIEVE_SUCCESS,
    POST_LOGOUT,
    POST_MEASUREMENT,
    POST_TIME,
    POST_TRAINING, PUT_USER_DIMENSION_CONFIGURATION_SUCCESS
} from '../actions/types';

const initialState = {
    measurements: [],
    trainings: [],
    goals: [],
    defaultexercises: [],
    loadingtrainings: false,
    loadedtrainings: false,
    loadingmeasurements: false,
    loadedmeasurements: false,
    loadinggoals: false,
    loadedgoals: false,
    loadingexercises: false,
    loadedexercises: false,
    loadedtime: false,
    ownexercises: [],
    seconds: '',
    minutes: '',
    hours: '',
    userGoalsToAchieve: null,
    userGoalsCompleted: null,
    userDimensions: [],
    userDimensionConfiguration: []

};
export default function trainreducer(state = initialState, action) {
    switch (action.type) {
        case GET_MEASUREMENTS:
            return {
                ...state,
                loadingmeasurements: true,
            }
        case GET_MEASUREMENTS_SUCCESS:
            return {
                ...state,
                measurements: action.payload,
                loadingmeasurements: false,
                loadedmeasurements: true
            }
        case GET_EXERCISES:
            return {
                ...state,
                loadingexercises: true,
            }
        case GET_EXERCISES_SUCCESS:
            return {
                ...state,
                exercises: action.payload,
                loadedexercises: true,
            }
        case GET_TRAININGS:
            return {
                ...state,
                loadingtrainings: true,

            }
        case GET_TRAININGS_SUCCESS:
            return {
                ...state,
                trainings: action.payload,
            }
        case GET_GOALS:
            return {
                ...state,
                loadinggoals: true
            }
        case GET_GOALS_SUCCESS:
            return {
                ...state,
                goals: action.payload,
                loadinggoals: false,
                loadedgoals: true

            }
        case POST_TRAINING:
            return {
                ...state
            }
        case POST_MEASUREMENT:
            return {
                ...state
            }
        case POST_LOGOUT:
            return {
                ...state,
                measurements: [],
                trainings: [],
                goals: [],
                loadedtrainings: false,
                loadedgoals: false,
                loadedmeasurements: false
            }
        case GET_OWN_EXERCISES_SUCCESS:
            return {
                ...state,
                ownexercises: action.payload
            }
        case END_TRAINING_SUCCESS:
            return {
                ...state,

            }
        case POST_TIME:
            return {
                ...state,
                seconds: action.second,
                minutes: action.minute,
                hours: action.hour,
            }
        case GET_USER_COMPLETED_GOALS_SUCCESS:
            return {
                ...state,
                userGoalsCompleted: action.payload,
            }
        case GET_USER_GOALS_TO_ACHIEVE_SUCCESS:
            return {
                ...state,
                userGoalsToAchieve: action.payload
            }
        case GET_USER_DIMENSIONS_SUCCESS:
            return {
                ...state,
                userDimensions: action.payload,
            }
        case PUT_USER_DIMENSION_CONFIGURATION_SUCCESS:
            return {
                ...state,
                userDimensionConfiguration: action.payload
            }
        case GET_USER_DIMENSION_CONFIGURATION_SUCCESS:
            return {
                ...state,
                userDimensionConfiguration: action.payload
            }

        default:
            return state;
    }
}