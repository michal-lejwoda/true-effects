import {
    LANGUAGE_LOADED,
    LOGIN_ERROR,
    POST_LOGOUT_AUTH,
    POST_REGISTER,
    REGISTER_ERROR,
    TOKEN_LOADED,
    USER_LOADED,
    USER_LOADING,
    GET_USER_ACHIEVEMENTS, GET_USER_ACHIEVEMENTS_FAILED
} from './types';
import axios from 'axios';
import i18n from "i18next";
import webSocketClient from "../../components/websockets/LogInTimeWebSocket";

const TRUEEFFECTS_URL = process.env.REACT_APP_TRUEEFFECTS_URL

export const postResetPassword = (data) => (dispatch, getState) => {
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
export const postConfirmAchievement = (user_achievement_id) => (dispatch, getState) => {
    const token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    const data = {"user_achievement_id": user_achievement_id}
    return axios.post(`${TRUEEFFECTS_URL}/api/v1/confirm_achievement/`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
                throw err
            }
        )
}

export const getUserAchievements = () => (dispatch, getState) => {
    const token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get(`${TRUEEFFECTS_URL}/api/v1/achievements/`)
        .then(res => dispatch(
            {
                type: GET_USER_ACHIEVEMENTS,
                payload: res.data
            }))
        .catch(err => dispatch(
            {
                type: GET_USER_ACHIEVEMENTS_FAILED,
            })
        )
}

export const postPasswordChangeWithToken = (data) => (dispatch, getState) => {
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
    return axios.patch(`${TRUEEFFECTS_URL}/api/v1/change_password/`, data)
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
            i18n.changeLanguage(res.data.default_language);
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
export const postLogoutAuth = (removeCookie) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.post(`${TRUEEFFECTS_URL}/api/v1/logout/`)
        .then(res => {
            removeCookie("true_effects_token")
            webSocketClient.close();
            dispatch({
                type: POST_LOGOUT_AUTH
            })
            return res
        })
}

export const changeLanguage = (data) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.post(`${TRUEEFFECTS_URL}/api/v1/change_default_language/`, data)
        .then(res => {
            return res
        })
        .catch(err => {
            console.log(err)
        })
}

export const getUser = () => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get(`${TRUEEFFECTS_URL}/api/v1/get_user/`)
        .then(res => {
            i18n.changeLanguage(res.data.default_language);
            return res.data
        })
        .then(() => dispatch({
            type: LANGUAGE_LOADED,
        }))
        .catch(err => {
            console.log(err)
        })
}


export const loadUser = (data, handleSetToken) => (dispatch) => {
    dispatch({type: USER_LOADING});
    delete axios.defaults.headers.common["Authorization"];
    return axios.post(`${TRUEEFFECTS_URL}/api/v1/login/`, data)
        .then(res => {
            i18n.changeLanguage(res.data.default_language);
            handleSetToken(res.data.token)
            return res
        })
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
            return res.data
        }).catch(err => {
            console.log("err")
            console.log(err)
            dispatch({
                type: LOGIN_ERROR,
                payload: err.response.data
            })
        })
}

export const loadToken = (token) => (dispatch, getState) => {
    dispatch({
        type: TOKEN_LOADED,
        payload: token
    });
}