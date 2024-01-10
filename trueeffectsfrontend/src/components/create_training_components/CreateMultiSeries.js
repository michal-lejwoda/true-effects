import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import {createGoalValidation, createMultiSeriesValidation} from "../validation/validation";
import AsyncSelect from "react-select/async";
import {getExercises} from "../../redux/actions/trainingActions";
// import AsyncSelect from "react-select/async";
// import Select from 'react-select'
const CreateMultiSeries = (props) => {

    const {values, setFieldValue, handleSubmit, handleChange, errors} = useFormik({
        initialValues: {
            name: "",
            date: "",
            description: "",
            extra_weight: 0,
            rest: 0,
            reps: 10,
            concentric_phase: 1,
            pause_after_concentric_phase: 1,
            eccentric_phase: 1,
            pause_after_eccentric_phase: 1,
            series_count: 1

        },
        validationSchema: createMultiSeriesValidation,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            // handleSendGoals(values)
            // addMultiSeries()
        },
    });
    console.log(props.singleSeries)
    console.log(props.multiSeries)
    const addMultiSingleSeries = () => {
        console.log("addMultiSeries")
        console.log(values)
        const singleSeriesArray = Array.from({length: values.series_count}, ()=>values)
        props.setSingleSeries(prevState => [...prevState, ...singleSeriesArray])
        // props.setMultiSeries(prevState =>[...prevState, {"single_series": singleSeries}])

    }
    const addToSingleSeries = () =>{
        console.log("addSingleSeries")
        console.log(values)
        props.setSingleSeries(prevState => [...prevState, values])
    }
    const loadExercises = async(param) =>{
        return  await props.getExercises(param)

    }
    return (
        <div className="createtraining__bottom">
            <div className="createtraining__bottom__leftcontainer">
                <h1>Stwórz Serie</h1>
                <div className="createtraining__bottom__leftcontainer__fields__elements">
                    <form>
                        <div className="createtraining__bottom__leftcontainer__fields__element">
                            <label htmlFor="">Wybierz ćwiczenie</label>
                            <AsyncSelect loadOptions={loadExercises} defaultOptions/>
                        </div>
                        <div className="createtraining__bottom__leftcontainer__fields__element">
                            <label htmlFor="">Dodatkowa waga</label>
                            <input name="extra_weight" onChange={handleChange} value={values.extra_weight} type="text"/>
                        </div>
                        <div className="createtraining__bottom__leftcontainer__fields__element">
                            <label htmlFor="">Czas przerwy</label>
                            <input name="rest" onChange={handleChange} value={values.rest} type="number"/>
                        </div>
                        <div className="createtraining__bottom__leftcontainer__fields__element">
                            <label htmlFor="">Liczba powtórzeń</label>
                            <input name="reps" onChange={handleChange} value={values.reps} type="number"/>
                        </div>
                        <div className="createtraining__bottom__leftcontainer__fields__element">
                            <label htmlFor="">Faza koncentryczna</label>
                            <input name='concentric_phase' onChange={handleChange} value={values.concentric_phase}
                                   type="number"/>
                        </div>
                        <div className="createtraining__bottom__leftcontainer__fields__element">
                            <label htmlFor="">Pauza po fazie koncentrycznej</label>
                            <input name="pause_after_concentric_phase" onChange={handleChange}
                                   value={values.pause_after_concentric_phase} type="number"/>
                        </div>
                        <div className="createtraining__bottom__leftcontainer__fields__element">
                            <label htmlFor="">Faza ekscentryczna</label>
                            <input name="eccentric_phase" onChange={handleChange} value={values.eccentric_phase}
                                   type="number"/>
                        </div>
                        <div className="createtraining__bottom__leftcontainer__fields__element">
                            <label htmlFor="">Pauza po fazie ekscentrycznej</label>
                            <input name="pause_after_eccentric_phase" onChange={handleChange}
                                   value={values.pause_after_eccentric_phase} type="number"/>
                        </div>
                    </form>
                </div>
                <div className="createtraining__bottom__leftcontainer__buttons">
                    <label htmlFor="">Liczba serii</label>
                    <input name="series_count" onChange={handleChange} value={values.series_count} type="text"/>
                    <button onClick={addMultiSingleSeries} type="submit">Dodaj kilka serii</button>
                    <button onClick={addToSingleSeries}>Dodaj pojedyńczą serie</button>
                    <button>Zaakceptuj trening</button>
                </div>


            </div>
        </div>
    );
};

export default CreateMultiSeries;
