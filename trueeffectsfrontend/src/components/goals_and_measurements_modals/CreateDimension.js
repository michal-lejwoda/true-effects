import React, {useEffect} from 'react';
import Modal from 'react-bootstrap/Modal'
import DatePicker from "react-datepicker";
import {useFormik} from "formik";
import {createDimensionValidation} from "../validation/validation";
import {CloseButton} from "react-bootstrap";
import {useDate} from "../hooks/training/useDate";
import {t} from "i18next";

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

        <Modal className="transparent-modal" show={props.show} onHide={props.handleClose}>
            <form onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title>{t("Create measurement")}</Modal.Title>
                    <CloseButton onClick={props.handleClose} variant="white"/>
                </Modal.Header>
                <Modal.Body>
                    <div className="createdimension__elements">
                        <DatePicker locale={t("actual_language")}
                                    placeholderText={t("Select date")}
                                    dateFormat='dd/MM/yyyy'
                                    selected={jsDate}
                                    className="createdimension__date animated-datepicker"
                                    onChange={(date) => handleDateForDimensions(date)}/>
                        {dateError && <p>{dateError}</p>}
                        {values !== undefined && Object.keys(props.userDimensionConfigurationForCompare).map(element => {
                            return (
                                <div className="createdimension__elements__element" key={element}>
                                    <div className="createdimension__elements__element__row">
                                        <div className="animatedInput">
                                            <input name={element} onChange={handleChange}
                                                   value={values[element]} required="required"
                                                   type="number"/>
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
                    <button className="standard-button " type="submit">{t("Save measurement")}</button>
                </Modal.Footer>
            </form>
        </Modal>

    );
}