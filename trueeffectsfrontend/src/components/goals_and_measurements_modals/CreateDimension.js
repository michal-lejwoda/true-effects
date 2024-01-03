import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import DatePicker from "react-datepicker";
import {useFormik} from "formik";
import {createDimensionValidation} from "../validation/validation";
import {getActiveDimensions, handleDateForDimensions} from "../helpers/function_helpers";

export function CreateDimension(props) {

    const [date, setDate] = useState(null)
    const [jsDate, setJsDate] = useState(null)
    const [dateError, setDateError] = useState(null)
    const {values, setFieldValue, handleSubmit, handleChange, errors} = useFormik({
        initialValues: {
            weight: null,
            growth: null,
            left_biceps: null,
            right_biceps: null,
            left_forearm: null,
            right_forearm: null,
            left_leg: null,
            right_leg: null,
            bodyfat: null

        },
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
        console.log(" handle date")
        console.log(date)
        if (date) {
            await props.postDimension(data_obj)
        } else {
            setDateError("Wybierz datę")
        }


    }

    useEffect(() => {
        getActiveDimensions(props.userDimensions, props.userDimensionConfiguration, setFieldValue)
    }, [props.userDimensionConfiguration, props.userDimensions])

    console.log("dateError")
    console.log(dateError)
    console.log("props.userDimensions")
    console.log(props.userDimensions)
    console.log("values")
    console.log(values)
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
                                        onChange={date => handleDateForDimensions(date, setDate, setJsDate)}/>
                            {dateError && <p>{dateError}</p>}
                            {/*{Object.keys(props.userDimensions[0]).map(((keyName, i) => {*/}
                            {/*    <div className="createdimension__elements__element" key={i}>*/}
                            {/*        <div className="createdimension__elements__element__row">*/}
                            {/*            <label htmlFor={keyName}>{keyName}</label>*/}
                            {/*            <input type="number" onChange={handleChange} name={keyName}*/}
                            {/*            />*/}
                            {/*            {errors[keyName] && <p>{errors[keyName]}</p>}*/}
                            {/*        </div>*/}

                            {/*    </div>*/}
                            {/*}))}*/}

                            {Object.keys(values).map((keyName, i) => (
                                <div className="createdimension__elements__element" key={i}>
                                    {values[keyName] !== null &&
                                        <div className="createdimension__elements__element__row">
                                            <label htmlFor={keyName}>{keyName}</label>
                                            <input type="number" onChange={handleChange} name={keyName}
                                            />
                                            {errors[keyName] && <p>{errors[keyName]}</p>}
                                        </div>
                                    }
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