import {convertDate} from "../../helpers/function_helpers";
import {useState} from "react";

export const useDate = () => {
    const today = new Date()
    const converted_date = convertDate(today)
    const [date, setDate] = useState(converted_date)
    const [jsDate, setJsDate] = useState(today)
    const [dateError, setDateError] = useState(null)
    const handleDateForDimensions = (date) => {
        const convertedDate = convertDate(date)
        setDate(convertedDate)
        setJsDate(date)
    }
    return {date, jsDate, dateError, setDateError, handleDateForDimensions}
}