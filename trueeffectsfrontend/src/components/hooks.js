import {useEffect, useState} from "react";
import {convertDate} from "./helpers/function_helpers";
import {useCookies} from "react-cookie";
import {createMultiSeriesValidation, createSingleSeriesValidation} from "./validation/validation";

export const useAuth = (token, loadToken, postLogoutAuth, history) => {
    const [cookies, setCookie, removeCookie] = useCookies(['true_effects_token']);
    useEffect(() => {
        if (cookies.true_effects_token !== undefined) {
            loadToken(cookies.true_effects_token)
        }else{
            history.push('/login')
        }
    }, [token])
    return {cookies, setCookie, removeCookie}
}

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

export const useCompareDimensions = (userDimensions) => {
    const [firstDimension, setFirstDimension] = useState(null)
    const [secondDimension, setSecondDimension] = useState(null)

    useEffect(() => {
        if (Object.keys(userDimensions).length > 1) {
            setFirstDimension(userDimensions[0])
            setSecondDimension(userDimensions[1])
        } else if (Object.keys(userDimensions).length == 1) {
            setFirstDimension(userDimensions[0])
            setSecondDimension(userDimensions[0])
        }
    }, [userDimensions])

    const handleFirstDimensionChange = (event) => {
        setFirstDimension(userDimensions.find(x => x.id === event.target.value))
    }

    const handleSecondDimensionChange = (event) => {
        setSecondDimension(userDimensions.find(x => x.id === event.target.value))
    }
    return {firstDimension, secondDimension, handleFirstDimensionChange, handleSecondDimensionChange}
}



export const useCreateMultiSeries = (props, values, setFieldValue, setErrors) =>{
    const {multiSeries, setMultiSeries} = props;
    const {exercise, series_count} = values;

    const handleChangeExercise = (exerciseObject) => {
        setFieldValue('exercise', exerciseObject)
    }

    const validateMultiSeries = () => {
        try {
            createMultiSeriesValidation.validateSync(values, {abortEarly: false});
            return true
        } catch (error) {
            const formattedErrors = error.inner.reduce((acc, validationError) => {
                acc[validationError.path] = validationError.message;
                return acc;
            }, {});
            setErrors(formattedErrors);
            return false
        }
    }

    const validateSingleSeries = () => {
        try {
            createSingleSeriesValidation.validateSync(values, {abortEarly: false});
            return true
        } catch (error) {
            const formattedErrors = error.inner.reduce((acc, validationError) => {
                acc[validationError.path] = validationError.message;
                return acc;
            }, {});

            setErrors(formattedErrors);
            return false
        }
    }


    const addMultiSingleSeries = (e) => {
        e.preventDefault()
        if (validateMultiSeries() === true) {
            const singleSeriesArray = Array.from({length: series_count}, () => values);

            if (multiSeries.length === 0 || multiSeries[multiSeries.length - 1].exercise.id !== exercise.id) {
                setMultiSeries(prevState => [...prevState, {
                    "single_series": [...singleSeriesArray],
                    "exercise": exercise
                }]);
            } else {
                setMultiSeries(prevState => {
                    const updatedMultiSeries = [...prevState];
                    const element = updatedMultiSeries[multiSeries.length - 1];
                    const updatedSingleSeries = [
                        ...element.single_series, ...singleSeriesArray
                    ];
                    updatedMultiSeries[multiSeries.length - 1] = {
                        ...element,
                        single_series: updatedSingleSeries
                    };
                    return updatedMultiSeries;
                });
            }
        } else {
            return
        }
    };


    const addToSingleSeries = (e) => {
        e.preventDefault()
        if (validateSingleSeries() === true) {
            const newSingleSeries = {...values};

            if (multiSeries.length === 0 || multiSeries[multiSeries.length - 1].exercise.id !== exercise.id) {
                setMultiSeries(prevState => [...prevState, {
                    "single_series": [newSingleSeries],
                    "exercise": exercise
                }]);
            } else {
                setMultiSeries(prevState => {
                    const updatedMultiSeries = [...prevState];
                    const element = updatedMultiSeries[multiSeries.length - 1];

                    updatedMultiSeries[multiSeries.length - 1] = {
                        ...element,
                        single_series: [...element.single_series, newSingleSeries]
                    };
                    return updatedMultiSeries;
                });
            }
        } else {
            return
        }
    };

    const loadExercises = async (param) => {
        return await props.getExercises(param)
    }
    return [loadExercises, addToSingleSeries, addMultiSingleSeries, handleChangeExercise]
}