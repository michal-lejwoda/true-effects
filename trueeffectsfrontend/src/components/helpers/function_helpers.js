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

export const getBackendField = () => {
    const dict = {
        "concentric_phase": "faza koncentryczna",
        "pause_after_concentric_phase": "pauza po fazie koncentrycznej",
        "eccentric_phase": "faza ekscentryczna",
        "pause_after_eccentric_phase": "pauza po fazie ekscentrycznej",
        "extra_weight": "dodatkowa waga",
        "reps": "powtórzenia",
        "rest": "odpoczynek"
    }
    return dict
}