import {
    POST_LOGIN,
    POST_LOGOUT,
    POST_LOGOUT_AUTH,
    LOGIN_ERROR,
    POST_REGISTER,
    REGISTER_ERROR,
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR, TOKEN_LOADED
} from './types';
import axios from 'axios';
import {useCookies} from "react-cookie";

const TRUEEFFECTS_URL = process.env.REACT_APP_TRUEEFFECTS_URL


export const postLogin = (data) => dispatch => {
    delete axios.defaults.headers.common["Authorization"];
    axios.post(`${TRUEEFFECTS_URL}/api/v1/login/`, data)
        .then(res => {
            window.localStorage.setItem('token', res.data.token)
            window.localStorage.getItem('name', res.data.name)
        })
        .then(res => dispatch({
            type: POST_LOGIN,
            payload: res,

        })
        )
        .catch(res => dispatch({
            type: LOGIN_ERROR,
            payload: "Dane logowania są niepoprawne",
        }))

}
export const postRegister = (data, handleSetToken) => dispatch => {
    delete axios.defaults.headers.common["Authorization"];

    axios.post(`${TRUEEFFECTS_URL}/api/v1/register/`, data)
        .then(res =>{
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
        // .then(res => dispatch({
        //     type: POST_LOGOUT,
        // }))

}

export const loadToken = (token) => (dispatch, getState) => {
    dispatch({
        type: TOKEN_LOADED,
        payload: token
    });
}