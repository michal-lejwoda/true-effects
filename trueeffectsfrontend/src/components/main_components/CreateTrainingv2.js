import React from 'react';
import DatePicker from "react-datepicker";
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
                    <input name="name" type="text" required={true} onChange={handleChange}/>
                    <span>Nazwa treningu</span>
                </div>
                {errors.name && <p className="header__errors">{errors.name}</p>}
                <div className="description header__description animatedInput">
                    <textarea className="description__textarea" required={true} name="description"
                              onChange={handleChange}
                              value={values.description}
                              rows="5">
                    </textarea>
                    <span className="description__placeholder">Opis treningu</span>
                </div>
                {errors.description && <p className="header__errors">{errors.description}</p>}
                {errors.multi_series && <p className="header__errors">{errors.multi_series}</p>}
            </div>
            <DisplayMultiSeries multiSeries={multiSeries} setMultiSeries={setMultiSeries} handleSubmit={handleSubmit}/>
            <CreateMultiSeries setMultiSeries={setMultiSeries} multiSeries={multiSeries}
                               singleSeries={singleSeries}
                               setSingleSeries={setSingleSeries} multiSeriesIndex={multiSeriesIndex}
                               setMultiSeriesIndex={setMultiSeriesIndex} getExercises={props.getExercises}/>
        </div>);
};


// const mapStateToProps = (state) => {
//     return {
//         trainings: state.training.trainings.data,
//         loadedtrainings: state.training.loadedtrainings,
//         measurements: state.training.measurements.data,
//         goals: state.training.goals.data,
//         exercises: state.training.exercises
//     }
// }
export default connect(null, {getExercises})(CreateTrainingv2);
