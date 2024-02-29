import React from 'react';
import Modal from "react-bootstrap/Modal";
import {CloseButton} from "react-bootstrap";
import {convertDate} from "../../helpers/function_helpers";
import DatePicker from "react-datepicker";
import {useFormik} from "formik";
import {addTrainingToDifferentDayValidation} from "../../validation/validation";

const AddTrainingToDifferentDayModal = (props) => {
    const {values, setFieldValue, handleSubmit, handleChange, errors} = useFormik({
        initialValues: {
            name: props.training.name,
            date: convertDate(new Date())
        },
        validationSchema: addTrainingToDifferentDayValidation,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            let training = props.training
            training.name = values.name
            training.date = values.date
            props.createTraining(training)
                .then(() => {
                    props.getTrainings()
                    props.getUpcomingTrainings()
                    props.getLastCompletedTrainings()
                    props.handleMoveToScheduler(props.history)
                })
        },
    });
    return (
        <div>
            <Modal show={props.show} onHide={() => props.handleClose(false)}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header>
                        <Modal.Title>Stworzono Trening</Modal.Title>
                        <CloseButton onClick={() => props.handleClose(false)} variant="white"/>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="add-training-to-date">
                            <DatePicker locale='pl'
                                        name="date"
                                        value={values.date}
                                        className=" animated-datepicker"
                                        placeholderText="Wybierz date treningu"
                                        dateFormat='yyyy-MM-dd'
                                        onChange={(date) => setFieldValue('date', convertDate(date))
                                        }/>
                            {errors.date && <p>{errors.date}</p>}
                            <div className="animatedInput">
                                <input onChange={handleChange} name="name" value={values.name} type="text"/>
                                <span>Nazwa Treningu</span>
                            </div>
                            {errors.name && <p>{errors.name}</p>}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="standard-button"
                                type="submit"
                            // onClick={() => handleAddToNewDate()}
                        >Dodaj do innego dnia
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
};

export default AddTrainingToDifferentDayModal;
