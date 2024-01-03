export const convertDate = (date) => {
    {/* Convert date to YYYY-MM-DD Format */
    }
    const fullDate = date.toISOString().split('T')[0]
    return fullDate
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
