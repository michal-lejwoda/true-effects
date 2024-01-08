import React from 'react';
import {Field, FieldArray, Formik} from "formik";
import {connect} from "react-redux";
import {createTraining, deleteCurrentTraining, updateTraining} from "../../redux/actions/trainingActions";
import DatePicker from "react-datepicker";
import {useDate} from "../hooks";
import {convertDate} from "../helpers/function_helpers";

const ModifyTrainingv2 = (props) => {
    console.log("props.training")
    console.log(props.training)
    // const {date, jsDate, dateError, setDateError, handleDateForDimensions} = useDate()
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
    const handleDate = (date, values) =>{
        console.log("date")
        console.log(date)
        console.log("values")
        console.log(values)
        values.date = date

    }


    return (
        <div>
            <Formik
                initialValues={props.training}
                onSubmit={(values, {setSubmitting}) => {
                    console.log("submit")
                }}
            >
                {({
                      values,
                    setFieldValue,
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
                            <Field onChange={handleChange} name="name" value={values.name} type="text"/>
                            <label htmlFor="">Data Treningu</label>
                            <DatePicker locale='pl'
                                        name="date"
                                        value={values.date}
                                        placeholderText={"Wybierz date"}
                                        // dateFormat='dd/MM/yyyy'
                                        dateFormat='yyyy-MM-dd'
                                        // selected={values.date}
                                        onChange = {(date)=>setFieldValue('date', convertDate(date))
                                        // onChange={(date) => handleDate(date, setFieldValue)
                            }
                            />
                            {/*<Field onChange={handleChange} name="date" value={values.date} type="text"/>*/}
                            <label htmlFor="">Opis Treningu</label>
                            <Field onChange={handleChange} name="description" value={values.description} type="text"/>

                            <div className="modify_training__container">
                                <div className="modify_training__container__buttons">
                                    <button>Trenuj -></button>
                                    <button onClick={()=>handleDeleteTraining(values.id)}>Usuń trening -</button>
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
                                                                    <div
                                                                        className="modify_training__container__multiseries__element__singleseries__element__expanded__element">
                                                                        <p>Faza koncentryczna:</p>
                                                                        <Field onChange={handleChange}
                                                                               name={`multi_series[${index}].single_series[${indexv2}].concentricphase`}
                                                                               value={singleseries.concentricphase}
                                                                               type="text"/>
                                                                        {/*<Field name="test" value={singleseries.concentricphase}/>*/}
                                                                    </div>
                                                                    <div
                                                                        className="modify_training__container__multiseries__element__singleseries__element__expanded__element">
                                                                        <p>Pauza po fazie koncentrycznej:</p> <Field
                                                                        onChange={handleChange}
                                                                        name={`multi_series[${index}].single_series[${indexv2}].pause_after_concentric_phase`}
                                                                        value={singleseries.pause_after_concentric_phase}
                                                                        type="text"/>
                                                                    </div>
                                                                    <div
                                                                        className="modify_training__container__multiseries__element__singleseries__element__expanded__element">
                                                                        <p>Faza ekscentryczna:</p> <Field
                                                                        value={singleseries.eccentricphase}
                                                                        name={`multi_series[${index}].single_series[${indexv2}].eccentricphase`}
                                                                        onChange={handleChange} type="text"/>
                                                                    </div>
                                                                    <div
                                                                        className="modify_training__container__multiseries__element__singleseries__element__expanded__element">
                                                                        <p>Pauza po fazie ekscentrycznej:</p> <Field
                                                                        name={`multi_series[${index}].single_series[${indexv2}].pause_after_eccentric_phase`}
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