import React, {useEffect, useState} from 'react';
import {Field, Formik} from "formik";
import {connect} from "react-redux";
import {
    createTraining,
    deleteCurrentTraining,
    getSingleTraining,
    getTrainings, updateSingleSeries,
    updateTraining
} from "../../redux/actions/trainingActions";
import DatePicker from "react-datepicker";
import {convertDate} from "../helpers/function_helpers";
import {useHistory} from "react-router-dom";
import {handleMovetoHome, handleMoveToScheduler, handleMoveToTraining} from "../helpers/history_helpers";
import "../../new_sass/modify_training.scss"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import AddTrainingToDifferentDayModal from "../modify_training/modals/AddTrainingToDifferentDayModal";
import RemoveTrainingModal from "../modify_training/modals/RemoveTrainingModal";

const ModifyTraining = (props) => {

    const history = useHistory()
    const [visibleElements, setVisibleElements] = useState([]);
    const [apiData, setApiData] = useState(null);
    const [removeTrainingModal, setRemoveTrainingModal] = useState(false);
    const [differentDayModal, setDifferentDayModal] = useState(false);
    const {trainingId} = props.match.params;
    useEffect(() => {
        props.getSingleTraining(trainingId)
            .then((res) => {
                setApiData(res);
            })
            .catch(() => {
                handleMovetoHome(history)
            })
    }, [trainingId])

    const handleModifyTraining = async (data) => {
        await props.updateTraining(data)
    }
    const handleCopyTrainingToAnotherDate = async (data) => {
        await props.createTraining(data)
    }

    const handleDeleteTraining = async (id) => {
        await props.deleteCurrentTraining(id)
    }
    const handleDate = (date, values) => {
        values.date = date

    }

    const handleModifySingleSeries = (e, values, id, multi_series_index, single_series_index, singleseries) => {
        e.preventDefault()
        props.updateSingleSeries(singleseries)
        // console.log("id")
        // console.log(id)
        // console.log("multi_series_index")
        // console.log(multi_series_index)
        // console.log("single_series_index")
        // console.log(single_series_index)
        // console.log("values")
        // console.log(values)
        // console.log("singleseries")
        // console.log(singleseries)

    }


    const toggleVisibility = (elementId) => {
        setVisibleElements((prevVisibleElements) => {
            if (prevVisibleElements.includes(elementId)) {
                return prevVisibleElements.filter((id) => id !== elementId);
            } else {
                return [...prevVisibleElements, elementId];
            }
        });
    };
    console.log("visible elmenets")
    console.log(visibleElements)
    console.log("apiData")
    console.log(apiData)
    return (
        <div className="modify-training">
            {apiData && <>
                <RemoveTrainingModal id={trainingId} show={removeTrainingModal} handleClose={setRemoveTrainingModal}
                                     getTrainings={props.getTrainings} handleDeleteTraining={handleDeleteTraining}
                                     handleMoveToScheduler={handleMoveToScheduler} history={props.history}/>
                <AddTrainingToDifferentDayModal show={differentDayModal} handleClose={setDifferentDayModal}
                                                training={apiData} createTraining={props.createTraining}
                                                getTrainings={props.getTrainings}
                                                handleMoveToScheduler={handleMoveToScheduler}
                                                history={props.history}
                />
                <Formik
                    initialValues={apiData}
                    onSubmit={(values, {setSubmitting}) => {
                        console.log("submit")
                        handleModifyTraining(values)
                    }}>
                    {({
                          values,
                          setFieldValue,
                          handleChange,
                          handleSubmit,
                      }) => (
                        <form className="modify-training__form" onSubmit={handleSubmit}>
                            <div className="mt-data modify-training__mt-data">
                                <h1 className="title modify-training__title">Modyfikuj Trening</h1>
                                <DatePicker locale='pl'
                                            name="date"
                                            value={values.date}
                                            className="create-training__datepicker animated-datepicker"
                                            placeholderText={"Wybierz date treningu"}
                                            dateFormat='yyyy-MM-dd'
                                            onChange={(date) => setFieldValue('date', convertDate(date))
                                            }
                                />
                                <div className="mt-data__buttons">
                                    <button className="standard-button"
                                            onClick={() => setRemoveTrainingModal(true)}>Usuń trening -
                                    </button>
                                    <button className="standard-button"
                                            onClick={() => handleMoveToTraining(history)}>Trenuj ->
                                    </button>
                                    <button className="standard-button"
                                            onClick={() => setDifferentDayModal(true)}>Dodaj trening do
                                        innego dnia +
                                    </button>

                                </div>
                                <div className="animatedInput">
                                    <Field onChange={handleChange} name="name" value={values.name} type="text"/>
                                    <span>Nazwa Treningu</span>
                                </div>

                                <div className="animatedInput">
                                    <Field onChange={handleChange} name="description" value={values.description}
                                           type="text"/>
                                    <span>Opis treningu</span>
                                </div>
                                <div className="mt-data--list">
                                    <div className="mt-data__buttons">
                                        <button className="standard-button" type="submit">Modyfikuj trening</button>

                                    </div>
                                    <div className="multiseries mt-data__multiseries">
                                        {values.multi_series.map((multiseries, index) => {
                                            return (
                                                <div className="multi-element multiseries__multi-element--collapse">
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
                                                            return (
                                                                <div className="single-series__element">
                                                                    <p className="single-series__series-num">Seria {indexv2 + 1}</p>
                                                                    <div className="animatedInput">
                                                                        <Field onChange={handleChange}
                                                                               name={`multi_series[${index}].single_series[${indexv2}].reps`}
                                                                               value={singleseries.reps}
                                                                               type="text"/>
                                                                        <span>Liczba powtórzeń</span>
                                                                    </div>
                                                                    <div className="animatedInput">
                                                                        <Field onChange={handleChange}
                                                                               name={`multi_series[${index}].single_series[${indexv2}].rest`}
                                                                               value={singleseries.rest}
                                                                               type="text"/>
                                                                        <span>Odpoczynek</span>
                                                                    </div>
                                                                    <div className="animatedInput">
                                                                        <Field onChange={handleChange}
                                                                               name={`multi_series[${index}].single_series[${indexv2}].concentric_phase`}
                                                                               value={singleseries.concentric_phase}
                                                                               type="text"/>
                                                                        <span>Faza koncentryczna</span>
                                                                    </div>
                                                                    <div className="animatedInput">
                                                                        <Field
                                                                            onChange={handleChange}
                                                                            name={`multi_series[${index}].single_series[${indexv2}].pause_after_concentric_phase`}
                                                                            value={singleseries.pause_after_concentric_phase}
                                                                            type="text"/>
                                                                        <span>Pauza po fazie koncentrycznej</span>
                                                                    </div>
                                                                    <div
                                                                        className="animatedInput">
                                                                        <Field
                                                                            value={singleseries.eccentric_phase}
                                                                            name={`multi_series[${index}].single_series[${indexv2}].eccentric_phase`}
                                                                            onChange={handleChange} type="text"/>
                                                                        <span>Faza ekscentryczna</span>
                                                                    </div>
                                                                    <div
                                                                        className="animatedInput">
                                                                        <Field
                                                                            name={`multi_series[${index}].single_series[${indexv2}].pause_after_eccentric_phase`}
                                                                            value={singleseries.pause_after_eccentric_phase}
                                                                            onChange={handleChange} type="text"/>
                                                                        <span>Pauza po fazie ekscentrycznej</span>
                                                                    </div>
                                                                    <div className="single-series__button">
                                                                        <button className="standard-button" onClick={(e)=>handleModifySingleSeries(e, values, singleseries.id, index, indexv2, singleseries)}>Modyfikuj
                                                                            pojedyńczą serie
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </>}
        </div>
    );
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
    updateSingleSeries
})(ModifyTraining);