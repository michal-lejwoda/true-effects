import {
    AUTH_ERROR,
    LOGIN_ERROR,
    POST_LOGOUT_AUTH,
    POST_REGISTER,
    REGISTER_ERROR,
    TOKEN_LOADED,
    USER_LOADED,
    USER_LOADING
} from './types';
import axios from 'axios';

const TRUEEFFECTS_URL = process.env.REACT_APP_TRUEEFFECTS_URL

export const postResetPassword = (data) => (dispatch, getState) =>{
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.post(`${TRUEEFFECTS_URL}/api/v1/reset_password/`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
                throw err
            }
        )
}

export const postPasswordChangeWithToken = (data) => (dispatch, getState) =>{
    return axios.post(`${TRUEEFFECTS_URL}/api/v1/password_change_with_token/`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
                throw err
            }
        )
}

export const changePassword = (data) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.post(`${TRUEEFFECTS_URL}/api/v1/change_password/`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
                throw err
            }
        )

}
export const postRegister = (data, handleSetToken) => dispatch => {
    delete axios.defaults.headers.common["Authorization"];
    axios.post(`${TRUEEFFECTS_URL}/api/v1/register/`, data)
        .then(res => {
            handleSetToken(res.data.token)
            return res
        })
        .then(res => dispatch(
            {
                type: POST_REGISTER,
                payload: res.data
            }))
        .catch((err) => dispatch({
            type: REGISTER_ERROR,
            payload: err.response.data
        }))
}
export const postLogoutAuth = (removeCookie) => dispatch => {
    removeCookie("true_effects_token")
    dispatch({
        type: POST_LOGOUT_AUTH
    })
}
export const loadUser = (data, handleSetToken) => (dispatch) => {
    dispatch({type: USER_LOADING});
    delete axios.defaults.headers.common["Authorization"];
    axios.post(`${TRUEEFFECTS_URL}/api/v1/login/`, data)
        // .then(res =>{
        //     handleSetToken(res.data.token)
        //     return res
        // })
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        }).catch(err => {
        dispatch({
            type: LOGIN_ERROR,
            payload: err.response.data
        })
    })
}
export const logoutUser = (handleRemoveToken) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    axios.get(`${TRUEEFFECTS_URL}/api/v1/logout/`)
        .then(res => {
            // handleRemoveToken()
            handleRemoveToken()
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('name')
            return res
        })
        .then(res => dispatch({
            type: AUTH_ERROR
        }))

}

export const loadToken = (token) => (dispatch, getState) => {
    dispatch({
        type: TOKEN_LOADED,
        payload: token
    });
}