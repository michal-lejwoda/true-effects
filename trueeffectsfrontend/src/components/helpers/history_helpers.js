
export const handleMovetoHome = (history) => {
    history.push("/");
}
export const handleMovetoScheduler = (history) => {
    history.push("/schedule");
}
export const handleMovetoCreator = (history) => {
    history.push("/createtraining");
}
export const handleMovetoMeasurements = (history) => {
    history.push("/addmeasurements");
}
export const handleMovetoAllMeasurements = (history) => {
    history.push("/displaymeasurements");
}

export const handleMovetoGoalsAndDimensions = (history) =>{
    history.push("/goals_and_dimensions")
}

export const handleMovetoDimensions = (history) =>{
    history.push("/dimensions")
}

export const handleMovetoMobileDimensions = (history, isMobileNavOpen, setIsMobileNavOpen) =>{
    history.push("/dimensions")
    setIsMobileNavOpen(!isMobileNavOpen)
}

export const handleMovetoAddGoals = (history) => {
    history.push("/addgoals");
}

export const handleMoveToScheduler = (history) =>{
    history.push("/scheduler");
}

export const handleMoveToMobileScheduler = (history, isMobileNavOpen, setIsMobileNavOpen) =>{
    history.push("/scheduler");
    setIsMobileNavOpen(!isMobileNavOpen)
}

export const handleMoveToTraining = (history) => {
    history.push("/training")
}

export const handleMoveToMobileTraining = (history, isMobileNavOpen, setIsMobileNavOpen) =>{
    history.push("/training");
    setIsMobileNavOpen(!isMobileNavOpen)
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


export const handleMoveToModifyTraining = (history) =>{
    history.push("/modify_training")
}

export const handleMoveToCreateTraining = (history) =>{
    history.push("/create_training")
}

export const handleMoveToMobileCreateTraining = (history, isMobileNavOpen, setIsMobileNavOpen) =>{
    history.push("/create_training");
    setIsMobileNavOpen(!isMobileNavOpen)
}