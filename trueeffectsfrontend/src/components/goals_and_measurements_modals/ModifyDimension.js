import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import {useFormik} from "formik";
import {createDimensionValidation} from "../validation/validation";
import {CloseButton} from "react-bootstrap";
import {MenuItem, Select} from "@material-ui/core";
import {getDimensions} from "../../redux/actions/trainingActions";


export function ModifyDimension(props) {
    const {values, handleSubmit, handleChange, errors, setValues} = useFormik({
        initialValues: props.userDimensionsForCreate,
        validationSchema: createDimensionValidation,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            handleModifyDimension()
        },
    });
    const handleValueChange = (event) => {
        setValues(props.userDimensions.find(x => x.id === event.target.value))
    }
    const handleModifyDimension = () => {
        props.putDimension(values).then(()=>{
            props.getDimensions()
        })
    }

    useEffect(() => {
        setValues(props.userDimensions[0])
    }, [props.userDimensionConfiguration, props.userDimensions, props.userDimensionsForCreate])
    return (

        <Modal className="transparent-modal" show={props.show} onHide={props.handleClose}>
            <form onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title>Modyfikuj pomiar</Modal.Title>
                    <CloseButton onClick={props.handleClose} variant="white"/>
                </Modal.Header>
                <Modal.Body>
                    <div className="createdimension__elements">
                        <Select
                            className="dimensions__select"
                            onChange={handleValueChange}
                            defaultValue={props.userDimensions.length > 0 && props.userDimensions[0].id}
                        >
                            {Object.values(props.userDimensions).map(el => {
                                return (
                                    <MenuItem key={el.id} value={el.id}>{el.date}</MenuItem>
                                )
                            })}
                        </Select>
                        {values !== undefined && Object.keys(props.userDimensionConfigurationForCompare).map(element => {
                            return (
                                <div className="createdimension__elements__element" key={element}>
                                    <div className="createdimension__elements__element__row">
                                        <div className="animatedInput">
                                            <input name={element} onChange={handleChange}
                                                   value={values[element] !== null ? values[element]: ""} required="required"
                                            />
                                            <span>{props.userDimensionConfigurationForCompare[element]}</span>
                                        </div>
                                        {errors[element] && <p>{errors[element]}</p>}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <button className="standard-button " type="submit">Modyfikuj pomiar</button>
                </Modal.Footer>
            </form>
        </Modal>

    );
}