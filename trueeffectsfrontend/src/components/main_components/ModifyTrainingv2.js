import React from 'react';
import {Field, Formik} from "formik";
import {connect} from "react-redux";
import {createTraining, deleteCurrentTraining, updateTraining} from "../../redux/actions/trainingActions";
import DatePicker from "react-datepicker";
import {convertDate} from "../helpers/function_helpers";
import {useHistory} from "react-router-dom";
import {handleMoveToTraining} from "../helpers/history_helpers";
import "../../new_sass/modify_training.scss"

const ModifyTrainingv2 = (props) => {
    const history = useHistory()
    const handleModifyTraining = async (data) => {
        console.log("handleModifyTraining")
        console.log(data)
        console.log("data")
        await props.updateTraining(data)
    }
    const handleCopyTrainingToAnotherDate = async (data) => {
        await props.createTraining(data)
    }

    const handleDeleteTraining = async (id) => {
        await props.deleteCurrentTraining(id)
    }
    const handleDate = (date, values) => {
        console.log("date")
        console.log(date)
        console.log("values")
        console.log(values)
        values.date = date

    }
    return (
        <div className="modify-training">
            <Formik
                initialValues={props.training}
                onSubmit={(values, {setSubmitting}) => {
                    console.log("submit")
                }}
            >
                {({
                      values,
                      setFieldValue,
                      handleChange,
                      handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className="animatedInput">
                                <Field onChange={handleChange} name="name" value={values.name} type="text"/>
                                <span>Nazwa Treningu</span>
                            </div>

                            <label htmlFor="">Data Treningu</label>
                            <DatePicker locale='pl'
                                        name="date"
                                        value={values.date}
                                        placeholderText={"Wybierz date"}
                                        dateFormat='yyyy-MM-dd'
                                        onChange={(date) => setFieldValue('date', convertDate(date))
                                        }
                            />
                            <div className="animatedInput">
                                <Field onChange={handleChange} name="description" value={values.description}
                                       type="text"/>
                                <span>Opis treningu</span>
                            </div>
                            <div className="modify_training__container">
                                <div className="modify_training__container__buttons">
                                    <button onClick={() => handleMoveToTraining(history)}>Trenuj -></button>
                                    <button onClick={() => handleDeleteTraining(values.id)}>Usuń trening -</button>
                                    <button onClick={() => handleCopyTrainingToAnotherDate(values)}>Dodaj trening do
                                        innego dnia +
                                    </button>
                                    <button type="submit">Submit</button>

                                </div>
                                <div className="modify_training__container__multiseries">
                                    {values.multi_series.map((multiseries, index) => {
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
                                                    {multiseries.single_series.map((singleseries, indexv2) => {
                                                        return (
                                                            <div>
                                                                <div
                                                                    className="modify_training__container__multiseries__element__singleseries__element">
                                                                    {singleseries.exercise.name}
                                                                </div>
                                                                <div
                                                                    className="modify_training__container__multiseries__element__singleseries__element__expanded">
                                                                    <div className="animatedInput">
                                                                        <Field onChange={handleChange}
                                                                               name={`multi_series[${index}].single_series[${indexv2}].concentricphase`}
                                                                               value={singleseries.concentric_phase}
                                                                               type="text"/>
                                                                        <span>Faza koncentryczna</span>
                                                                        {/*<Field name="test" value={singleseries.concentricphase}/>*/}
                                                                    </div>
                                                                    <div className="animatedInput">
                                                                        <Field
                                                                            onChange={handleChange}
                                                                            name={`multi_series[${index}].single_series[${indexv2}].pause_after_concentric_phase`}
                                                                            value={singleseries.pause_after_concentric_phase}
                                                                            type="text"/>
                                                                        <span>Pauza po fazie koncentrycznej:</span>
                                                                    </div>
                                                                    <div
                                                                        className="animatedInput">
                                                                        <Field
                                                                            value={singleseries.eccentric_phase}
                                                                            name={`multi_series[${index}].single_series[${indexv2}].eccentricphase`}
                                                                            onChange={handleChange} type="text"/>
                                                                        <span>Faza ekscentryczna:</span>
                                                                    </div>
                                                                    <div
                                                                        className="animatedInput">
                                                                        <Field
                                                                            name={`multi_series[${index}].single_series[${indexv2}].pause_after_eccentric_phase`}
                                                                            value={singleseries.pause_after_eccentric_phase}
                                                                            onChange={handleChange} type="text"/>
                                                                        <span>Pauza po fazie ekscentrycznej:</span>
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
                        <button
                            onClick={() => handleModifyTraining(values)}
                        >
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
export default connect(mapStateToProps, {updateTraining, createTraining, deleteCurrentTraining})(ModifyTrainingv2);