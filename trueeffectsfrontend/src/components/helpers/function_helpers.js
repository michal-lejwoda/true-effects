export const convertDate = (date) => {
    date.setHours(12)
    const fullDate = date.toISOString().split('T')[0]
    return fullDate
}

export const convertStringToDate = (date) =>{
    const dateComponents = date.split("-");
    const myDate = new Date(dateComponents[2], dateComponents[1] - 1, dateComponents[0]);
    return myDate
}

export const handleDateForGoals = (date, setFieldValue) => {
    const convertedDate = convertDate(date)
    setFieldValue("finishDate", convertedDate)
    setFieldValue("finishJsDate", date)
}
export const handleDateForDimensions = (date, setDate, setJsDate) => {
    const convertedDate = convertDate(date)
    setDate(convertedDate)
    setJsDate(date)
}

export const timeToString = (hours, minutes, seconds) =>{
    return `${hours < 10 ? 0: ""}${hours}:${minutes < 10 ? 0: ""}${minutes}:${seconds < 10 ? 0: ""}${seconds}`
}