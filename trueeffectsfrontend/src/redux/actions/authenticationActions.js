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
    return axios.patch(`${TRUEEFFECTS_URL}/api/v1/change_password/update/`, data)
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
            return res.data
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
// TODO FIX Translation
export const postLogoutAuth = (removeCookie) => (dispatch, getState) => {
    let token = getState().authentication.token;

    if (!token) {
        removeCookie("true_effects_token", { path: '/' });
        webSocketClient.close();
        dispatch({ type: POST_LOGOUT_AUTH });
        return Promise.resolve();
    }

    axios.defaults.headers.common['Authorization'] = `Token ${token}`;

    return axios.post(`${TRUEEFFECTS_URL}/api/v1/logout/`)
        .then(res => {
            cleanupAfterLogout(dispatch, removeCookie);
            return res.data;
        })
        .catch(err => {
            console.error("Błąd przy wylogowaniu:", err);
            cleanupAfterLogout(dispatch, removeCookie);
            throw err;
        });
};

const cleanupAfterLogout = (dispatch, removeCookie) => {
    removeCookie("true_effects_token", { path: '/' });
    delete axios.defaults.headers.common['Authorization'];
    if (webSocketClient && webSocketClient.close) {
        webSocketClient.close();
    }
    dispatch({ type: POST_LOGOUT_AUTH });
};


export const changeLanguage = (data) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.post(`${TRUEEFFECTS_URL}/api/v1/change_default_language/`, data)
        .then(res => {
            return res.data
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
}


export const loadUser = (data, handleSetToken) => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  delete axios.defaults.headers.common["Authorization"];

  try {
    const res = await axios.post(`${TRUEEFFECTS_URL}/api/v1/login/`, data);
    i18n.changeLanguage(res.data.default_language);
    handleSetToken(res.data.token);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });

    return res.data;
  } catch (err) {
    let errorPayload;
    if (err.response) {
      errorPayload = err.response.data;
    } else if (err.request) {
      errorPayload = { detail: "No response from server" };
    } else {
      errorPayload = { detail: err.message };
    }
    dispatch({
      type: LOGIN_ERROR,
      payload: errorPayload,
    });
    throw errorPayload;
  }
};

export const loadToken = (token) => (dispatch, getState) => {
    dispatch({
        type: TOKEN_LOADED,
        payload: token
    });
}