import React from 'react';
import Modal from "react-bootstrap/Modal";
import {handleMoveToModifyTraining, handleMoveToScheduler, handleMoveToTraining} from "../../helpers/history_helpers";
import {CloseButton} from "react-bootstrap";
import {useHistory} from "react-router-dom";

const CreatedTrainingModal = (props) => {
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
                    <Modal.Title>Stworzono Trening</Modal.Title>
                    <CloseButton onClick={props.handleCloseCreatedTrainingModal} variant="white"/>
                </Modal.Header>
                <Modal.Body>
                    <p>Trening został utworzony. Możesz go podejrzeć w kalendarzu treningu. Ewentualnie możesz rozpocząć
                        trening po kliknięciu w przycisk Ćwicz</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="standard-button"
                            onClick={() => handleMoveToModifyTraining(props.history, props.createdTraining.id)}>Modyfikuj trening
                    </button>
                    <button className="standard-button"
                            onClick={() => handleGoToTraining(props.createdTraining.id)}>Ćwicz
                    </button>
                    <button className="standard-button" onClick={() => handleMoveToScheduler(props.history)}>Przejdź do
                        kalendarza
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreatedTrainingModal;
