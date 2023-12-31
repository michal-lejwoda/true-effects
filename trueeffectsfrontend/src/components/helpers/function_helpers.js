export const convertDate = (date) => {
    {/* Convert date to YYYY-MM-DD Format */}
    const day = date.getDay()
    const month = date.getMonth()
    const year = date.getFullYear()
    const fullDate = year + "-" + month + "-" + day
    return fullDate
}