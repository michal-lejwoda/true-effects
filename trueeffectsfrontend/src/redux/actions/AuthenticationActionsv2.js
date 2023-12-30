import {
    AUTH_ERROR,
    LOGIN_ERROR,
    POST_LOGIN,
    POST_LOGOUT,
    POST_LOGOUT_AUTH,
    POST_REGISTER,
    USER_LOADED,
    USER_LOADING
} from './types';
import axios from 'axios';

const TRUEEFFECTS_URL = process.env.REACT_APP_TRUEEFFECTS_URL

export const postLogin = (data) => dispatch => {
    delete axios.defaults.headers.common["Authorization"];
    axios.post(`${TRUEEFFECTS_URL}/api/login/`, data)
        .then(res => {
            window.localStorage.setItem('token', res.data.token)
            window.localStorage.getItem('name', res.data.name)
            console.log(localStorage.getItem('token'))

        })
        .then(res => dispatch({
            type: POST_LOGIN,
            payload: res,

        }))
        .catch(res => dispatch({
            type: LOGIN_ERROR,
            payload: "Dane logowania są niepoprawne",
        }))

}
export const postRegister = (data) => dispatch => {
    delete axios.defaults.headers.common["Authorization"];

    axios.post(`${TRUEEFFECTS_URL}/api/register/`, data)
        .then(res => dispatch(
            {
                type: POST_REGISTER,
                payload: res.data
            }))
        .catch((err) => {
            console.log("err");
            console.log(err);
            return err
        })
        // .catch(err => dispatch(
        //     {
        //         type: REGISTER_ERROR,
        //         payload: err,
        //         // payload: err.response.data,
        //     }))
}
export const postLogoutAuth = () => dispatch => {
    dispatch({
        type: POST_LOGOUT_AUTH
    })
}
export const loadUser = (data) => (dispatch, getState) => {
    dispatch({type: USER_LOADING});
    delete axios.defaults.headers.common["Authorization"];
    axios.post(`${TRUEEFFECTS_URL}/api/login/`, data)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        }).catch(err => {
        dispatch({
            type: LOGIN_ERROR,
            payload: "Błąd logowania popraw dane"
        })
    })
}
export const postLogout = () => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    axios.get(`${TRUEEFFECTS_URL}/api/logout/`)
        .then(res => dispatch({
            type: AUTH_ERROR
        }))
        .then(res => dispatch({
            type: POST_LOGOUT,
        }))
        .then(res => {
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('name')
        })
}
