import {useEffect, useState} from "react";
import {convertDate} from "./helpers/function_helpers";
import {useCookies} from "react-cookie";
import {
    createMultiSeriesValidation,
    createSingleSeriesValidation, createTrainingValidation,
    loginUserValidation,
    registerUserValidation
} from "./validation/validation";
import {handleMoveToScheduler} from "./helpers/history_helpers";
import {useHistory} from "react-router-dom";
import {useFormik} from "formik";

export const useAuth = (token, loadToken, postLogoutAuth, history) => {
    const [cookies, setCookie, removeCookie] = useCookies(['true_effects_token']);

    useEffect(() => {
        if (cookies.true_effects_token !== undefined) {
            return loadToken(cookies.true_effects_token)
        } else if (token !== null) {
            return setCookie('true_effects_token', token)
        } else if (token === null) {
            history.push('/login')
        }


        // else {
        //     history.push('/login')
        // }
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


export const useCreateMultiSeries = (props, values, setFieldValue, setErrors) => {
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
            return null
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
            return null
        }
    };

    const loadExercises = async (param) => {
        return await props.getExercises(param)
    }
    return [loadExercises, addToSingleSeries, addMultiSingleSeries, handleChangeExercise]
}


export const useTraining = (props) => {
    const history = useHistory()
    const {training} = props
    const [currentTraining, setCurrentTraining] = useState(training)
    const [actualMultiSeries, setActualMultiSeries] = useState(0)
    const [actualSingleSeries, setActualSingleSeries] = useState(0)
    const [trainingFinished, setTrainingFinished] = useState(false)
    const {multi_series} = currentTraining
    const {
        concentric_phase,
        pause_after_concentric_phase,
        eccentric_phase,
        pause_after_eccentric_phase,
        extra_weight,
        reps
    } = multi_series[actualMultiSeries].single_series[actualSingleSeries]

    const [extraWeight, setExtraWeight] = useState(extra_weight)
    const [actualReps, setActualReps] = useState(reps)
    const modifyMultiSeries = () => {
        const updatedCurrentTraining = {...currentTraining}
        updatedCurrentTraining.multi_series[actualMultiSeries].single_series[actualSingleSeries].extra_weight = extraWeight
        // reps
        updatedCurrentTraining.multi_series[actualMultiSeries].single_series[actualSingleSeries].reps = actualReps
        setCurrentTraining(updatedCurrentTraining)
    }


    const handleFinishTraining = async () => {
        await props.updateTraining(currentTraining)
        await handleMoveToScheduler(history)
    }
    const handleExtraWeight = (e) => {
        setExtraWeight(e.target.value)
    }
    const handleReps = (e) => {
        setActualReps(e.target.value)
    }
    const setAnotherSeries = () => {
        setActualSingleSeries(actualSingleSeries + 1)
        setExtraWeight(multi_series[actualMultiSeries].single_series[actualSingleSeries + 1].extra_weight)
        setActualReps(multi_series[actualMultiSeries].single_series[actualSingleSeries + 1].reps)
    }
    const setAnotherMultiSeries = () => {
        setActualSingleSeries(0)
        setActualMultiSeries(actualMultiSeries + 1)
        setExtraWeight(multi_series[actualMultiSeries + 1].single_series[0].extra_weight)
        setActualReps(multi_series[actualMultiSeries + 1].single_series[0].reps)
    }


    const handleMovetoAnotherSeries = () => {
        if (trainingFinished) {
            return
        }
        if (actualSingleSeries < multi_series[actualMultiSeries].single_series.length - 1) {
            modifyMultiSeries()
            setAnotherSeries()
        } else {

            if (actualMultiSeries < multi_series.length - 1) {
                modifyMultiSeries()
                setAnotherMultiSeries()
            } else {
                if (trainingFinished === false) {
                    modifyMultiSeries()
                    setTrainingFinished(true)
                    alert("Zakończono trening")
                    handleFinishTraining()
                }
            }
        }
    }

    return [concentric_phase, pause_after_concentric_phase, eccentric_phase, pause_after_eccentric_phase, extra_weight, reps, extraWeight, actualReps, multi_series, actualMultiSeries,
        handleExtraWeight, handleReps, handleMovetoAnotherSeries, handleFinishTraining]
}


export const useDisplayMultiSeries = (props) => {
    const [visibleElements, setVisibleElements] = useState([]);
    const toggleVisibility = (elementId) => {
        setVisibleElements((prevVisibleElements) => {
            if (prevVisibleElements.includes(elementId)) {
                return prevVisibleElements.filter((id) => id !== elementId);
            } else {
                return [...prevVisibleElements, elementId];
            }
        });
    };
    const handleRemoveSingleSeries = (multiIndex, singleIndex) => {

        const updatedMultiSeries = [...props.multiSeries];
        updatedMultiSeries[multiIndex].single_series.splice(singleIndex, 1);
        props.setMultiSeries(updatedMultiSeries);
    }

    const handleRemoveMultiSeries = (multiIndex) => {
        toggleVisibility(multiIndex)
        const updatedMultiSeries = [...props.multiSeries];
        updatedMultiSeries.splice(multiIndex, 1);
        props.setMultiSeries(updatedMultiSeries);
    }
    return [visibleElements, handleRemoveSingleSeries, handleRemoveMultiSeries, toggleVisibility]
}


export const useLogin = (props) => {
    const [cookies, setCookie] = useCookies(['true_effects_token']);
    const handleSetToken = (token) => {
        setCookie("true_effects_token", token)
    }
    const handleMoveToRegister = () => {
        props.history.push('/register')
    }
    const handleMovetoBack = () => {
        props.history.goBack()
    }
    const handleLogin = async () => {
        let data = {
            "username": values.username,
            "password": values.password
        }
        return await props.loadUser(data, handleSetToken)
    }

    const {values, handleChange, handleSubmit, errors} = useFormik({
        initialValues: {
            username: "", password: "",
        },
        validationSchema: loginUserValidation,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            handleLogin()
        },
    });
    return [handleMoveToRegister, handleMovetoBack, handleChange, handleSubmit, errors]
}

