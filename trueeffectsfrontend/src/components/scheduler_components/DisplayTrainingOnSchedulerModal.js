import React from 'react';
import Modal from "react-bootstrap/Modal";
import {handleMoveToModifyTraining, handleMoveToTraining} from "../helpers/history_helpers";
import {useNavigate} from "react-router-dom";

const DisplayTrainingOnSchedulerModal = (props) => {
    const {trainingForModal} = props
    const navigate = useNavigate()

    const goToTraining = () => {
        handleMoveToTraining(navigate)
    }
    // TODO BACK HERE
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Trening</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Nazwa: {trainingForModal.name}
                    Data: {trainingForModal.date}
                    Czas: {trainingForModal.time}
                    Opis: {trainingForModal.description}
                    Serie: {trainingForModal.multi_series.map((el, index) =>
                    <p key={index}>{el.series_num}</p>
                )}
                </Modal.Body>
                <Modal.Footer>
                    <button className="standard-button">Usuń trening</button>
                    <button className="standard-button">Dodaj trening do innego dnia</button>
                    <button className="standard-button" onClick={goToTraining}>Ćwicz</button>
                    <button className="standard-button" onClick={() => handleMoveToModifyTraining(navigate)}>Modyfikuj
                        trening
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DisplayTrainingOnSchedulerModal;
