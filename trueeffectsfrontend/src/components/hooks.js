import {useEffect, useState} from "react";
import {convertDate} from "./helpers/function_helpers";

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

export const useCompareDimensions = (userDimensions) =>{
    const [firstDimension, setFirstDimension] = useState(null)
    const [secondDimension, setSecondDimension] = useState(null)

    useEffect(()=>{
        if(userDimensions.length > 1){
            setFirstDimension(userDimensions[0])
            setSecondDimension(userDimensions[1])
        }else if(userDimensions.length == 1){
            setFirstDimension(userDimensions[0])
            setSecondDimension(userDimensions[0])
        }
    },[])

    const handleFirstDimensionChange = (event) => {
        setFirstDimension(userDimensions.find(x => x.id === event.target.value))
    }

    const handleSecondDimensionChange = (event) => {
        setSecondDimension(userDimensions.find(x => x.id === event.target.value))
    }
    return {firstDimension, secondDimension, handleFirstDimensionChange, handleSecondDimensionChange}
}