import React from 'react';
import {useFormik} from "formik";
import AsyncSelect from "react-select/async";
import {useCreateMultiSeries} from "../hooks/training/useCreateMultiSeries";

const CreateMultiSeries = (props) => {
    const {values, setErrors, setFieldValue, handleSubmit, handleChange, errors} = useFormik({
        initialValues: {
            exercise: null,
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
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            background: 'transparent', // Kolor tła
        }),
        option: (provided, state) => ({
            ...provided,
            color: 'white',
            background: '#001233',
            borderBottom: '1px solid white',
            '&:hover': {
                cursor: 'pointer',
                color: '#FF595A'
            },
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: 'white'
        }),
        menu: (provided, state) => ({
            ...provided,
            paddingTop: '0',
            marginTop: '0'
        })
    };
    const [loadExercises, addToSingleSeries, addMultiSingleSeries, handleChangeExercise] = useCreateMultiSeries(props, values, setFieldValue, setErrors)
    return (
        <form className="create-series create-training__create-series" onSubmit={handleSubmit}>
            <h1 className="create-series__title">Stwórz Serie</h1>
            <div className="inputs create-series__inputs">
                <div className="inputs__select">
                    <AsyncSelect placeholder="Wybierz ćwiczenie" name="exercise" onChange={handleChangeExercise}
                                 loadOptions={loadExercises}
                                 className="select-input"
                                 defaultOptions={props.defaultExercises}
                                 styles={customStyles}/>
                </div>
                {errors.exercise && <p className="inputs__errors">{errors.exercise}</p>}
                <div className="inputs__button">
                    <button className="standard-button" onClick={() => props.setShowExerciseModal(true)}>Stwórz
                        ćwiczenie
                    </button>
                </div>
                <div className="inputs__weight animatedInput">
                    <input name="extra_weight" onChange={handleChange} value={values.extra_weight} required="required"
                           type="number"/>
                    <span>Dodatkowa waga</span>
                </div>
                {errors.extra_weight && <p>{errors.extra_weight}</p>}
                <div className="inputs__rest animatedInput">
                    <input name="rest" onChange={handleChange} value={values.rest} required="required" type="number"/>
                    <span>Czas przerwy</span>
                </div>
                {errors.rest && <p className="inputs__errors">{errors.rest}</p>}
                <div className="inputs__reps animatedInput">
                    <input name="reps" onChange={handleChange} value={values.reps} required="required" type="number"/>
                    <span>Liczba powtórzeń</span>
                </div>
                {errors.reps && <p className="inputs__errors">{errors.reps}</p>}
                <div className="inputs__concentric_phase animatedInput">
                    <input name="concentric_phase" onChange={handleChange} value={values.concentric_phase}
                           required="required" type="number"/>
                    <span>Faza koncentryczna</span>
                </div>
                {errors.concentric_phase && <p className="inputs__errors">{errors.concentric_phase}</p>}
                <div className="inputs__pause_after_concentric_phase animatedInput">
                    <input name="pause_after_concentric_phase" onChange={handleChange}
                           value={values.pause_after_concentric_phase} required="required" type="number"/>
                    <span>Pauza po fazie koncentrycznej</span>
                </div>
                {errors.pause_after_concentric_phase &&
                    <p className="inputs__errors">{errors.pause_after_concentric_phase}</p>}
                <div className="inputs__eccentric_phase animatedInput">
                    <input name="eccentric_phase" onChange={handleChange} value={values.eccentric_phase}
                           required="required" type="number"/>
                    <span>Faza ekscentryczna</span>
                </div>
                {errors.eccentric_phase && <p className="inputs__errors">{errors.eccentric_phase}</p>}
                <div className="inputs__pause_after_eccentric_phase animatedInput">
                    <input name="pause_after_eccentric_phase" onChange={handleChange}
                           value={values.pause_after_eccentric_phase} required="required" type="number"/>
                    <span>Pauza po fazie ekscentrycznej</span>
                </div>
                {errors.pause_after_eccentric_phase &&
                    <p className="inputs__errors">{errors.pause_after_eccentric_phase}</p>}
                <div className="inputs__button">
                    <button className="standard-button" onClick={addToSingleSeries}>Dodaj pojedyńczą serie</button>
                </div>
                <div className="inputs__series_count animatedInput">
                    <input name="series_count" onChange={handleChange}
                           value={values.series_count} required="required" type="number"/>
                    <span>Liczba serii</span>
                </div>
                {errors.series_count && <p className="inputs__errors">{errors.series_count}</p>}
                <div className="inputs__button">
                    <button className="standard-button" onClick={addMultiSingleSeries}>Dodaj kilka serii</button>
                </div>
            </div>
        </form>
    );
};

export default CreateMultiSeries;
