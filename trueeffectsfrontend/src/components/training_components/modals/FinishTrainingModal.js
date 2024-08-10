import React from 'react';
import Modal from "react-bootstrap/Modal";
import {CloseButton} from "react-bootstrap";
import {t} from "i18next";

const FinishTrainingModal = (props) => {
    return (
        <div className="finish-modal training__finish-modal">
            <Modal show={props.showFinishTraining} onHide={() => props.setShowFinishTraining(false)}>
                <Modal.Header>
                    <Modal.Title>{t("Finish training")}</Modal.Title>
                    <CloseButton onClick={() => props.setShowFinishTraining(false)} variant="white"/>
                </Modal.Header>
                <Modal.Body>
                    <p>{t("If you want to end and save the workout, click the 'Finish training' button.")}</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="standard-button"
                            onClick={props.handleFinishTraining}>{"Finish training"}
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default FinishTrainingModal;
