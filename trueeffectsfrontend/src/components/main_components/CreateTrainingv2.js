import React, {useEffect, useState} from 'react';
import DatePicker from "react-datepicker";
import CreateMultiSeries from "../create_training_components/CreateMultiSeries";
import {connect} from "react-redux";
import {createTraining, createUserExercise, getExercises} from "../../redux/actions/trainingActions";
import DisplayMultiSeries from "../create_training_components/DisplayMultiSeries";
import '../../new_sass/create_training.scss'
import {convertDate} from "../helpers/function_helpers";
import {useCreateTraining} from "../hooks";
import CreatedTrainingModal from "../create_training_components/modals/CreatedTrainingModal";
import {useHistory} from "react-router-dom";
import CreateExerciseModal from "../create_training_components/modals/CreateExerciseModal";

const CreateTrainingv2 = (props) => {
    const history = useHistory()
    const [multiSeries, multiSeriesIndex, singleSeries, values, errors, showCreatedTrainingModal, showCreateExerciseModal, setMultiSeries, setMultiSeriesIndex,
        setSingleSeries, setFieldValue, handleChange, handleSubmit,
        handleCloseCreatedTrainingModal, handleCloseCreateExerciseModal, setShowCreatedTrainingModal, setShowExerciseModal] = useCreateTraining(props.createTraining)

    const [defaultExercises, setDefaultExercises] = useState()
    useEffect(()=>{
        props.getExercises("")
            .then(response=>{
                setDefaultExercises(response)
            })
    },[])

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
                {Object.keys(errors).length == 0 && props.create_single_training_error_message &&
                    <p className="header__errors">{props.create_single_training_error_message}</p>}
            </div>
            <DisplayMultiSeries multiSeries={multiSeries} setMultiSeries={setMultiSeries} handleSubmit={handleSubmit}/>
            <CreateMultiSeries setMultiSeries={setMultiSeries} multiSeries={multiSeries}
                               singleSeries={singleSeries}
                               setSingleSeries={setSingleSeries} multiSeriesIndex={multiSeriesIndex}
                               setMultiSeriesIndex={setMultiSeriesIndex} getExercises={props.getExercises}
                               setShowExerciseModal={setShowExerciseModal}
                               defaultExercises={defaultExercises}

            />
            <CreatedTrainingModal history={history}
                                  showCreatedTrainingModal={showCreatedTrainingModal}
                                  handleCloseCreatedTrainingModal={handleCloseCreatedTrainingModal}
            />
            <CreateExerciseModal history={history}
                                 showCreateExerciseModal={showCreateExerciseModal}
                                 handleCloseCreateExerciseModal={handleCloseCreateExerciseModal}
                                 createUserExercise={props.createUserExercise}
                                 getExercises={props.getExercises}
                                 setDefaultExercises={setDefaultExercises}

            />

        </div>);
};


const mapStateToProps = (state) => {
    return {
        created_training: state.training.created_training,
        create_single_training_error: state.training.create_single_training_error,
        create_single_training_error_message: state.training.create_single_training_error_message,
    }
}
export default connect(mapStateToProps, {getExercises, createTraining, createUserExercise})(CreateTrainingv2);
