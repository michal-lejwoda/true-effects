import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import {useFormik} from "formik";
import {createGoalValidation} from "../validation/validation";
import CreateMultiSeries from "../create_training_components/CreateMultiSeries";
import {connect} from "react-redux";
import {getExercises} from "../../redux/actions/trainingActions";
import DisplayMultiSeries from "../create_training_components/DisplayMultiSeries";
import '../../new_sass/create_training.scss'
import TextField from "@material-ui/core/TextField";

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
            <div className="create-training__top">
                <div className="create-training__top__elements">
                    <h1 className="create-training__title">Stwórz Trening</h1>
                    <div className="inputBox">
                        <input type="text" required="required"/>
                        <span>First name</span>
                    </div>
                    <input className="effect-21" placeholder="Placeholder Text" type="text"/>
                    <label className="create-training__label">Nazwa Treningu</label>
                    <input name="name" className="create-training__input" onChange={handleChange} value={values.name}
                           type="text"/>
                    <label className="create-training__label">Data Treningu</label>
                    <DatePicker locale='pl'
                                name="date"
                                className="create-training__datepicker"
                        // name="date"
                        // value={values.date}
                        // placeholderText={"Wybierz date"}
                        // // dateFormat='dd/MM/yyyy'
                        // dateFormat='yyyy-MM-dd'
                        // // selected={values.date}
                        // onChange = {(date)=>setFieldValue('date', convertDate(date))
                        // // onChange={(date) => handleDate(date, setFieldValue)
                    />
                    <label className="create-training__label">Opis Treningu</label>
                    <textarea className="create-training__textarea" name="description" onChange={handleChange}
                              value={values.description} id="" cols="30"
                              rows="5">

                </textarea>
                </div>
            </div>
            <div className="create-training__bottom">
                <div className="create-training__bottom__leftcontainer">
                    <CreateMultiSeries setMultiSeries={setMultiSeries} multiSeries={multiSeries}
                                       singleSeries={singleSeries}
                                       setSingleSeries={setSingleSeries} multiSeriesIndex={multiSeriesIndex}
                                       setMultiSeriesIndex={setMultiSeriesIndex} getExercises={props.getExercises}/>
                </div>
                <div className="create-training__rightcontainer">
                    <DisplayMultiSeries multiSeries={multiSeries} setMultiSeries={setMultiSeries}/>
                </div>
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
