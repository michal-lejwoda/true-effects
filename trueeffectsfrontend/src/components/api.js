import axios from "axios";
import {GET_USER_DIMENSIONS_SUCCESS} from "../redux/actions/types";

const TRUEEFFECTS_URL = process.env.REACT_APP_TRUEEFFECTS_URL

export const getSingleDimension = async() => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    const response =  axios.get(`${TRUEEFFECTS_URL}/api/user_dimension/single_dimension/`)
    return response.data
}