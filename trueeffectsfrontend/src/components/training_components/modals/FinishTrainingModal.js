import React from 'react';
import Modal from "react-bootstrap/Modal";
import {CloseButton} from "react-bootstrap";

const FinishTrainingModal = (props) => {
    return (
        <div className="finish-modal training__finish-modal">
            <Modal show={props.showFinishTraining} onHide={() => props.setShowFinishTraining(false)}>
                <Modal.Header>
                    <Modal.Title>Zakończ trening</Modal.Title>
                    <CloseButton onClick={() => props.setShowFinishTraining(false)} variant="white"/>
                </Modal.Header>
                <Modal.Body>
                    <p>Jeśli chcesz zakończyć i zapisać trening kliknij przycisk "Zakończ trening"</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="standard-button"
                            onClick={props.handleFinishTraining}>Zakończ trening
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default FinishTrainingModal;
