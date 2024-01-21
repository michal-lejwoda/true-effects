import React from 'react';
import Modal from "react-bootstrap/Modal";
import {CloseButton} from "react-bootstrap";
import {useFormik} from "formik";
import {createExerciseModalValidation} from "../../validation/validation";

const CreateExerciseModal = (props) => {
    const {values, handleChange, handleSubmit, setErrors, errors} = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: createExerciseModalValidation,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            handleCreateExercise()
        },
    });
    const handleCreateExercise = () => {
        props.createUserExercise(values)
            .then(res => {
                props.handleCloseCreateExerciseModal()
                props.getExercises("")
                    .then(response => {
                        props.setDefaultExercises(response)
                    })
            })
            .catch(error => {
                setErrors(error.response.data)
            })
    }

    return (
        <div className="create-exercise-modal create-training__create-exercise-modal">
            <Modal show={props.showCreateExerciseModal} onHide={props.handleCloseCreateExerciseModal}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header>
                        <Modal.Title>Stwórz Ćwiczenie</Modal.Title>
                        <CloseButton onClick={props.handleCloseCreateExerciseModal} variant="white"/>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="create-exercise-modal__name animatedInput">
                            <input name="name" onChange={handleChange} value={values.name}
                                   type="text"/>
                            <span>Nazwa Ćwiczenia</span>
                        </div>
                        {errors.name && <p className="create-exercise-modal__error">{errors.name}</p>}
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="standard-button" type="submit">
                            Stwórz Ćwiczenie
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
};

export default CreateExerciseModal;
