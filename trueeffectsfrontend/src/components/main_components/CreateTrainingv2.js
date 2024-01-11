import React, {useEffect, useState} from 'react';
import {convertDate} from "../helpers/function_helpers";
import DatePicker from "react-datepicker";
import {useFormik} from "formik";
import {createGoalValidation} from "../validation/validation";
import CreateMultiSeries from "../create_training_components/CreateMultiSeries";
import {connect} from "react-redux";
import {postLogin} from "../../redux/actions/authenticationActions";
import {getExercises, getGoals, getMeasurements, getTrainings} from "../../redux/actions/trainingActions";
import DisplayMultiSeries from "../create_training_components/DisplayMultiSeries";

const CreateTrainingv2 = (props) => {
    const [multiSeries, setMultiSeries] = useState([])
    const [multiSeriesIndex, setMultiSeriesIndex] = useState(0)
    const [singleSeries, setSingleSeries] = useState([])
    const {values, setFieldValue, handleSubmit, handleChange, errors} = useFormik({
        initialValues: {
            name: "",
            date: "",
            description: "",
        },
        validationSchema: createGoalValidation,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            // handleSendGoals(values)
        },
    });
    console.log("multiSeries")
    console.log(multiSeries)
    // console.log("values")
    // console.log(values)
    // console.log(props.exercises)
    return (
        <div>
            <div className="createtraining__top">
                <h1>Stwórz Trening</h1>
                <label htmlFor="">Nazwa Treningu</label>
                <input name="name" onChange={handleChange} value={values.name} type="text"/>
                <label htmlFor="">Data Treningu</label>
                {/*<input type="text"/>*/}
                <DatePicker locale='pl'
                            name="date"
                    // name="date"
                    // value={values.date}
                    // placeholderText={"Wybierz date"}
                    // // dateFormat='dd/MM/yyyy'
                    // dateFormat='yyyy-MM-dd'
                    // // selected={values.date}
                    // onChange = {(date)=>setFieldValue('date', convertDate(date))
                    // // onChange={(date) => handleDate(date, setFieldValue)
                />
                <label htmlFor="">Opis Treningu</label>
                <textarea name="description" onChange={handleChange} value={values.description} id="" cols="30"
                          rows="10">

                </textarea>
            </div>
            <CreateMultiSeries setMultiSeries={setMultiSeries} multiSeries={multiSeries} singleSeries={singleSeries}
                               setSingleSeries={setSingleSeries} multiSeriesIndex={multiSeriesIndex}
                               setMultiSeriesIndex={setMultiSeriesIndex} getExercises={props.getExercises}/>

            <DisplayMultiSeries multiSeries={multiSeries} setMultiSeries={setMultiSeries}/>

        </div>);
};

const mapStateToProps = (state) => {
    return {
        trainings: state.training.trainings.data,
        loadedtrainings: state.training.loadedtrainings,
        measurements: state.training.measurements.data,
        goals: state.training.goals.data,
        exercises: state.training.exercises
    }
}
export default connect(mapStateToProps, {getExercises})(CreateTrainingv2);
