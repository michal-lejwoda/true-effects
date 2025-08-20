import React from 'react';
import {Field, Formik} from "formik";
import {connect} from "react-redux";
import {
    createTraining,
    deleteCurrentTraining,
    getLastCompletedTrainings,
    getSingleTraining,
    getTrainings,
    getUpcomingTrainings,
    updateSingleSeries,
    updateTraining
} from "../../redux/actions/trainingActions";
import DatePicker from "react-datepicker";
import {convertDate} from "../helpers/function_helpers";
import {handleMoveToScheduler, handleMoveToTraining} from "../helpers/history_helpers";
import "../../new_sass/modify_training.scss"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import AddTrainingToDifferentDayModal from "../modify_training/modals/AddTrainingToDifferentDayModal";
import RemoveTrainingModal from "../modify_training/modals/RemoveTrainingModal";
import useModifyTraining from "../hooks/training/useModifyTraining";
import {useTranslation} from "react-i18next";

const ModifyTraining = (props) => {
    const {t} = useTranslation();
    const [history, visibleElements, apiData, trainingId, removeTrainingModal, differentDayModal, setRemoveTrainingModal, handleModifyTraining, setDifferentDayModal, handleDeleteTraining, handleModifySingleSeries, toggleVisibility] = useModifyTraining(props)

    const handleGoToTraining = (id) => {
        props.getSingleTraining(id)
            .then((training) => {
                let date = new Date()
                let res = date.toISOString().split('T')[0]
                if (training.date === res) {
                    handleMoveToTraining(history, id)
                } else {
                    let data = training
                    data.date = res
                    props.createTraining(data)
                        .then((res) => {
                            props.getUpcomingTrainings()
                            props.getLastCompletedTrainings()
                            props.getTrainings()
                            handleMoveToTraining(history, res.id)
                        })
                }
            })
    }
    return (<div className="modify-training">
        {apiData && <>
            <RemoveTrainingModal id={trainingId} show={removeTrainingModal} handleClose={setRemoveTrainingModal}
                                 getTrainings={props.getTrainings} handleDeleteTraining={handleDeleteTraining}
                                 handleMoveToScheduler={handleMoveToScheduler} history={props.history}
                                 getUpcomingTrainings={props.getUpcomingTrainings}
                                 getLastCompletedTrainings={props.getLastCompletedTrainings}
            />
            <AddTrainingToDifferentDayModal show={differentDayModal} handleClose={setDifferentDayModal}
                                            training={apiData} createTraining={props.createTraining}
                                            getTrainings={props.getTrainings}
                                            getLastCompletedTrainings={props.getLastCompletedTrainings}
                                            getUpcomingTrainings={props.getUpcomingTrainings}
                                            handleMoveToScheduler={handleMoveToScheduler}
                                            history={props.history}
            />
            <Formik
                initialValues={apiData}
            >
                {({
                      values, setFieldValue, handleChange, handleSubmit,
                  }) => (<form className="modify-training__form" onSubmit={handleSubmit}>
                    <div className="mt-data modify-training__mt-data">
                        <div className="mt-data--top">
                            <h1 className="title modify-training__title">{t("Modify Training")}</h1>

                            <div className="mt-data__buttons">
                                <div className="mt-data__buttons--end">
                                    <button className="standard-button"
                                            onClick={() => setRemoveTrainingModal(true)}>{t("Delete Training")} -
                                    </button>
                                </div>
                                <div className="mt-data__buttons--end">
                                    <button className="standard-button"
                                            onClick={() => setDifferentDayModal(true)}>{t("Add training to other day")} +
                                    </button>
                                </div>
                                <div className="mt-data__buttons--end">
                                    <button className="standard-button"
                                            onClick={() => handleGoToTraining(values.id)}>{t("Train")} ->
                                    </button>
                                </div>

                            </div>
                            <DatePicker locale={t("actual_language")}
                                        name="date"
                                        value={values.date}
                                        className="create-training__datepicker animated-datepicker"
                                        placeholderText={t("Select training date")}
                                        dateFormat='yyyy-MM-dd'
                                        onChange={(date) => setFieldValue('date', convertDate(date))}
                            />
                            <div className="animatedInput">
                                <Field onChange={handleChange} name="name" value={values.name} type="text"/>
                                <span>{t("Training Name")}</span>
                            </div>

                            <div className="animatedInput">
                                <Field onChange={handleChange} name="description" value={values.description}
                                       type="text"/>
                                <span>{t("Training description")}</span>
                            </div>
                            <div className="animatedInput">
                                <Field onChange={handleChange} name="time" value={values.time}
                                       type="text"/>
                                <span>{t("Training time")}</span>
                            </div>
                            <div className="mt-data__buttons--end">
                                <button className="standard-button"
                                        onClick={() => handleModifyTraining(values)}>{t("Save training changes")}
                                </button>
                            </div>
                        </div>
                        <div className="mt-data--list">
                            <h1 className="title modify-training__title">{t("Modify Series")}</h1>
                            <div className="multiseries mt-data__multiseries">
                                {values.multi_series.map((multiseries, index) => {
                                    return (<div className="multi-element multiseries__multi-element--collapse"
                                                 key={`${multiseries.id}`}>
                                        <div className="multi-element__container"
                                             onClick={() => toggleVisibility(index)}>
                                            <div
                                                className="multi-element__name">{multiseries.exercise.name}</div>
                                            <span className="buttons__button multi-element__button"
                                            >
                                                        <FontAwesomeIcon icon={faPlus}/>
                                                    </span>
                                        </div>
                                        <div
                                            className="single-series multi-element__single-series--expanded">
                                            {visibleElements.includes(index) && multiseries.single_series.map((singleseries, indexv2) => {
                                                return (<div className="single-series__element"
                                                             key={`${multiseries.id}-${singleseries.id}`}>
                                                    <p className="single-series__series-num">Seria {indexv2 + 1}</p>
                                                    <div className="animatedInput">
                                                        <Field onChange={handleChange}
                                                               name={`multi_series[${index}].single_series[${indexv2}].reps`}
                                                               value={singleseries.reps}
                                                               type="text"/>
                                                        <span>{t("Repetitions number")}</span>
                                                    </div>
                                                    <div className="animatedInput">
                                                        <Field onChange={handleChange}
                                                               name={`multi_series[${index}].single_series[${indexv2}].extra_weight`}
                                                               value={singleseries.extra_weight}
                                                               type="text"/>
                                                        <span>{t("Additional weight")}</span>
                                                    </div>
                                                    <div className="animatedInput">
                                                        <Field onChange={handleChange}
                                                               name={`multi_series[${index}].single_series[${indexv2}].rest`}
                                                               value={singleseries.rest}
                                                               type="text"/>
                                                        <span>{t("Rest")}</span>
                                                    </div>
                                                    <div className="animatedInput">
                                                        <Field onChange={handleChange}
                                                               name={`multi_series[${index}].single_series[${indexv2}].concentric_phase`}
                                                               value={singleseries.concentric_phase}
                                                               type="text"/>
                                                        <span>{t("Concentric phase")}</span>
                                                    </div>
                                                    <div className="animatedInput">
                                                        <Field
                                                            onChange={handleChange}
                                                            name={`multi_series[${index}].single_series[${indexv2}].pause_after_concentric_phase`}
                                                            value={singleseries.pause_after_concentric_phase}
                                                            type="text"/>
                                                        <span>{t("Pause after concentric phase")}</span>
                                                    </div>
                                                    <div
                                                        className="animatedInput">
                                                        <Field
                                                            value={singleseries.eccentric_phase}
                                                            name={`multi_series[${index}].single_series[${indexv2}].eccentric_phase`}
                                                            onChange={handleChange} type="text"/>
                                                        <span>{t("Eccentric phase")}</span>
                                                    </div>
                                                    <div
                                                        className="animatedInput">
                                                        <Field
                                                            name={`multi_series[${index}].single_series[${indexv2}].pause_after_eccentric_phase`}
                                                            value={singleseries.pause_after_eccentric_phase}
                                                            onChange={handleChange} type="text"/>
                                                        <span>{t("Pause after eccentric phase")}</span>
                                                    </div>
                                                    <div className="single-series__button">
                                                        <button className="standard-button"
                                                                onClick={(e) => handleModifySingleSeries(e, values, singleseries.id, index, indexv2, singleseries)}>
                                                            {t("Modify single series")}
                                                        </button>
                                                    </div>
                                                </div>)
                                            })}
                                        </div>
                                    </div>)
                                })}
                            </div>
                        </div>
                    </div>
                </form>)}
            </Formik>
        </>}
    </div>);
};

const mapStateToProps = (state) => {
    return {
        training: state.training.training,
    }
}
export default connect(mapStateToProps, {
    updateTraining,
    createTraining,
    deleteCurrentTraining,
    getTrainings,
    getSingleTraining,
    updateSingleSeries,
    getLastCompletedTrainings,
    getUpcomingTrainings
})(ModifyTraining);