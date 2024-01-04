import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import DatePicker from "react-datepicker";
import {useFormik} from "formik";
import {createDimensionValidation} from "../validation/validation";
import {useDate} from "../hooks";

export function CreateDimension(props) {
    const {date, jsDate, dateError, setDateError, handleDateForDimensions} = useDate()
    const {values, handleSubmit, handleChange, errors, setValues} = useFormik({
        initialValues: props.userDimensionsForCreate,
        validationSchema: createDimensionValidation,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            handleSendDimension()
        },
    });

    const handleSendDimension = async () => {
        let data_obj = values
        data_obj.date = date
        if (date) {
            await props.postDimension(data_obj)
            await props.getDimensions()
            await props.handleClose()
        } else {
            setDateError("Wybierz datę")
        }
    }

    useEffect(() => {
        setValues(props.userDimensionsForCreate)
    }, [props.userDimensionConfiguration, props.userDimensions, props.userDimensionsForCreate])
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="createdimension__elements">
                            <DatePicker locale='pl'
                                        placeholderText={"Wybierz date"}
                                        dateFormat='dd/MM/yyyy'
                                        selected={jsDate}
                                        onChange={(date) => handleDateForDimensions(date)}/>
                            {dateError && <p>{dateError}</p>}
                            {values !== undefined && Object.keys(props.userDimensionConfigurationForCompare).map(element =>{
                                return (
                                    <div className="createdimension__elements__element" key={element}>
                                        <div className="createdimension__elements__element__row">
                                            <label>{props.userDimensionConfigurationForCompare[element]}</label>
                                            <input type="number" onChange={handleChange} name={element}
                                                   value={values[element]}
                                            />
                                            {errors[{element}] && <p>{errors[{element}]}</p>}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit">Save</button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}