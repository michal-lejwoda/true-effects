import React from 'react';
import {connect} from "react-redux";
import {getDimensions, postDimension} from "../../redux/actions/trainingActions";
import {Field, Form, useFormik, useFormikContext} from "formik";
import {createDimensionValidation} from "../validation/validation";

const ModifyTraining = (props) => {
    console.log("props.training")
    console.log(props.training)


    const {values, handleSubmit, handleChange, errors, setValues} = useFormikContext({
        initialValues: props.training,
        validationSchema: createDimensionValidation,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            // handleSendDimension()
        },
    })

    return (
        <div>
            <label htmlFor="">Nazwa Treningu</label>
            <input value={values.name} type="text"/>
            <label htmlFor="">Data Treningu</label>
            <input value={values.date} type="text"/>
            <label htmlFor="">Opis Treningu</label>
            <input value={values.description} type="text"/>
            {values.multi_series.map(multiseries => {
                return (
                        <div>
                            <h1>sdadasasd</h1>
                        </div>

                )
            })}
            <div className="modify_training__container">
                <div className="modify_training__container__buttons">
                    <button>Trenuj -></button>
                    <button>Usuń trening -</button>
                    <button>Dodaj trening do innego dnia +</button>
                </div>
                <div className="modify_training__container__multiseries">
                    {values.multi_series.map(multiseries => {
                        return (
                            <div className="modify_training__container__multiseries__element">
                                <div className="modify_training__container__multiseries__element_container">
                                    <div
                                        className="modify_training__container__multiseries__element_container--name">{multiseries.exercise.name}</div>
                                    <div
                                        className="modify_training__container__multiseries__element_container--expand">+
                                    </div>
                                </div>
                                <div className="modify_training__container__multiseries__element__singleseries">
                                    {multiseries.single_series.map(singleseries => {
                                        return (
                                            <div>
                                                <div
                                                    className="modify_training__container__multiseries__element__singleseries__element">
                                                    {singleseries.exercise.name}
                                                </div>
                                                <div
                                                    className="modify_training__container__multiseries__element__singleseries__element__expanded">
                                                    <div
                                                        className="modify_training__container__multiseries__element__singleseries__element__expanded__element">
                                                        <p>Faza koncentryczna:</p>
                                                        <input onChange={handleChange}
                                                               value={singleseries.concentricphase}
                                                               type="text"/>
                                                        {/*<Field name="test" value={singleseries.concentricphase}/>*/}
                                                    </div>
                                                    <div
                                                        className="modify_training__container__multiseries__element__singleseries__element__expanded__element">
                                                        <p>Pauza po fazie koncentrycznej:</p> <input
                                                        onChange={handleChange}
                                                        value={singleseries.pause_after_concentric_phase}
                                                        type="text"/>
                                                    </div>
                                                    <div
                                                        className="modify_training__container__multiseries__element__singleseries__element__expanded__element">
                                                        <p>Faza ekscentryczna:</p> <input
                                                        value={singleseries.eccentricphase}
                                                        onChange={handleChange} type="text"/>
                                                    </div>
                                                    <Field />
                                                    <div
                                                        className="modify_training__container__multiseries__element__singleseries__element__expanded__element">
                                                        <p>Pauza po fazie ekscentrycznej:</p> <input
                                                        value={singleseries.pause_after_eccentric_phase}
                                                        onChange={handleChange} type="text"/>
                                                    </div>
                                                </div>
                                            </div>)
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        training: state.training.training,
    }
}
export default connect(mapStateToProps, null)(ModifyTraining);
