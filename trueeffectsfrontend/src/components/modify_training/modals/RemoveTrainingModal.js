import React from 'react';
import Modal from "react-bootstrap/Modal";
import {CloseButton} from "react-bootstrap";
import {handleMoveToScheduler} from "../../helpers/history_helpers";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";

const RemoveTrainingModal = (props) => {
    const history = useHistory()
    const {t} = useTranslation();
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
                    <Modal.Title>{t("Remove training")}</Modal.Title>
                    <CloseButton onClick={() => props.handleClose(false)} variant="white"/>
                </Modal.Header>
                <Modal.Body>
                    <p>{t("If you are sure you want to delete this workout, click the 'Delete Workout' button.")}</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="standard-button"
                            onClick={() => handleDelete()}>{t("Remove Training")}
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RemoveTrainingModal;
