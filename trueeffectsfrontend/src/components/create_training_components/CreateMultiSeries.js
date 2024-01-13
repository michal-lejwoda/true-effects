import React from 'react';
import {useFormik} from "formik";
import AsyncSelect from "react-select/async";
import {useCreateMultiSeries} from "../hooks";

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
    const [loadExercises, addToSingleSeries, addMultiSingleSeries, handleChangeExercise] = useCreateMultiSeries(props, values, setFieldValue, setErrors)

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="create-training__title">Stwórz Trening</h1>
            <div className="createtraining__bottom__leftcontainer__fields__elements">
                <div className="createtraining__bottom__leftcontainer__fields__element">
                    {/*<label htmlFor="">Wybierz ćwiczenie</label>*/}
                    <AsyncSelect placeholder="Wybierz ćwiczenie" name="exercise" onChange={handleChangeExercise}
                                 loadOptions={loadExercises}
                                 className="select-input"
                                 defaultOptions/>
                    {errors.exercise && <p>{errors.exercise}</p>}
                </div>
                <div className="animatedInput">
                    <input name="extra_weight" onChange={handleChange} value={values.extra_weight} required="required"
                           type="number"/>
                    <span>Dodatkowa waga</span>
                </div>
                {errors.extra_weight && <p>{errors.extra_weight}</p>}
                <div className="animatedInput">
                    <input name="rest" onChange={handleChange} value={values.rest} required="required" type="number"/>
                    <span>Czas przerwy</span>
                </div>
                {errors.rest && <p>{errors.rest}</p>}
                <div className="animatedInput">
                    <input name="reps" onChange={handleChange} value={values.reps} required="required" type="number"/>
                    <span>Liczba powtórzeń</span>
                </div>
                {errors.reps && <p>{errors.reps}</p>}
                <div className="animatedInput">
                    <input name="concentric_phase" onChange={handleChange} value={values.concentric_phase}
                           required="required" type="number"/>
                    <span>Faza koncentryczna</span>
                </div>
                {errors.concentric_phase && <p>{errors.concentric_phase}</p>}
                <div className="animatedInput">
                    <input name="pause_after_concentric_phase" onChange={handleChange}
                           value={values.pause_after_concentric_phase} required="required" type="number"/>
                    <span>Pauza po fazie koncentrycznej</span>
                </div>
                {errors.pause_after_concentric_phase && <p>{errors.pause_after_concentric_phase}</p>}
                <div className="animatedInput">
                    <input name="eccentric_phase" onChange={handleChange} value={values.eccentric_phase}
                           required="required" type="number"/>
                    <span>Faza ekscentryczna</span>
                </div>
                {errors.eccentric_phase && <p>{errors.eccentric_phase}</p>}
                <div className="animatedInput">
                    <input name="pause_after_eccentric_phase" onChange={handleChange}
                           value={values.pause_after_eccentric_phase} required="required" type="number"/>
                    <span>Pauza po fazie ekscentrycznej</span>
                </div>
                {errors.pause_after_eccentric_phase && <p>{errors.pause_after_eccentric_phase}</p>}
                <div className="create-training__button">
                    <button className="standard-button" onClick={addToSingleSeries}>Dodaj pojedyńczą serie</button>
                </div>
                <div className="animatedInput">
                    <input name="series_count" onChange={handleChange}
                           value={values.series_count} required="required" type="number"/>
                    <span>Liczba serii</span>
                </div>
                {errors.series_count && <p>{errors.series_count}</p>}
                <div className="create-training__button">
                    <button className="standard-button" onClick={addMultiSingleSeries}>Dodaj kilka serii</button>
                </div>
                {/*<div className="createtraining__bottom__leftcontainer__fields__element">*/}
                {/*    <label htmlFor="">Dodatkowa waga</label>*/}
                {/*    <input name="extra_weight" onChange={handleChange} value={values.extra_weight} type="text"/>*/}
                {/*    {errors.extra_weight && <p>{errors.extra_weight}</p>}*/}
                {/*</div>*/}
                {/*<div className="createtraining__bottom__leftcontainer__fields__element">*/}
                {/*    <label htmlFor="">Czas przerwy</label>*/}
                {/*    <input name="rest" onChange={handleChange} value={values.rest} type="number"/>*/}
                {/*    {errors.rest && <p>{errors.rest}</p>}*/}
                {/*</div>*/}
                {/*<div className="createtraining__bottom__leftcontainer__fields__element">*/}
                {/*    <label htmlFor="">Liczba powtórzeń</label>*/}
                {/*    <input name="reps" onChange={handleChange} value={values.reps} type="number"/>*/}
                {/*    {errors.reps && <p>{errors.reps}</p>}*/}
                {/*</div>*/}
                {/*<div className="createtraining__bottom__leftcontainer__fields__element">*/}
                {/*    <label htmlFor="">Faza koncentryczna</label>*/}
                {/*    <input name='concentric_phase' onChange={handleChange} value={values.concentric_phase}*/}
                {/*           type="number"/>*/}
                {/*    {errors.concentric_phase && <p>{errors.concentric_phase}</p>}*/}
                {/*</div>*/}
                {/*<div className="createtraining__bottom__leftcontainer__fields__element">*/}
                {/*    <label htmlFor="">Pauza po fazie koncentrycznej</label>*/}
                {/*    <input name="pause_after_concentric_phase" onChange={handleChange}*/}
                {/*           value={values.pause_after_concentric_phase} type="number"/>*/}
                {/*    {errors.pause_after_concentric_phase && <p>{errors.pause_after_concentric_phase}</p>}*/}
                {/*</div>*/}
                {/*<div className="createtraining__bottom__leftcontainer__fields__element">*/}
                {/*    <label htmlFor="">Faza ekscentryczna</label>*/}
                {/*    <input name="eccentric_phase" onChange={handleChange} value={values.eccentric_phase}*/}
                {/*           type="number"/>*/}
                {/*    {errors.eccentric_phase && <p>{errors.eccentric_phase}</p>}*/}
                {/*</div>*/}
                {/*<div className="createtraining__bottom__leftcontainer__fields__element">*/}
                {/*    <label htmlFor="">Pauza po fazie ekscentrycznej</label>*/}
                {/*    <input name="pause_after_eccentric_phase" onChange={handleChange}*/}
                {/*           value={values.pause_after_eccentric_phase} type="number"/>*/}
                {/*    {errors.pause_after_eccentric_phase && <p>{errors.pause_after_eccentric_phase}</p>}*/}
                {/*</div>*/}

            </div>
            <div className="createtraining__bottom__leftcontainer__buttons">
                {/*<label htmlFor="">Liczba serii</label>*/}
                {/*<input name="series_count" onChange={handleChange} value={values.series_count} type="text"/>*/}
                {/*    {errors.series_count && <p>{errors.series_count}</p>}*/}
                {/*    <button onClick={addMultiSingleSeries} type="submit">Dodaj kilka serii</button>*/}
                {/*    <button onClick={addToSingleSeries}>Dodaj pojedyńczą serie</button>*/}

                </div>



        </form>
    );
};

export default CreateMultiSeries;
