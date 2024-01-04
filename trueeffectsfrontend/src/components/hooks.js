import {useState} from "react";
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
    console.log("trest")
    console.log(userDimensions)
    console.log("koniec")
    const [firstDimension, setFirstDimension] = useState({})
    const [secondDimension, setSecondDimension] = useState({})

    const handleFirstDimensionChange = (event) => {
        setFirstDimension(userDimensions.find(x => x.id === event.target.value))
    }

    const handleSecondDimensionChange = (event) => {
        setSecondDimension(userDimensions.find(x => x.id === event.target.value))
    }
    return {firstDimension, secondDimension, handleFirstDimensionChange, handleSecondDimensionChange}
}