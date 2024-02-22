import React from 'react';
import Modal from "react-bootstrap/Modal";
import {CloseButton} from "react-bootstrap";
import {handleMoveToScheduler} from "../../helpers/history_helpers";
import {useHistory} from "react-router-dom";

const RemoveTrainingModal = (props) => {
    const history = useHistory()
    const handleDelete = async() =>{
        await props.handleDeleteTraining(props.id)
        await props.getUpcomingTrainings()
        await props.getLastCompletedTrainings()
        await props.getTrainings()
        await handleMoveToScheduler(history)
    }
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
                            onClick={() => handleDelete()}>Usuń trening
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RemoveTrainingModal;
