import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import {useFormik} from "formik";
import {createGoalValidation} from "../validation/validation";
import CreateMultiSeries from "../create_training_components/CreateMultiSeries";
import {connect} from "react-redux";
import {getExercises} from "../../redux/actions/trainingActions";
import DisplayMultiSeries from "../create_training_components/DisplayMultiSeries";
import '../../new_sass/create_training.scss'

const CreateTrainingv2 = (props) => {
    const [multiSeries, setMultiSeries] = useState([])
    const [multiSeriesIndex, setMultiSeriesIndex] = useState(0)
    const [singleSeries, setSingleSeries] = useState([])
    const {values, setFieldValue, handleSubmit, handleChange, errors} = useFormik({
        initialValues: {
            name: "", date: "", description: "",
        },
        validationSchema: createGoalValidation,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            // handleSendGoals(values)
        },
    });

    return (
        <div className="create-training">
            <div className="create-training__data">
                <div className="create-training__data__elements">
                    <h1 className="create-training__title">Stwórz Trening</h1>

                    <DatePicker locale='pl'
                                name="date"
                        // className="animatedInput"
                                className="create-training__datepicker animated-datepicker"
                        // name="date"
                        // value={values.date}
                        // placeholderText={"Wybierz date"}
                        // // dateFormat='dd/MM/yyyy'
                        // dateFormat='yyyy-MM-dd'
                        // // selected={values.date}
                        // onChange = {(date)=>setFieldValue('date', convertDate(date))
                        // // onChange={(date) => handleDate(date, setFieldValue)
                    />


                    <div className="animatedInput">
                        <input name="name" type="text" required="required"/>
                        <span>Nazwa treningu</span>
                    </div>
                    <div className="animatedInput">
                    <textarea className="create-training__textarea" name="description" onChange={handleChange}
                              value={values.description} id=""
                        // cols="30"
                              rows="5">
                    </textarea>
                        <span>Opis treningu</span>
                    </div>

                </div>
            </div>
            <div className="create-training__display-series">
                <DisplayMultiSeries multiSeries={multiSeries} setMultiSeries={setMultiSeries}/>
            </div>

            <div className="create-training__create-series">
                <CreateMultiSeries setMultiSeries={setMultiSeries} multiSeries={multiSeries}
                                   singleSeries={singleSeries}
                                   setSingleSeries={setSingleSeries} multiSeriesIndex={multiSeriesIndex}
                                   setMultiSeriesIndex={setMultiSeriesIndex} getExercises={props.getExercises}/>
            </div>


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
