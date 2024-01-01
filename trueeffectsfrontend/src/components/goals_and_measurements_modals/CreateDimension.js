import {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useFormik} from "formik";
import {createGoalValidation} from "../validation/validation";

export function CreateDimension(props) {
    console.log("props.userDimensionConfiguration")
    console.log(props.userDimensionConfiguration)
    const [configurationArray, setConfigurationArray] = useState([])
    useEffect(() => {
        let configAfterChanges = props.userDimensionConfiguration
        console.log("configAfterChanges")
        console.log(configAfterChanges)
        let temp_arr = []
        for (const [key, value] of Object.entries(props.userDimensionConfiguration)) {
            console.log(`${key}: ${value}`);
            if (value == true){
                console.log(key)
                console.log(value)
                temp_arr.push(value)
            }
        }
        setConfigurationArray(temp_arr)
    }, [props.userDimensionConfiguration])
    console.log("configurationArray")
    console.log(configurationArray)

    const {values, setFieldValue, handleSubmit, handleChange, errors} = useFormik({
        initialValues: {
            weight: '',
            growth: '',
            left_biceps: '',
            right_biceps: '',
            left_forearm: '',
            right_forearm: '',
            left_leg: '',
            right_leg: '',
            bodyfat: ''

        },
        validationSchema: createGoalValidation,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            // handleSendGoals(values)
        },
    });


    return (
        <>
            <Button variant="primary" onClick={props.handleShow}>
                Launch demo modal
            </Button>

            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}