import React from 'react';
import Modal from "react-bootstrap/Modal";
import {handleMoveToTraining} from "../../helpers/history_helpers";
import {CloseButton} from "react-bootstrap";
import {useCookies} from "react-cookie";

const BackToTrainingModal = (props) => {
    const [cookies, , ] = useCookies('true_effects_training')
    return (
        <div className="created-training-modal create-training__created-training-modal">
            <Modal show={props.showBackToTrainingModal} onHide={props.handleCloseBackToTrainingModal}>
                <Modal.Header>
                    <Modal.Title>Wróć do treningu</Modal.Title>
                    <CloseButton onClick={props.handleCloseBackToTrainingModal} variant="white"/>
                </Modal.Header>
                <Modal.Body>
                    <p>Nie dokończyłeś ostatniego treningu czy chciałbyś do niego wrócić?</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="standard-button" onClick={props.handleCloseBackToTrainingModal}>Nie wracaj
                    </button>
                    <button className="standard-button"
                            onClick={() => handleMoveToTraining(props.history, cookies.true_effects_training.trainingId)}>Wróć
                        do
                        treningu
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BackToTrainingModal;
