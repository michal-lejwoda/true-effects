import {
    CREATE_SINGLE_TRAINING_BASED_ON_OLD_SUCCESS,
    CREATE_SINGLE_TRAINING_ERROR,
    CREATE_USER_EXERCISE_ERROR,
    GET_CURRENT_TRAINING_SUCCESS,
    GET_LAST_COMPLETED_TRAININGS,
    GET_SINGLE_TRAINING_SUCCESS,
    GET_TRAININGS_SUCCESS,
    GET_UPCOMING_TRAININGS,
    GET_USER_COMPLETED_GOALS_SUCCESS,
    GET_USER_DIMENSION_CONFIGURATION_FOR_COMPARE_SUCCESS,
    GET_USER_DIMENSION_CONFIGURATION_SUCCESS,
    GET_USER_DIMENSIONS_FOR_CREATE,
    GET_USER_DIMENSIONS_SUCCESS,
    GET_USER_GOALS_TO_ACHIEVE_SUCCESS,
    POST_LOGOUT,
    PUT_USER_DIMENSION_CONFIGURATION_SUCCESS,
    UPDATE_SINGLE_TRAINING_SUCCESS
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
    userDimensionConfiguration: [],
    userDimensionConfigurationForCompare: [],
    userDimensionsForCreate: {},
    trainingForModal: null,
    training: null,
    created_training: null,
    create_single_training_error: null,
    create_single_training_error_message: null,
    createUserExerciseError: null,
    upcomingTrainings: [],
    lastCompletedTrainings: [],


};
export default function trainreducer(state = initialState, action) {
    switch (action.type) {
        case GET_TRAININGS_SUCCESS:
            return {
                ...state,
                trainings: action.payload,
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
        case GET_USER_DIMENSIONS_FOR_CREATE:
            return {
                ...state,
                userDimensionsForCreate: action.payload
            }
        case GET_USER_DIMENSION_CONFIGURATION_FOR_COMPARE_SUCCESS:
            return {
                ...state,
                userDimensionConfigurationForCompare: action.payload
            }
        case GET_SINGLE_TRAINING_SUCCESS:
            return {
                ...state,
                trainingForModal: action.payload,
                training: action.payload
            }
        case GET_CURRENT_TRAINING_SUCCESS:
            return {
                ...state,
                training: action.payload
            }
        case UPDATE_SINGLE_TRAINING_SUCCESS:
            return {
                ...state,
                training: action.payload
            }
        case CREATE_SINGLE_TRAINING_BASED_ON_OLD_SUCCESS:
            return {
                ...state,
                created_training: action.payload,
                create_single_training_error: null,
                create_single_training_error_message: null
            }
        case CREATE_SINGLE_TRAINING_ERROR:
            return {
                ...state,
                create_single_training_error: action.payload,
                create_single_training_error_message: "Nie udało się utworzyć treningu"
            }
        case CREATE_USER_EXERCISE_ERROR:
            return {
                ...state,
                createUserExerciseError: "Nie udało się utworzyć ćwiczenia"
            }
        case GET_LAST_COMPLETED_TRAININGS:
            return {
                ...state,
                lastCompletedTrainings: action.payload
            }
        case GET_UPCOMING_TRAININGS:
            return {
                ...state,
                upcomingTrainings: action.payload
            }
        default:
            return state;
    }
}