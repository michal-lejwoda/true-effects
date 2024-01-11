import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import {
    createGoalValidation,
    createMultiSeriesValidation,
    createSingleSeriesValidation,
    createTrainingValidation
} from "../validation/validation";
import AsyncSelect from "react-select/async";
import {getExercises} from "../../redux/actions/trainingActions";
// import AsyncSelect from "react-select/async";
// import Select from 'react-select'
const CreateMultiSeries = (props) => {


    const {values, setErrors, setFieldValue, handleSubmit, handleChange, errors} = useFormik({
        initialValues: {
            exercise: null,
            // name: "",
            // date: "",
            // description: "",
            extra_weight: 0,
            rest: 0,
            reps: 10,
            concentric_phase: 1,
            pause_after_concentric_phase: 1,
            eccentric_phase: 1,
            pause_after_eccentric_phase: 1,
            series_count: 1

        },
        validateOnChange: false,
        validationOnBlue: false,
    });

    const {multiSeries, setMultiSeries} = props;
    const {exercise, series_count} = values;

    const handleChangeExercise = (exerciseObject) => {
        setFieldValue('exercise', exerciseObject)
    }

    const validateMultiSeries = () => {
        console.log("values123")
        console.log(values)
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

    const validateSingleSeries = (e) => {
        e.preventDefault()
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


    const addToSingleSeries = () => {
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
    return (
        <div className="createtraining__bottom">
            <form onSubmit={handleSubmit}>
                <div className="createtraining__bottom__leftcontainer">
                    <h1>Stwórz Serie</h1>
                    <div className="createtraining__bottom__leftcontainer__fields__elements">
                        <div className="createtraining__bottom__leftcontainer__fields__element">
                            <label htmlFor="">Wybierz ćwiczenie</label>
                            <AsyncSelect name="exercise" onChange={handleChangeExercise} loadOptions={loadExercises}
                                         defaultOptions/>
                            {errors.exercise && <p>{errors.exercise}</p>}
                        </div>
                        <div className="createtraining__bottom__leftcontainer__fields__element">
                            <label htmlFor="">Dodatkowa waga</label>
                            <input name="extra_weight" onChange={handleChange} value={values.extra_weight} type="text"/>
                            {errors.extra_weight && <p>{errors.extra_weight}</p>}
                        </div>
                        <div className="createtraining__bottom__leftcontainer__fields__element">
                            <label htmlFor="">Czas przerwy</label>
                            <input name="rest" onChange={handleChange} value={values.rest} type="number"/>
                            {errors.rest && <p>{errors.rest}</p>}
                        </div>
                        <div className="createtraining__bottom__leftcontainer__fields__element">
                            <label htmlFor="">Liczba powtórzeń</label>
                            <input name="reps" onChange={handleChange} value={values.reps} type="number"/>
                            {errors.reps && <p>{errors.reps}</p>}
                        </div>
                        <div className="createtraining__bottom__leftcontainer__fields__element">
                            <label htmlFor="">Faza koncentryczna</label>
                            <input name='concentric_phase' onChange={handleChange} value={values.concentric_phase}
                                   type="number"/>
                            {errors.concentric_phase && <p>{errors.concentric_phase}</p>}
                        </div>
                        <div className="createtraining__bottom__leftcontainer__fields__element">
                            <label htmlFor="">Pauza po fazie koncentrycznej</label>
                            <input name="pause_after_concentric_phase" onChange={handleChange}
                                   value={values.pause_after_concentric_phase} type="number"/>
                            {errors.pause_after_concentric_phase && <p>{errors.pause_after_concentric_phase}</p>}
                        </div>
                        <div className="createtraining__bottom__leftcontainer__fields__element">
                            <label htmlFor="">Faza ekscentryczna</label>
                            <input name="eccentric_phase" onChange={handleChange} value={values.eccentric_phase}
                                   type="number"/>
                            {errors.eccentric_phase && <p>{errors.eccentric_phase}</p>}
                        </div>
                        <div className="createtraining__bottom__leftcontainer__fields__element">
                            <label htmlFor="">Pauza po fazie ekscentrycznej</label>
                            <input name="pause_after_eccentric_phase" onChange={handleChange}
                                   value={values.pause_after_eccentric_phase} type="number"/>
                            {errors.pause_after_eccentric_phase && <p>{errors.pause_after_eccentric_phase}</p>}
                        </div>

                    </div>
                    <div className="createtraining__bottom__leftcontainer__buttons">
                        <label htmlFor="">Liczba serii</label>
                        <input name="series_count" onChange={handleChange} value={values.series_count} type="text"/>
                        {errors.series_count && <p>{errors.series_count}</p>}
                        <button onClick={addMultiSingleSeries} type="submit">Dodaj kilka serii</button>
                        <button onClick={addToSingleSeries}>Dodaj pojedyńczą serie</button>
                        <button type="submit">Zaakceptuj trening</button>
                    </div>


                </div>
            </form>
        </div>
    );
};

export default CreateMultiSeries;
