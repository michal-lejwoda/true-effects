import {
    CREATE_SINGLE_TRAINING_BASED_ON_OLD_SUCCESS,
    CREATE_SINGLE_TRAINING_ERROR,
    CREATE_USER_EXERCISE_ERROR,
    GET_CURRENT_TRAINING_SUCCESS,
    GET_LAST_COMPLETED_TRAININGS,
    GET_SINGLE_TRAINING_SUCCESS,
    GET_TRAININGS_ERROR,
    GET_TRAININGS_LOADING,
    GET_TRAININGS_SUCCESS,
    GET_UPCOMING_TRAININGS,
    GET_USER_COMPLETED_GOALS_ERROR,
    GET_USER_COMPLETED_GOALS_LOADING,
    GET_USER_COMPLETED_GOALS_SUCCESS, GET_USER_DIMENSION_CONFIGURATION_ERROR,
    GET_USER_DIMENSION_CONFIGURATION_FOR_COMPARE_ERROR,
    GET_USER_DIMENSION_CONFIGURATION_FOR_COMPARE_LOADING,
    GET_USER_DIMENSION_CONFIGURATION_FOR_COMPARE_SUCCESS, GET_USER_DIMENSION_CONFIGURATION_LOADING,
    GET_USER_DIMENSION_CONFIGURATION_SUCCESS, GET_USER_DIMENSIONS_ERROR,
    GET_USER_DIMENSIONS_FOR_CREATE_ERROR,
    GET_USER_DIMENSIONS_FOR_CREATE_LOADING,
    GET_USER_DIMENSIONS_FOR_CREATE_SUCCESS, GET_USER_DIMENSIONS_LOADING,
    GET_USER_DIMENSIONS_SUCCESS,
    GET_USER_GOALS_TO_ACHIEVE_ERROR,
    GET_USER_GOALS_TO_ACHIEVE_LOADING,
    GET_USER_GOALS_TO_ACHIEVE_SUCCESS,
    PUT_USER_DIMENSION_CONFIGURATION_SUCCESS,
    UPDATE_SINGLE_TRAINING_SUCCESS
} from '../actions/types';

const initialState = {
    trainings: [],
    trainingsLoading: false,
    trainingsLoaded: false,
    userGoalsToAchieve: null,
    userGoalsToAchieveLoading: false,
    userGoalsToAchieveLoaded: false,
    userGoalsCompleted: null,
    userGoalsCompletedLoading: false,
    userGoalsCompletedLoaded: false,
    userDimensions: [],
    userDimensionsLoading: false,
    userDimensionsLoaded: false,
    userDimensionConfiguration: [],
    userDimensionConfigurationLoading: false,
    userDimensionConfigurationLoaded: false,
    userDimensionConfigurationForCompare: [],
    userDimensionConfigurationForCompareLoading: false,
    userDimensionConfigurationForCompareLoaded: false,
    userDimensionsForCreate: {},
    userDimensionsForCreateLoading: false,
    userDimensionsForCreateLoaded: false,
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
        case GET_TRAININGS_LOADING:
            return {
                ...state,
                trainingsLoading: true
            }
        case GET_TRAININGS_ERROR:
            return {
                ...state,
                trainingsLoading: false
            }
        case GET_TRAININGS_SUCCESS:
            return {
                ...state,
                trainings: action.payload,
                trainingsLoaded: true,
                trainingsLoading: false
            }
        case GET_USER_COMPLETED_GOALS_LOADING:
            return {
                ...state,
                userGoalsCompletedLoading: true
            }
        case GET_USER_COMPLETED_GOALS_ERROR:
            return {
                ...state,
                userGoalsCompletedLoading: false
            }
        case GET_USER_COMPLETED_GOALS_SUCCESS:
            return {
                ...state,
                userGoalsCompleted: action.payload,
                userGoalsCompletedLoaded: true,
                userGoalsCompletedLoading: false
            }
        case GET_USER_GOALS_TO_ACHIEVE_SUCCESS:
            return {
                ...state,
                userGoalsToAchieve: action.payload,
                userGoalsToAchieveLoaded: true,
                userGoalsToAchieveLoading: false
            }
        case GET_USER_GOALS_TO_ACHIEVE_LOADING:
            return {
                ...state,
                userGoalsToAchieveLoading: true
            }
        case GET_USER_GOALS_TO_ACHIEVE_ERROR:
            return {
                ...state,
                userGoalsToAchieveLoading: false
            }
        case GET_USER_DIMENSIONS_SUCCESS:
            return {
                ...state,
                userDimensions: action.payload,
                userDimensionsLoading: false,
                userDimensionsLoaded: true
            }
        case GET_USER_DIMENSIONS_LOADING:
            return {
                ...state,
                userDimensionsLoading: true
            }
        case GET_USER_DIMENSIONS_ERROR:
            return {
                ...state,
                userDimensionsLoading: false
            }
        case PUT_USER_DIMENSION_CONFIGURATION_SUCCESS:
            return {
                ...state,
                userDimensionConfiguration: action.payload
            }
        case GET_USER_DIMENSION_CONFIGURATION_SUCCESS:
            return {
                ...state,
                userDimensionConfiguration: action.payload,
                userDimensionConfigurationLoaded: true,
                userDimensionConfigurationLoading: false
            }
        case GET_USER_DIMENSION_CONFIGURATION_LOADING:
            return {
                ...state,
                userDimensionConfigurationLoading: true
            }
        case GET_USER_DIMENSION_CONFIGURATION_ERROR:
            return {
                ...state,
                userDimensionConfigurationLoading: false
            }
        case GET_USER_DIMENSIONS_FOR_CREATE_SUCCESS:
            return {
                ...state,
                userDimensionsForCreate: action.payload,
                userDimensionsForCreateLoaded: true,
                userDimensionsForCreateLoading: false
            }
        case GET_USER_DIMENSIONS_FOR_CREATE_LOADING:
            return {
                ...state,
                userDimensionsForCreateLoading: true
            }
        case GET_USER_DIMENSIONS_FOR_CREATE_ERROR:
            return {
                ...state,
                userDimensionsForCreateLoading: false
            }
        case GET_USER_DIMENSION_CONFIGURATION_FOR_COMPARE_SUCCESS:
            return {
                ...state,
                userDimensionConfigurationForCompare: action.payload,
                userDimensionConfigurationForCompareLoaded: true,
                userDimensionConfigurationForCompareLoading: false
            }
        case GET_USER_DIMENSION_CONFIGURATION_FOR_COMPARE_LOADING:
            return {
                ...state,
                userDimensionConfigurationForCompareLoading: true
            }
        case GET_USER_DIMENSION_CONFIGURATION_FOR_COMPARE_ERROR:
            return {
                ...state,
                userDimensionConfigurationForCompareLoading: false
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