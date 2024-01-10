import {
    GET_TIME,
    GET_TIME_SUCCESS,
    GET_MEASUREMENTS_SUCCESS,
    GET_MEASUREMENTS,
    GET_TRAININGS,
    GET_TRAININGS_SUCCESS,
    GET_GOALS,
    GET_GOALS_SUCCESS,
    POST_MEASUREMENT,
    POST_MEASUREMENT_SUCCESS,
    GET_EXERCISES,
    DELETE_MEASUREMENT_SUCCESS,
    GET_EXERCISES_SUCCESS,
    GET_OWN_EXERCISES_SUCCESS,
    END_TRAINING_SUCCESS,
    POST_TIME,
    GET_USER_COMPLETED_GOALS_SUCCESS,
    GET_USER_GOALS_TO_ACHIEVE_SUCCESS,
    GET_USER_DIMENSIONS_SUCCESS,
    PUT_USER_DIMENSION_CONFIGURATION_SUCCESS,
    GET_USER_DIMENSION_CONFIGURATION_SUCCESS,
    GET_USER_DIMENSIONS_FOR_CREATE,
    GET_USER_DIMENSION_CONFIGURATION_FOR_COMPARE_SUCCESS,
    GET_SINGLE_TRAINING_SUCCESS,
    UPDATE_SINGLE_TRAINING_SUCCESS,
    CREATE_SINGLE_TRAINING_BASED_ON_OLD, CREATE_SINGLE_TRAINING_BASED_ON_OLD_SUCCESS,
} from './types';
import axios from 'axios';

const TRUEEFFECTS_URL = process.env.REACT_APP_TRUEEFFECTS_URL
export const getTime = (time) => (dispatch) => {
    dispatch({type: GET_TIME})
    dispatch({
        type: GET_TIME_SUCCESS,
        payload: time
    })
}
export const getMeasurements = () => (dispatch, getState) => {
    dispatch({type: GET_MEASUREMENTS})
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get(`${TRUEEFFECTS_URL}/api/display_personal_dimensions/`)
        .then(res => dispatch({
            type: GET_MEASUREMENTS_SUCCESS,
            payload: res,
        }));
}

// export const postTraining = (data) => async(dispatch,getState) => {
//     let token = window.localStorage.getItem('token')
//     if (token === null){
//         token = getState().authentication.token
//     }
//     axios.defaults.headers.common['Authorization'] = `Token ${token}`
//     return await axios.post(`${TRUEEFFECTS_URL}/api/create_training/`,data)
//     .then(res=>{
//         alert("Trening został dodany")
//     })
//     .catch(err=>{
//         console.log(err.response)
//         alert("Nieudało się dodać treningu popraw błędy")
//     })
// }
// export const getTrainings = () => (dispatch,getState) =>{
//     dispatch({type: GET_TRAININGS})
//     let token = getState().authentication.token
//     axios.defaults.headers.common['Authorization'] = `Token ${token}`
//     return axios.get(`${TRUEEFFECTS_URL}/api/display_training/`)
//     .then(res => dispatch({
//         type: GET_TRAININGS_SUCCESS,
//         payload: res,
//     }));
// }
export const getGoals = () => (dispatch, getState) => {
    dispatch({type: GET_GOALS})
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get(`${TRUEEFFECTS_URL}/api/display_description_goals/`)
        .then(res => dispatch({
            type: GET_GOALS_SUCCESS,
            payload: res,
        }));
}
export const postGoals = (data) => (dispatch, getState) => {
    console.log("data post Goals")
    console.log(data)
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.post(`${TRUEEFFECTS_URL}/api/create_description_goals/`, data)
        .then(res => {
            alert("Dodano cel")
        })
        .catch(err => {
            console.log(err.response)
        })

}
export const postMeasurement = (data) => (dispatch, getState) => {
    dispatch({type: POST_MEASUREMENT})
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.post(`${TRUEEFFECTS_URL}/api/create_personal_dimensions/`, data)
        .then(res => dispatch({
            type: POST_MEASUREMENT_SUCCESS,
        }))
        .catch(err => {
            console.log(err.response)
        })

}

