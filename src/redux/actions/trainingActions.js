import {POST_LOGOUT,GET_TIME,GET_TIME_SUCCESS,AUTH_ERROR,GET_MEASUREMENTS_SUCCESS,GET_MEASUREMENTS,POST_TRAINING,GET_TRAININGS,
     GET_TRAININGS_SUCCESS,GET_GOALS,GET_GOALS_SUCCESS,POST_MEASUREMENT,
     POST_MEASUREMENT_SUCCESS, GET_EXERCISES,DELETE_MEASUREMENT_SUCCESS,
     GET_EXERCISES_SUCCESS,GET_OWN_EXERCISES_SUCCESS,END_TRAINING_SUCCESS,POST_TIME} from './types';
import axios from 'axios';

export const getTime = (time)=>(dispatch) =>{
    dispatch({type: GET_TIME})
    dispatch({
        type: GET_TIME_SUCCESS,
        payload: time
    })
}
export const getMeasurements =()=>(dispatch,getState) => {
    dispatch({type: GET_MEASUREMENTS})
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get('https://true-effects.herokuapp.com/api/display_personal_dimensions/')
    .then(res=> dispatch({
        type: GET_MEASUREMENTS_SUCCESS,
        payload: res,
    }));
}
export const getExercises = () =>(dispatch,getState)=>{
    let token = getState().authentication.token
    dispatch({type: GET_EXERCISES})
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    axios.get('https://true-effects.herokuapp.com/api/display_own_exercise/')
    .then(res=>dispatch({
        type: GET_OWN_EXERCISES_SUCCESS,
        payload: res.data
    }))
    .then(
    axios.get('https://true-effects.herokuapp.com/api/display_exercises/')
    .then(res=> dispatch({
        type: GET_EXERCISES_SUCCESS,
        payload: res,
    })));
}
export const postTraining = (data) => async(dispatch,getState) => {
    let token = window.localStorage.getItem('token')
    if (token === null){
        token = getState().authentication.token
    }
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return await axios.post('https://true-effects.herokuapp.com/api/create_training/',data)
    .then(res=>{
        alert("Trening został dodany")
    })
    .catch(err=>{
        console.log(err.response)
        alert("Nieudało się dodać treningu popraw błędy")
    })
}
export const getTrainings = () => (dispatch,getState) =>{
    dispatch({type: GET_TRAININGS})
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get('https://true-effects.herokuapp.com/api/display_training/')
    .then(res => dispatch({
        type: GET_TRAININGS_SUCCESS,
        payload: res,
    }));
}
export const getGoals = () => (dispatch,getState) =>{
    dispatch({type: GET_GOALS})
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get('https://true-effects.herokuapp.com/api/display_description_goals/')
    .then(res => dispatch({
        type: GET_GOALS_SUCCESS,
        payload: res,
    }));
}
export const postGoals = (data) => (dispatch,getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.post('https://true-effects.herokuapp.com/api/create_description_goals/',data)
    .then(res=>{
        alert("Dodano cel")
    })
    .catch(err=>{
        console.log(err.response)
    })
    
}
export const postMeasurement = (data) => (dispatch,getState) =>{
    dispatch({type: POST_MEASUREMENT})
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.post('https://true-effects.herokuapp.com/api/create_personal_dimensions/',data)
    .then(res=>dispatch({
        type: POST_MEASUREMENT_SUCCESS,
    }))
    .catch(err=>{
        console.log(err.response)
    })

}

export const postOwnExercise = (data) => (dispatch,getState) =>{
    let token = getState().authentication.token
    let dictdata = {"name": data}
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.post('https://true-effects.herokuapp.com/api/create_own_exercise/',dictdata)
    .catch(err=>{
        alert("Wystąpił błąd")
    })
}
export const deleteTraining = pk =>(dispatch,getState)=>{
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.delete(`https://true-effects.herokuapp.com/api/delete_training/${pk}`)
    .then(res => {
        alert("Trening został usunięty")
    })
    .catch("Wystąpił problem z usunięciem treningu")

}
export const deleteMeasurement = pk =>(dispatch,getState)=>{
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.delete(`https://true-effects.herokuapp.com/api/delete_measurement/${pk}`)
    .then(res=>dispatch({
        type: DELETE_MEASUREMENT_SUCCESS,
    }))
    .then(res=>{
        alert("Trening został usunięty")
    })
    .catch("Wystąpił problem z usunięciem treningu")
}

export const deleteGoals = pk =>(dispatch,getState)=>{
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.delete(`https://true-effects.herokuapp.com/api/delete_goals/${pk}`)
    .then(res => {
        alert("Trening został usunięty")
    })
}
export const updateDateTraining = (pk,data) =>(dispatch,getState) =>{
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    console.log(data)
    return axios.post(`https://true-effects.herokuapp.com/api/update_training_date/${pk}`,data)
    .then(res => {
        alert("Data treningu została zaktualizowana")
    })
    .catch(err => {
        alert("Wystąpił błąd. Spróbuj później")
    })
}
export const endTraining = (pk,data)=>(dispatch,getState) =>{
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.post(`https://true-effects.herokuapp.com/api/update_training_after_end/${pk}`,data)
    .then(res=>dispatch({
        type: END_TRAINING_SUCCESS,
    }))
    .then(res => {
        alert("Trenining został zakończony")
    })
}

export const postTime = (sec,min,hour) => (dispatch) => {
    dispatch({
        type: POST_TIME,
        second: sec,
        minute: min,
        hour: hour
    })
}