import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import {useFormik} from "formik";
import {createGoalValidation, createTrainingValidation} from "../validation/validation";
import CreateMultiSeries from "../create_training_components/CreateMultiSeries";
import {connect} from "react-redux";
import {getExercises} from "../../redux/actions/trainingActions";
import DisplayMultiSeries from "../create_training_components/DisplayMultiSeries";
import '../../new_sass/create_training.scss'
import {convertDate} from "../helpers/function_helpers";

const CreateTrainingv2 = (props) => {
    const [multiSeries, setMultiSeries] = useState([])
    const [multiSeriesIndex, setMultiSeriesIndex] = useState(0)
    const [singleSeries, setSingleSeries] = useState([])
    const {values, setFieldValue, handleSubmit, handleChange, errors} = useFormik({
        initialValues: {
            name: "", date: convertDate(new Date()), description: "",
        },
        validationSchema: createTrainingValidation,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            // handleSendGoals(values)
            console.log("values")
            console.log(values)
        },
    });
    console.log("values")
    console.log(values)

    return (
        <div className="create-training">
            <form onSubmit={handleSubmit}>
                <div className="header create-training__header">
                    {/*<div className="create-training__data__elements">*/}
                    <h1 className="header__title">Stwórz Trening</h1>

                    <DatePicker locale='pl'
                                name="date"
                                className="header__datepicker animated-datepicker"
                                value={values.date}
                                placeholderText={"Wybierz date"}
                                dateFormat='yyyy-MM-dd'
                                onChange={(date) => setFieldValue('date', convertDate(date))}
                    />


                    <div className="header__name animatedInput">
                        <input name="name" type="text" required="required"/>
                        <span>Nazwa treningu</span>
                    </div>
                    <div className="description header__description animatedInput">
                    <textarea className="description__textarea" name="description" onChange={handleChange}
                              value={values.description}
                              rows="5">
                    </textarea>
                        <span className="description__placeholder">Opis treningu</span>
                    </div>

                    {/*</div>*/}
                </div>
                <DisplayMultiSeries multiSeries={multiSeries} setMultiSeries={setMultiSeries}/>
                <CreateMultiSeries setMultiSeries={setMultiSeries} multiSeries={multiSeries}
                                   singleSeries={singleSeries}
                                   setSingleSeries={setSingleSeries} multiSeriesIndex={multiSeriesIndex}
                                   setMultiSeriesIndex={setMultiSeriesIndex} getExercises={props.getExercises}/>
            </form>
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
