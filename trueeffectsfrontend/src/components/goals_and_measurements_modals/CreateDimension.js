import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import DatePicker from "react-datepicker";
import {useFormik} from "formik";
import {createDimensionValidation} from "../validation/validation";
// import {handleDateForDimensions} from "../helpers/function_helpers";
import {useDate} from "../hooks";

export function CreateDimension(props) {
    const {date, jsDate, dateError, setDateError, handleDateForDimensions} = useDate()
    // const [date, setDate] = useState(null)
    // const [jsDate, setJsDate] = useState(null)
    // const [dateError, setDateError] = useState(null)
    const {values, setFieldValue, handleSubmit, handleChange, errors, setValues} = useFormik({
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
        } else {
            setDateError("Wybierz datę")
        }
    }

    useEffect(() => {
        setValues(props.userDimensionsForCreate)
    }, [props.userDimensionConfiguration, props.userDimensions])
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
                                        onChange={(date)=>handleDateForDimensions(date)}/>
                            {dateError && <p>{dateError}</p>}
                            {values !== undefined && Object.keys(values).map((keyName, i) => (
                                <div className="createdimension__elements__element" key={i}>
                                    <div className="createdimension__elements__element__row">
                                        <label htmlFor={keyName}>{keyName}</label>
                                        <input type="number" onChange={handleChange} name={keyName}
                                               value={values[`${keyName}`]}
                                        />
                                        {errors[keyName] && <p>{errors[keyName]}</p>}
                                    </div>
                                </div>
                            ))}
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