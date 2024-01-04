import {useEffect, useState} from "react";
import {convertDate} from "./helpers/function_helpers";
import {useCookies} from "react-cookie";

export const useAuth = (loadToken, postLogoutAuth, history) => {
    const [cookies, setCookie, removeCookie] = useCookies(['true_effects_token']);
    useEffect(() => {
        if (cookies.true_effects_token !== undefined) {
            loadToken(cookies.true_effects_token)
            // props.getDimensionConfiguration();
            // props.getDimensions();
            // props.getUserDimensionsForCreate();
            // props.getDimensionConfigurationForCompare()
        }else{
            postLogoutAuth(removeCookie)
            history.push('/login')
        }
    }, [])
    return {}
}

export const useDate = () => {
    const [date, setDate] = useState(null)
    const [jsDate, setJsDate] = useState(null)
    const [dateError, setDateError] = useState(null)
    const handleDateForDimensions = (date) => {
        const convertedDate = convertDate(date)
        setDate(convertedDate)
        setJsDate(date)
    }
    return {date, jsDate, dateError, setDateError, handleDateForDimensions}
}

export const useCompareDimensions = (userDimensions) => {
    const [firstDimension, setFirstDimension] = useState(null)
    const [secondDimension, setSecondDimension] = useState(null)

    useEffect(() => {
        if (Object.keys(userDimensions).length > 1) {
            setFirstDimension(userDimensions[0])
            setSecondDimension(userDimensions[1])
        } else if (Object.keys(userDimensions).length == 1) {
            setFirstDimension(userDimensions[0])
            setSecondDimension(userDimensions[0])
        }
    }, [userDimensions])

    const handleFirstDimensionChange = (event) => {
        setFirstDimension(userDimensions.find(x => x.id === event.target.value))
    }

    const handleSecondDimensionChange = (event) => {
        setSecondDimension(userDimensions.find(x => x.id === event.target.value))
    }
    return {firstDimension, secondDimension, handleFirstDimensionChange, handleSecondDimensionChange}
}