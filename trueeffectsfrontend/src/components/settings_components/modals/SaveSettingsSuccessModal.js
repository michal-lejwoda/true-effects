import React from 'react';
import Modal from "react-bootstrap/Modal";
import {CloseButton} from "react-bootstrap";

const SaveSettingsSuccessModal = (props) => {
    return (
        <Modal className="transparent-modal" show={props.show} onHide={props.handleClose}>
            <Modal.Header>
                <Modal.Title>Zapisano ustawienia</Modal.Title>
                <CloseButton onClick={props.handleClose} variant="white"/>
            </Modal.Header>
            <Modal.Body>
                <p>Udało się zapisać ustawienia !!!</p>
            </Modal.Body>
            <Modal.Footer>
                <button className="standard-button" onClick={props.handleClose}>Zamknij okno</button>
            </Modal.Footer>
        </Modal>
    );
};

export default SaveSettingsSuccessModal;
