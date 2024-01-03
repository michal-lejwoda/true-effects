export const convertDate = (date) => {
    {/* Convert date to YYYY-MM-DD Format */
    }
    const fullDate = date.toISOString().split('T')[0]
    return fullDate
}

export const getActiveDimensions = (userDimensionConfiguration, userDimensions, setFieldValue) => {
    let configAfterChanges = Object.assign({}, userDimensionConfiguration)
    delete configAfterChanges.user
    delete configAfterChanges.id
    // let temp_arr = []
    for (const [key_obj_value, value_obj] of Object.entries(configAfterChanges)) {
        if (value_obj == true) {
            // let temp_obj = {}
            if (userDimensions.length > 0) {
                if(userDimensions[0][`${key_obj_value}`]==null){
                    // temp_obj[`${key_obj_value}`] = ''
                    setFieldValue(`${key_obj_value}`, '')
                }else{
                    // temp_obj[`${key_obj_value}`] = [userDimensions[0][`${key_obj_value}`]]
                    setFieldValue(`${key_obj_value}`, userDimensions[0][`${key_obj_value}`])
                }
            } else {
                // temp_obj[`${key_obj_value}`] = ''
                setFieldValue(`${key_obj_value}`, '')
            }
            // temp_arr.push(temp_obj)
        }
    }
    // return temp_arr
    // setDimensionsArray(temp_arr)
}

// export const getActiveDimensions = (userDimensions, setFieldValue) => {
//     for (const [key_obj_value, value_obj] of Object.entries(userDimensions[0])) {
//
//         console.log("key_obj_value")
//         console.log(key_obj_value)
//         console.log(value_obj)
//         if (userDimensions.length > 0) {
//             if (userDimensions[0][`${key_obj_value}`] == null) {
//                 // temp_obj[`${key_obj_value}`] = ''
//                 setFieldValue(`${key_obj_value}`, '')
//             } else {
//                 // temp_obj[`${key_obj_value}`] = [userDimensions[0][`${key_obj_value}`]]
//                 setFieldValue(`${key_obj_value}`, userDimensions[0][`${key_obj_value}`])
//             }
//         } else {
//             // temp_obj[`${key_obj_value}`] = ''
//             setFieldValue(`${key_obj_value}`, '')
//         }
//         // temp_arr.push(temp_obj)
//
//     }
//     // return temp_arr
//     // setDimensionsArray(temp_arr)
// }

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
