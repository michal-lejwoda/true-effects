
export const handleMovetoHome = (history) => {
    history.push("/");
}

export const handleMovetoDimensions = (history) =>{
    history.push("/dimensions")
}

export const handleMovetoMobileDimensions = (history, isMobileNavOpen, setIsMobileNavOpen) =>{
    history.push("/dimensions")
    setIsMobileNavOpen(!isMobileNavOpen)
}

export const handleMoveToScheduler = (history) =>{
    history.push("/scheduler");
}

export const handleMoveToMobileScheduler = (history, isMobileNavOpen, setIsMobileNavOpen) =>{
    history.push("/scheduler");
    setIsMobileNavOpen(!isMobileNavOpen)
}

export const handleMoveToTraining = (history,id) => {
    history.push(`/training/${id}`)
}

export const handleMovetoSettings = (history) =>{
    history.push("/settings")
}

export const handleMoveToMobileSettings = (history, isMobileNavOpen, setIsMobileNavOpen) =>{
    history.push("/settings");
    setIsMobileNavOpen(!isMobileNavOpen)
}

export const handleMovetoGoals = (history) =>{
    history.push("/goals")
}

export const handleMoveToMobileGoals = (history, isMobileNavOpen, setIsMobileNavOpen) =>{
    history.push("/goals");
    setIsMobileNavOpen(!isMobileNavOpen)
}


export const handleMoveToModifyTraining = (history, id) =>{
    history.push(`/modify_training/${id}`)
}

export const handleMoveToCreateTraining = (history) =>{
    history.push("/create_training")
}

export const handleMoveToMobileCreateTraining = (history, isMobileNavOpen, setIsMobileNavOpen) =>{
    history.push("/create_training");
    setIsMobileNavOpen(!isMobileNavOpen)
}