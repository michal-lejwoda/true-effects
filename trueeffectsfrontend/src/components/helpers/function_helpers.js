export const convertDate = (date) => {
    date.setHours(12)
    const fullDate = date.toISOString().split('T')[0]
    return fullDate
}

export const handleDateForGoals = (date, setFieldValue) => {
    const convertedDate = convertDate(date)
    setFieldValue("finishDate", convertedDate)
    setFieldValue("finishJsDate", date)
}

export const timeToString = (hours, minutes, seconds) => {
    return `${hours < 10 ? 0 : ""}${hours}:${minutes < 10 ? 0 : ""}${minutes}:${seconds < 10 ? 0 : ""}${seconds}`
}