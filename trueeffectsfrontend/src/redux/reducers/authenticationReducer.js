import {
    AUTH_ERROR,
    LOGIN_ERROR,
    POST_LOGIN,
    POST_LOGOUT_AUTH,
    POST_REGISTER,
    REGISTER_ERROR,
    TOKEN_LOADED,
    USER_LOADED,
    USER_LOADING,
} from '../actions/types';

const initialState = {
    token: null,
    name: null,
    isAuthenticated: null,
    login_error: [],
    error: '',
    error_register: [],
    tokenloaded: false,
    error_register_name: '',

};
export default function authreducer(state = initialState, action) {
    switch (action.type) {
        case POST_LOGIN:
            return {
                ...state,
                token: action.payload,
                tokenloaded: true,
                error: ''
            }
        case LOGIN_ERROR:
            return {
                ...state,
                login_error: action.payload
            }
        case POST_REGISTER:
            return {
                ...state,
                token: action.payload.token,
                name: action.payload.username,
                tokenloaded: true,
                error_register: []
            }
        case REGISTER_ERROR:
            return {
                ...state,
                error_register: action.payload
            }
        case POST_LOGOUT_AUTH:
            return {
                ...state,
                token: null,
                tokenloaded: false
            }
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                isLoaded: true,
                isAuthenticated: true,
                token: action.payload.token,
                name: action.payload.username,
                error: '',
                login_error: []
            }
        case AUTH_ERROR:
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            return {
                ...state,
                token: null,
                name: null,
                isAuthenticated: false,
                isLoading: false
            }
        case TOKEN_LOADED:
            return {
                ...state,
                token: action.payload
            }

        default:
            return state;
    }
}