export const useRegister = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['true_effects_token']);

    const handleSetToken = (token) => {
        setCookie("true_effects_token", token)
    }

    const handleMoveToLogin = () => {
        props.history.push('/login')
    }
    const handleMovetoBack = () => {
        props.history.goBack()
    }
    const handleRegister = async () => {
        let data = {
            "username": values.username,
            "email": values.email,
            "password": values.password,
            "password2": values.password2
        }
        await props.postRegister(data, handleSetToken)
    }


    const {values, handleChange, handleSubmit, errors} = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            password2: ""
        },
        validationSchema: registerUserValidation,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            handleRegister()
        },
    });
    return [handleMoveToLogin, handleMovetoBack, handleChange, handleSubmit, errors]
}


export const useCreateTraining = () => {
    const [multiSeries, setMultiSeries] = useState([])
    const [multiSeriesIndex, setMultiSeriesIndex] = useState(0)
    const [singleSeries, setSingleSeries] = useState([])
    const handleSubmit = () => {
        if (validateTraining() === true) {
            let data = values
            data["multiSeries"] = multiSeries
            console.log(data)
        }else{
            return null;
        }
    }
    const {values, setFieldValue, handleChange, setErrors, errors} = useFormik({
        initialValues: {
            name: "", date: convertDate(new Date()), description: "",
        },
        validationSchema: createTrainingValidation,
        validateOnChange: false,
        validationOnBlue: false,
    });

    const validateTraining = () => {
        try {
            createTrainingValidation.validateSync(values, {abortEarly: false});
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
    return [multiSeries, multiSeriesIndex, singleSeries, values, errors, setMultiSeries, setMultiSeriesIndex,
        setSingleSeries, setFieldValue, handleChange, handleSubmit]

}