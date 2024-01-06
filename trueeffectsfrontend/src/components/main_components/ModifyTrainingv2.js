import React from 'react';
import {Field, Formik} from "formik";
import {connect} from "react-redux";

const ModifyTrainingv2 = (props) => {
    return (
        <div>
            <Formik
                initialValues={props.training}
                // initialValues={{email: '', password: ''}}
                // validate={values => {
                //     const errors = {};
                //     if (!values.email) {
                //         errors.email = 'Required';
                //     } else if (
                //         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                //     ) {
                //         errors.email = 'Invalid email address';
                //     }
                //     return errors;
                // }}
                onSubmit={(values, {setSubmitting}) => {
                    console.log("values")
                    console.log(values)
                    // setTimeout(() => {
                    //     alert(JSON.stringify(values, null, 2));
                    //     setSubmitting(false);
                    // }, 400);
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="">Nazwa Treningu</label>
                            <Field value={values.name} type="text"/>
                            <label htmlFor="">Data Treningu</label>
                            <Field value={values.date} type="text"/>
                            <label htmlFor="">Opis Treningu</label>
                            <Field value={values.description} type="text"/>
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
                                    <button type="submit">Submit</button>
                                </div>
                                <div className="modify_training__container__multiseries">
                                    {values.multi_series.map(multiseries => {
                                        return (
                                            <div className="modify_training__container__multiseries__element">
                                                <div
                                                    className="modify_training__container__multiseries__element_container">
                                                    <div
                                                        className="modify_training__container__multiseries__element_container--name">{multiseries.exercise.name}</div>
                                                    <div
                                                        className="modify_training__container__multiseries__element_container--expand">+
                                                    </div>
                                                </div>
                                                <div
                                                    className="modify_training__container__multiseries__element__singleseries">
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
                                                                        <Field onChange={handleChange}
                                                                               name={`values.multi_series[${multiseries}].single_series[${singleseries}].concentricphase`}
                                                                               value={singleseries.concentricphase}
                                                                               type="text"/>
                                                                        {/*<Field name="test" value={singleseries.concentricphase}/>*/}
                                                                    </div>
                                                                    <div
                                                                        className="modify_training__container__multiseries__element__singleseries__element__expanded__element">
                                                                        <p>Pauza po fazie koncentrycznej:</p> <Field
                                                                        onChange={handleChange}
                                                                        value={singleseries.pause_after_concentric_phase}
                                                                        type="text"/>
                                                                    </div>
                                                                    <div
                                                                        className="modify_training__container__multiseries__element__singleseries__element__expanded__element">
                                                                        <p>Faza ekscentryczna:</p> <Field
                                                                        value={singleseries.eccentricphase}
                                                                        onChange={handleChange} type="text"/>
                                                                    </div>
                                                                    <div
                                                                        className="modify_training__container__multiseries__element__singleseries__element__expanded__element">
                                                                        <p>Pauza po fazie ekscentrycznej:</p> <Field
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
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        training: state.training.training,
    }
}
export default connect(mapStateToProps, null)(ModifyTrainingv2);