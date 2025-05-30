import React, {useEffect, useState} from 'react';
import DatePicker from "react-datepicker";
import CreateMultiSeries from "../create_training_components/CreateMultiSeries";
import {connect} from "react-redux";
import {
    createTraining,
    createUserExercise,
    getExercises,
    getLastCompletedTrainings,
    getSingleTraining,
    getTrainings,
    getUpcomingTrainings
} from "../../redux/actions/trainingActions";
import DisplayMultiSeries from "../create_training_components/DisplayMultiSeries";
import {convertDate} from "../helpers/function_helpers";
import CreatedTrainingModal from "../create_training_components/modals/CreatedTrainingModal";
import {useHistory} from "react-router-dom";
import {useCreateTraining} from "../hooks/training/useCreateTraining";
import '../../new_sass/create_training.scss'
import {useTranslation} from "react-i18next";

const CreateTraining = (props) => {
    const {t} = useTranslation();
    const history = useHistory()
    const [multiSeries, multiSeriesIndex, singleSeries, values, errors, showCreatedTrainingModal, showCreateExerciseModal, createdTraining, setMultiSeries, setMultiSeriesIndex,
        setSingleSeries, setFieldValue, handleChange, handleSubmit, handleCloseCreatedTrainingModal, handleCloseCreateExerciseModal,
        setShowExerciseModal] = useCreateTraining(props.createTraining, props.getTrainings, props.getUpcomingTrainings, props.getLastCompletedTrainings)

    const [defaultExercises, setDefaultExercises] = useState()
    useEffect(() => {
        props.getExercises("")
            .then(response => {
                setDefaultExercises(response)
            })
    }, [])

    return (
        <div className="create-training">
            <div className="header create-training__header">
                <h1 className="header__title">{t("Create Training")}</h1>
                <DatePicker locale={t("actual_language")}
                            name="date"
                            className="header__datepicker animated-datepicker"
                            value={values.date}
                            placeholderText={t("Select training date")}
                            dateFormat='yyyy-MM-dd'
                            onChange={(date) => setFieldValue('date', convertDate(date))}
                />
                {errors.date && <p className="header__errors">{errors.date}</p>}
                <div className="name header__name animatedInput">
                    <input name="name" type="text" required={true} onChange={handleChange}/>
                    <span>{t("Training name")}</span>
                </div>
                {errors.name && <p className="header__errors">{errors.name}</p>}
                <div className="description header__description animatedInput">
                    <textarea className="description__textarea" required={true} name="description"
                              onChange={handleChange}
                              value={values.description}
                              rows="5">
                    </textarea>
                    <span className="description__placeholder">{t("Training description")}</span>
                </div>
                {errors.description && <p className="header__errors">{errors.description}</p>}
                {errors.multi_series && <p className="header__errors">{errors.multi_series}</p>}
                {Object.keys(errors).length === 0 && props.create_single_training_error_message &&
                    <p className="header__errors">{props.create_single_training_error_message}</p>}
            </div>
            <DisplayMultiSeries multiSeries={multiSeries} setMultiSeries={setMultiSeries} handleSubmit={handleSubmit}/>
            <CreateMultiSeries setMultiSeries={setMultiSeries} multiSeries={multiSeries}
                               singleSeries={singleSeries}
                               setSingleSeries={setSingleSeries} multiSeriesIndex={multiSeriesIndex}
                               setMultiSeriesIndex={setMultiSeriesIndex} getExercises={props.getExercises}
                               setShowExerciseModal={setShowExerciseModal}
                               defaultExercises={defaultExercises}
                               setDefaultExercises={setDefaultExercises}
                               history={history}
                               showCreateExerciseModal={showCreateExerciseModal}
                               handleCloseCreateExerciseModal={handleCloseCreateExerciseModal}
                               createUserExercise={props.createUserExercise}
            />
            <CreatedTrainingModal history={history}
                                  showCreatedTrainingModal={showCreatedTrainingModal}
                                  handleCloseCreatedTrainingModal={handleCloseCreatedTrainingModal}
                                  createdTraining={createdTraining}
                                  getSingleTraining={props.getSingleTraining}
                                  createTraining={props.createTraining}
                                  getTrainings={props.getTrainings}
                                  getUpcomingTrainings={props.getUpcomingTrainings}
                                  getLastCompletedTrainings={getLastCompletedTrainings}
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
export default connect(mapStateToProps, {
    getExercises,
    createTraining,
    createUserExercise,
    getSingleTraining,
    getTrainings,
    getUpcomingTrainings,
    getLastCompletedTrainings
})(CreateTraining);
