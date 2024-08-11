import React from 'react';
import Modal from "react-bootstrap/Modal";
import {handleMoveToModifyTraining, handleMoveToScheduler, handleMoveToTraining} from "../../helpers/history_helpers";
import {CloseButton} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";

const CreatedTrainingModal = (props) => {
    const {t} = useTranslation();
    const history = useHistory()
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
    return (
        <div className="created-training-modal create-training__created-training-modal">
            <Modal show={props.showCreatedTrainingModal} onHide={props.handleCloseCreatedTrainingModal}>
                <Modal.Header>
                    <Modal.Title>{t("Training Created")}</Modal.Title>
                    <CloseButton onClick={props.handleCloseCreatedTrainingModal} variant="white"/>
                </Modal.Header>
                <Modal.Body>
                    <p>{t("The workout has been created. You can view it in the workout calendar. Alternatively, you can start the workout by clicking the 'Start Workout' button.")}</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="standard-button"
                            onClick={() => handleMoveToModifyTraining(props.history, props.createdTraining.id)}>{t("Modify Training")}
                    </button>
                    <button className="standard-button"
                            onClick={() => handleGoToTraining(props.createdTraining.id)}>Ćw
                    </button>
                    <button className="standard-button" onClick={() => handleMoveToScheduler(props.history)}>{t("Go to the calendar")}
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreatedTrainingModal;
