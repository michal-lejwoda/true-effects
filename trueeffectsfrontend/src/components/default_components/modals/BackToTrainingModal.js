import React from 'react';
import Modal from "react-bootstrap/Modal";
import {handleMoveToTraining} from "../../helpers/history_helpers";
import {CloseButton} from "react-bootstrap";
import {useCookies} from "react-cookie";
import {useTranslation} from "react-i18next";

const BackToTrainingModal = (props) => {
    const {t} = useTranslation();
    const [cookies, ,] = useCookies('true_effects_training')
    const handleBackToTraining = () => {
        props.setShowBackToTrainingModal(false)
        handleMoveToTraining(props.history, cookies.true_effects_training.trainingId)
    }
    return (
        <div className="created-training-modal create-training__created-training-modal">
            <Modal show={props.showBackToTrainingModal} onHide={props.handleCloseBackToTrainingModal}>
                <Modal.Header>
                    <Modal.Title>{t("Back to training")}</Modal.Title>
                    <CloseButton onClick={props.handleCloseBackToTrainingModal} variant="white"/>
                </Modal.Header>
                <Modal.Body>
                    <p>{t("You didn't finish your last workout. Would you like to resume it ?")}</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="standard-button" onClick={props.handleCloseBackToTrainingModal}>
                        {t("Don't resume")}
                    </button>
                    <button className="standard-button"
                            onClick={handleBackToTraining}>{t("Back to training")}
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BackToTrainingModal;
