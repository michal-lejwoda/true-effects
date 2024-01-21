import {createMultiSeriesValidation, createSingleSeriesValidation} from "../../validation/validation";

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