export const postOwnExercise = (data) => (dispatch, getState) => {
    let token = getState().authentication.token
    let dictdata = {"name": data}
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.post(`${TRUEEFFECTS_URL}/api/create_own_exercise/`, dictdata)
        .catch(err => {
            alert("Wystąpił błąd")
        })
}
export const deleteTraining = pk => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.delete(`${TRUEEFFECTS_URL}/api/delete_training/${pk}`)
        .then(res => {
            alert("Trening został usunięty")
        })
        .catch("Wystąpił problem z usunięciem treningu")

}
export const deleteMeasurement = pk => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.delete(`${TRUEEFFECTS_URL}/api/delete_measurement/${pk}`)
        .then(res => dispatch({
            type: DELETE_MEASUREMENT_SUCCESS,
        }))
        .then(res => {
            alert("Trening został usunięty")
        })
        .catch("Wystąpił problem z usunięciem treningu")
}

export const deleteGoals = pk => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.delete(`${TRUEEFFECTS_URL}/api/delete_goals/${pk}`)
        .then(res => {
            alert("Trening został usunięty")
        })
}
export const updateDateTraining = (pk, data) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    console.log(data)
    return axios.post(`${TRUEEFFECTS_URL}/api/update_training_date/${pk}`, data)
        .then(res => {
            alert("Data treningu została zaktualizowana")
        })
        .catch(err => {
            alert("Wystąpił błąd. Spróbuj później")
        })
}
export const endTraining = (pk, data) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.post(`${TRUEEFFECTS_URL}/api/update_training_after_end/${pk}`, data)
        .then(res => dispatch({
            type: END_TRAINING_SUCCESS,
        }))
        .then(res => {
            alert("Trenining został zakończony")
        })
}


export const postTime = (sec, min, hour) => (dispatch) => {
    dispatch({
        type: POST_TIME,
        second: sec,
        minute: min,
        hour: hour
    })
}
//////////////////////////////////////////////////////////////////
export const postGoal = (data) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.post(`${TRUEEFFECTS_URL}/api/v1/user_goal/`, data)
        .then(res => {
            alert("Cel został dodany")
        })
}

export const getCompletedGoals = () => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get(`${TRUEEFFECTS_URL}/api/v1/user_goal/completed/`)
        .then(res => dispatch({
            type: GET_USER_COMPLETED_GOALS_SUCCESS,
            payload: res,
        }));
}


export const getGoalsToAchieve = () => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get(`${TRUEEFFECTS_URL}/api/v1/user_goal/`)
        .then(res => dispatch({
            type: GET_USER_GOALS_TO_ACHIEVE_SUCCESS,
            payload: res,
        }));
}

export const putGoal = (data) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.put(`${TRUEEFFECTS_URL}/api/v1/user_goal/`, data)
        .then(
            alert("Pomiar został zaaktualizowany")
        )
}

export const postDimension = (data) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.post(`${TRUEEFFECTS_URL}/api/v1/user_dimension/`, data)
        .then(res => {
            alert("Pomiar został dodany")
        })
}

export const putDimension = (data) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.put(`${TRUEEFFECTS_URL}/api/v1/user_dimension/`, data)
        .then(
            alert("Pomiar został zaaktualizowany")
        )
}

export const getDimensions = () => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get(`${TRUEEFFECTS_URL}/api/v1/user_dimension/`)
        .then(res => dispatch({
            type: GET_USER_DIMENSIONS_SUCCESS,
            payload: res.data,
        }));
}

export const getUserDimensionsForCreate = () => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get(`${TRUEEFFECTS_URL}/api/v1/user_dimension/get_user_dimensions_for_create/`)
        .then(res => dispatch({
            type: GET_USER_DIMENSIONS_FOR_CREATE,
            payload: res.data,
        }));
}

export const postTraining = (data) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.post(`${TRUEEFFECTS_URL}/api/v1/training/`, data)
    // .then(res=>{
    //     alert("Cel został dodany")
    // })
}

export const getTrainings = () => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get(`${TRUEEFFECTS_URL}/api/v1/trainings/`)
        .then(res => dispatch({
            type: GET_TRAININGS_SUCCESS,
            payload: res,
        }));
}

export const postSingleSeries = (data) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.post(`${TRUEEFFECTS_URL}/api/v1/training/singleseries/`, data)
        .then(res => {
            return res.data
        });
}

export const postMultiSeries = (data) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.post(`${TRUEEFFECTS_URL}/api/v1/training/multiseries/`, data)
        .then(res => {
            return res.data
        });
}
export const getSingleDimension = (id) => (getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get(`${TRUEEFFECTS_URL}/api/user_dimension/${id}`)
        .then(res => {
            return res.data
        });
}

export const putDimensionConfiguration = (data) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.put(`${TRUEEFFECTS_URL}/api/v1/user_dimension_configuration/${data.id}/`, data)
        .then(res => dispatch({
            type: PUT_USER_DIMENSION_CONFIGURATION_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            console.log(err.response)
        })
}

export const getDimensionConfiguration = () => (dispatch, getState) => {
    let token = getState().authentication.token
    console.log("tokenget")
    console.log(token)
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get(`${TRUEEFFECTS_URL}/api/v1/user_dimension_configuration/get_user_dimension_config/`)
        .then(res => dispatch({
            type: GET_USER_DIMENSION_CONFIGURATION_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            console.log(err.response)
        })

}

export const getDimensionConfigurationForCompare = () => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get(`${TRUEEFFECTS_URL}/api/v1/user_dimension_configuration/get_user_dimensions_configuration_for_compare/`)
        .then(res => dispatch({
            type: GET_USER_DIMENSION_CONFIGURATION_FOR_COMPARE_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            console.log(err.response)
        })

}


export const getSingleTraining = (id) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get(`${TRUEEFFECTS_URL}/api/v1/single_training/${id}/get_training_by_id/`)
        .then(res => dispatch({
            type: GET_SINGLE_TRAINING_SUCCESS,
            payload: res.data
        }))
}

export const updateTraining = (data) => (dispatch, getState) =>{
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.put(`${TRUEEFFECTS_URL}/api/v1/single_training/${data.id}/update_training/`, data)
        .then(res => dispatch({
            type: UPDATE_SINGLE_TRAINING_SUCCESS,
            payload: res.data
        }))
}

export const createTraining = (data) => (dispatch, getState) =>{
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    console.log("createTraining")
    console.log(data)
    return axios.post(`${TRUEEFFECTS_URL}/api/v1/single_training/`, data)
        .then(res => dispatch({
            type: CREATE_SINGLE_TRAINING_BASED_ON_OLD_SUCCESS,
            payload: res.data
        }))
}

export const deleteCurrentTraining = (id) => (dispatch, getState) =>{
        let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    console.log("deleteTraining")
    console.log(id)
    return axios.delete(`${TRUEEFFECTS_URL}/api/v1/single_training/${id}/`)
        .then(res => dispatch({
            type: CREATE_SINGLE_TRAINING_BASED_ON_OLD_SUCCESS,
            payload: res.data
        }))
}

export const getExercises = (param) => (dispatch, getState) => {
    let token = getState().authentication.token
    console.log("token")
    console.log(token)
    // dispatch({type: GET_EXERCISES})
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get(`${TRUEEFFECTS_URL}/api/v1/exercise/?name=${param}`)
        .then(res=>{
            return res.data
        })
        .catch(err=>{
            console.log(err)
            return err
        })
        // .then(res => dispatch({
        //     type: GET_EXERCISES_SUCCESS,
        //     payload: res.data
        // }))
}