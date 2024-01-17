import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import {useFormik} from "formik";
import {createSingleSeriesValidation, createTrainingValidation} from "../validation/validation";
import CreateMultiSeries from "../create_training_components/CreateMultiSeries";
import {connect} from "react-redux";
import {getExercises} from "../../redux/actions/trainingActions";
import DisplayMultiSeries from "../create_training_components/DisplayMultiSeries";
import '../../new_sass/create_training.scss'
import {convertDate} from "../helpers/function_helpers";
import {useCreateTraining} from "../hooks";

const CreateTrainingv2 = (props) => {
    const [multiSeries, multiSeriesIndex, singleSeries, values, errors, setMultiSeries, setMultiSeriesIndex,
        setSingleSeries, setFieldValue, handleChange, handleSubmit] = useCreateTraining()

    // const [multiSeries, setMultiSeries] = useState([])
    // const [multiSeriesIndex, setMultiSeriesIndex] = useState(0)
    // const [singleSeries, setSingleSeries] = useState([])
    // const handleSubmit = () => {
    //     if (validateTraining() === true) {
    //         let data = values
    //         data["multiSeries"] = multiSeries
    //         console.log(data)
    //     }else{
    //         return null;
    //     }
    // }
    // const {values, setFieldValue, handleChange, setErrors, errors} = useFormik({
    //     initialValues: {
    //         name: "", date: convertDate(new Date()), description: "",
    //     },
    //     validationSchema: createTrainingValidation,
    //     validateOnChange: false,
    //     validationOnBlue: false,
    // });
    //
    // const validateTraining = () => {
    //     try {
    //         createTrainingValidation.validateSync(values, {abortEarly: false});
    //         return true
    //     } catch (error) {
    //         const formattedErrors = error.inner.reduce((acc, validationError) => {
    //             acc[validationError.path] = validationError.message;
    //             return acc;
    //         }, {});
    //
    //         setErrors(formattedErrors);
    //         return false
    //     }
    // }

    return (
        <div className="create-training">
            <div className="header create-training__header">
                <h1 className="header__title">Stwórz Trening</h1>
                <DatePicker locale='pl'
                            name="date"
                            className="header__datepicker animated-datepicker"
                            value={values.date}
                            placeholderText={"Wybierz date"}
                            dateFormat='yyyy-MM-dd'
                            onChange={(date) => setFieldValue('date', convertDate(date))}
                />
                {errors.date && <p className="header__errors">{errors.date}</p>}

                <div className="name header__name animatedInput">
                    <input name="name" type="text" required="required"/>
                    <span>Nazwa treningu</span>
                </div>
                {errors.name && <p className="header__errors">{errors.name}</p>}
                <div className="description header__description animatedInput">
                    <textarea className="description__textarea" name="description" onChange={handleChange}
                              value={values.description}
                              rows="5">
                    </textarea>
                    <span className="description__placeholder">Opis treningu</span>
                </div>
                {errors.description && <p className="header__errors">{errors.description}</p>}
            </div>
            <DisplayMultiSeries multiSeries={multiSeries} setMultiSeries={setMultiSeries} handleSubmit={handleSubmit}/>
            <CreateMultiSeries setMultiSeries={setMultiSeries} multiSeries={multiSeries}
                               singleSeries={singleSeries}
                               setSingleSeries={setSingleSeries} multiSeriesIndex={multiSeriesIndex}
                               setMultiSeriesIndex={setMultiSeriesIndex} getExercises={props.getExercises}/>
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
