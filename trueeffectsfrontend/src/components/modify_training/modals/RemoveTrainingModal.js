import React from 'react';
import Modal from "react-bootstrap/Modal";
import {CloseButton} from "react-bootstrap";

const RemoveTrainingModal = (props) => {
    return (
        <div>
            <Modal show={props.show} onHide={() => props.handleClose(false)}>
                <Modal.Header>
                    <Modal.Title>Stworzono Trening</Modal.Title>
                    <CloseButton onClick={() => props.handleClose(false)} variant="white"/>
                </Modal.Header>
                <Modal.Body>
                    <p>Jeśli jesteś pewien, że chcesz usunąć ten trening kliknij przycisk Usuń Trening</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="standard-button"
                            onClick={() => props.handleDeleteTraining(props.id)}>Usuń trening
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RemoveTrainingModal;
