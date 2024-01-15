import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/fontawesome-free-solid";
import ModalDisplayTrainingItem from "../modaldisplaytraining/ModalDisplayTrainingItem";
import {handleMoveToTraining} from "../helpers/history_helpers";

const DisplayTrainingOnSchedulerModal = (props) => {
    const {trainingForModal} = props

    const goToTraining = () => {
        handleMoveToTraining(props.history)
    }

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
                    Serie: {trainingForModal.multi_series.map((el, index)=>
                    <p key={index}>{el.series_num}</p>
                    )}
                    <button>Usuń trening</button>
                    <button>Dodaj trening do innego dnia</button>
                    <button onClick={goToTraining}>Ćwicz</button>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit">Save</button>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DisplayTrainingOnSchedulerModal;
