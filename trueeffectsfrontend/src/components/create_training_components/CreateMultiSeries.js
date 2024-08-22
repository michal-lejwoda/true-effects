import React from 'react';
import {useFormik} from "formik";
import AsyncSelect from "react-select/async";
import {useCreateMultiSeries} from "../hooks/training/useCreateMultiSeries";
import {useTranslation} from "react-i18next";
import CreateExerciseModal from "./modals/CreateExerciseModal";

const CreateMultiSeries = (props) => {
    const {t} = useTranslation();
    const {values, setErrors, handleSubmit, setFieldValue, handleChange, errors} = useFormik({
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
        <>
            <form className="create-series create-training__create-series" onSubmit={handleSubmit}>
                <h1 className="create-series__title">{t("Create series")}</h1>
                <div className="inputs create-series__inputs">
                    <div className="inputs__select">
                        <AsyncSelect placeholder="Wybierz ćwiczenie" name="exercise" onChange={handleChangeExercise}
                                     value={values.exercise}
                                     loadOptions={loadExercises}
                                     className="select-input"
                                     defaultOptions={props.defaultExercises}
                                     styles={customStyles}/>
                    </div>
                    {errors.exercise && <p className="inputs__errors">{errors.exercise}</p>}
                    <div className="inputs__button">
                        <button className="standard-button"
                                onClick={() => props.setShowExerciseModal(true)}>{t("Create exercise")}
                        </button>
                    </div>
                    <div className="inputs__weight animatedInput">
                        <input name="extra_weight" onChange={handleChange} value={values.extra_weight}
                               required="required"
                               type="number"/>
                        <span>{t("Additional weight")}</span>
                    </div>
                    {errors.extra_weight && <p>{errors.extra_weight}</p>}
                    <div className="inputs__rest animatedInput">
                        <input name="rest" onChange={handleChange} value={values.rest} required="required"
                               type="number"/>
                        <span>{t("Break time")}</span>
                    </div>
                    {errors.rest && <p className="inputs__errors">{errors.rest}</p>}
                    <div className="inputs__reps animatedInput">
                        <input name="reps" onChange={handleChange} value={values.reps} required="required"
                               type="number"/>
                        <span>{"Repetitions number"}</span>
                    </div>
                    {errors.reps && <p className="inputs__errors">{errors.reps}</p>}
                    <div className="inputs__concentric_phase animatedInput">
                        <input name="concentric_phase" onChange={handleChange} value={values.concentric_phase}
                               required="required" type="number"/>
                        <span>{t("Concentric phase")}</span>
                    </div>
                    {errors.concentric_phase && <p className="inputs__errors">{errors.concentric_phase}</p>}
                    <div className="inputs__pause_after_concentric_phase animatedInput">
                        <input name="pause_after_concentric_phase" onChange={handleChange}
                               value={values.pause_after_concentric_phase} required="required" type="number"/>
                        <span>{t("Pause after concentric phase")}</span>
                    </div>
                    {errors.pause_after_concentric_phase &&
                        <p className="inputs__errors">{errors.pause_after_concentric_phase}</p>}
                    <div className="inputs__eccentric_phase animatedInput">
                        <input name="eccentric_phase" onChange={handleChange} value={values.eccentric_phase}
                               required="required" type="number"/>
                        <span>{t("Eccentric phase")}</span>
                    </div>
                    {errors.eccentric_phase && <p className="inputs__errors">{errors.eccentric_phase}</p>}
                    <div className="inputs__pause_after_eccentric_phase animatedInput">
                        <input name="pause_after_eccentric_phase" onChange={handleChange}
                               value={values.pause_after_eccentric_phase} required="required" type="number"/>
                        <span>{t("Pause after eccentric phase")}</span>
                    </div>
                    {errors.pause_after_eccentric_phase &&
                        <p className="inputs__errors">{errors.pause_after_eccentric_phase}</p>}
                    <div className="inputs__button">
                        <button className="standard-button"
                                onClick={addToSingleSeries}>{t("Add single series")}</button>
                    </div>
                    <div className="inputs__series_count animatedInput">
                        <input name="series_count" onChange={handleChange}
                               value={values.series_count} required="required" type="number"/>
                        <span>{t("Series number")}</span>
                    </div>
                    {errors.series_count && <p className="inputs__errors">{errors.series_count}</p>}
                    <div className="inputs__button">
                        <button className="standard-button"
                                onClick={addMultiSingleSeries}>{t("Add a few series")}</button>
                    </div>
                </div>
            </form>
            <CreateExerciseModal history={props.history}
                                 showCreateExerciseModal={props.showCreateExerciseModal}
                                 handleCloseCreateExerciseModal={props.handleCloseCreateExerciseModal}
                                 createUserExercise={props.createUserExercise}
                                 getExercises={props.getExercises}
                                 setFieldValue={setFieldValue}
                                 setDefaultExercises={props.setDefaultExercises}
            />
        </>
    );
};

export default CreateMultiSeries;
