import React from 'react';
import Modal from "react-bootstrap/Modal";
import {CloseButton} from "react-bootstrap";
import {handleMoveToModifyTraining, handleMoveToScheduler, handleMoveToTraining} from "../../helpers/history_helpers";
import {convertDate} from "../../helpers/function_helpers";
import DatePicker from "react-datepicker";
import {useFormik} from "formik";
import {createGoalValidation} from "../../validation/validation";

const AddTrainingToDifferentDayModal = (props) => {
    const {values, setFieldValue, handleSubmit, handleChange, errors} = useFormik({
        initialValues: {
            date: convertDate(new Date())
        },
        validationSchema: createGoalValidation,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            console.log(values)
        },
    });
    console.log("values")
    console.log(values)
    return (
        <div>
            <Modal show={props.show} onHide={() => props.handleClose(false)}>
                <Modal.Header>
                    <Modal.Title>Stworzono Trening</Modal.Title>
                    <CloseButton onClick={() => props.handleClose(false)} variant="white"/>
                </Modal.Header>
                <Modal.Body>
                    <DatePicker locale='pl'
                                name="date"
                                value={values.date}
                                className=" animated-datepicker"
                                placeholderText="Wybierz date treningu"
                                dateFormat='yyyy-MM-dd'
                                onChange={(date) => setFieldValue('date', convertDate(date))
                                }/>
                </Modal.Body>
                <Modal.Footer>
                    <button className="standard-button"
                            // onClick={() => handleAddToNewDate()}
                    >Dodaj do innego dnia
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddTrainingToDifferentDayModal;
