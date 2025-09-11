
export const handleMovetoHome = (navigate) => {
    navigate("/");
}

export const handleMovetoDimensions = (navigate) =>{
    navigate("/dimensions")
}

export const handleMovetoMobileDimensions = (navigate, isMobileNavOpen, setIsMobileNavOpen) =>{
    navigate("/dimensions")
    setIsMobileNavOpen(!isMobileNavOpen)
}

export const handleMoveToScheduler = (navigate) =>{
    navigate("/scheduler");
}

export const handleMoveToDashboard = (navigate) =>{
    navigate("/")
}

export const handleMoveToMobileDashboard = (navigate, isMobileNavOpen, setIsMobileNavOpen) =>{
    navigate("/");
    setIsMobileNavOpen(!isMobileNavOpen)
}

export const handleMoveToMobileScheduler = (navigate, isMobileNavOpen, setIsMobileNavOpen) =>{
    navigate("/scheduler");
    setIsMobileNavOpen(!isMobileNavOpen)
}

export const handleMoveToTraining = (navigate,id) => {
    navigate(`/training/${id}`)
}

export const handleMovetoSettings = (navigate) =>{
    navigate("/settings")
}

export const handleMoveToMobileSettings = (navigate, isMobileNavOpen, setIsMobileNavOpen) =>{
    navigate("/settings");
    setIsMobileNavOpen(!isMobileNavOpen)
}

export const handleMovetoGoals = (navigate) =>{
    navigate("/goals")
}

export const handleMoveToMobileGoals = (navigate, isMobileNavOpen, setIsMobileNavOpen) =>{
    navigate("/goals");
    setIsMobileNavOpen(!isMobileNavOpen)
}


export const handleMoveToModifyTraining = (navigate, id) =>{
    navigate(`/modify_training/${id}`)
}

export const handleMoveToCreateTraining = (navigate) =>{
    navigate("/create_training")
}

export const handleMoveToAchievements = (navigate) => {
    navigate("/achievements")
}

export const handleMoveToMobileCreateTraining = (navigate, isMobileNavOpen, setIsMobileNavOpen) =>{
    navigate("/create_training");
    setIsMobileNavOpen(!isMobileNavOpen)
}
export const handleMoveToMobileAchievements = (navigate, isMobileNavOpen, setIsMobileNavOpen) =>{
    navigate("/achievements");
    setIsMobileNavOpen(!isMobileNavOpen)
}

export const handleMoveToLogin = (navigate) => {
        navigate('/login')
}
export const handleMoveToRegister = (navigate) => {
        navigate('/register')
    }