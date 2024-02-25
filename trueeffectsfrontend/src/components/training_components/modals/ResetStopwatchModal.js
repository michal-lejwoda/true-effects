import React from 'react';
import Modal from "react-bootstrap/Modal";
import {CloseButton} from "react-bootstrap";

const ResetStopwatchModal = (props) => {
    const handleReset = () => {
        props.reset()
        props.setShowResetStopwatch(false)
    }
    return (
        <div className="finish-modal training__finish-modal">
            <Modal show={props.showResetStopwatch} onHide={() => props.setShowResetStopwatch(false)}>
                <Modal.Header>
                    <Modal.Title>Reset Czasu</Modal.Title>
                    <CloseButton onClick={() => props.setShowResetStopwatch(false)} variant="white"/>
                </Modal.Header>
                <Modal.Body>
                    <p>Jeśli chcesz zresetować czas kliknij przycisk "Zresetuj czas"</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="standard-button"
                            onClick={handleReset}>Zresetuj czas
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ResetStopwatchModal;
