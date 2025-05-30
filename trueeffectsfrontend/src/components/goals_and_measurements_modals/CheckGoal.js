import React, {useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import DatePicker from "react-datepicker";
import {useFormik} from "formik";
import {updateGoalValidation} from "../validation/validation";
import {handleDateForGoals} from "../helpers/function_helpers";
import {CloseButton} from "react-bootstrap";
import Checkbox from "@material-ui/core/Checkbox";
import {FormControlLabel} from "@material-ui/core";
import {useTranslation} from "react-i18next";


export function CheckGoal(props) {
    const {values, setFieldValue, handleSubmit, handleChange, errors, setErrors} = useFormik({
        initialValues: {
            id: props.selectedGoal.id,
            goal: props.selectedGoal.goal,
            description: props.selectedGoal.description,
            completed: props.selectedGoal.completed,
            finishDate: props.selectedGoal.finish_date,
            finishJsDate: new Date(props.selectedGoal.finish_date),
        },
        validationSchema: updateGoalValidation,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            const data = {
                "finish_date": values.finishDate,
                "goal": values.goal,
                "description": values.description,
                "completed": values.completed,
            }
            props.putGoal(data, values.id)
                .then(() => {
                    props.getGoalsToAchieve()
                    props.getCompletedGoals()
                    props.setShowCheckGoal(false)
                })
                .catch(error => {
                    setErrors(error.response.data)
                })
        },
    });
    useEffect(() => {
        if (props.selectedGoal !== null) {
            setFieldValue("id", props.selectedGoal.id)
            setFieldValue("goal", props.selectedGoal.goal)
            setFieldValue("description", props.selectedGoal.description)
            setFieldValue("completed", props.selectedGoal.completed)
            setFieldValue("finishDate", props.selectedGoal.finish_date)
            setFieldValue("finishJsDate", new Date(props.selectedGoal.finish_date))
        }
    }, [props.selectedGoal])
    const {t} = useTranslation();
    const handleDeleteGoal = (e) => {
        e.preventDefault()
        props.deleteGoal(values.id)
            .then(() => {
                props.getGoalsToAchieve()
                props.getCompletedGoals()
                props.setShowCheckGoal(false)
            })
            .catch(error => {
                setErrors(error.response.data)
            })
    }

    return (
        <>
            <Modal className="create-goal goals__create-goal" show={props.showCheckGoal}
                   onHide={() => props.setShowCheckGoal(false)} size="lg">
                <form className="create-goal__form" onSubmit={handleSubmit}>
                    <Modal.Header className="header create-goal__header">
                        <Modal.Title>{t("Goal")}</Modal.Title>
                        <CloseButton onClick={() => props.setShowCheckGoal(false)} variant="white"/>
                    </Modal.Header>
                    <Modal.Body className="content create-goal__content">
                        <div className="inputs content__inputs">
                            <div className="inputs__datepicker ">
                                <DatePicker locale={t("actual_language")}
                                            className="animated-datepicker"
                                            placeholderText={t("Completion date")}
                                            dateFormat='dd-MM-yyyy'
                                            selected={values.finishJsDate}
                                            onChange={date => handleDateForGoals(date, setFieldValue)}
                                />
                            </div>
                            {errors.finishDate && <p className="inputs__error">{t(errors.finishDate)}</p>}
                            <div className="inputs__goal-name animatedInput">
                                <input name="goal" type="text" value={values.goal} onChange={handleChange}/>
                                <span>{t("Training goal name")}</span>
                            </div>
                            {errors.goal && <p className="inputs__error">{t(errors.goal)}</p>}
                            <div className="inputs__goal-description animatedInput">

                                <textarea name="description" cols="50" rows="10" value={values.description}
                                          onChange={handleChange}></textarea>
                                <span>{t("Goal description")}</span>
                            </div>
                            {errors.description && <p className="inputs__error">{t(errors.description)}</p>}
                            <div className="inputs__goal-completed">
                                <FormControlLabel control={<Checkbox onChange={handleChange} checked={values.completed}
                                                                     name="completed"/>}
                                                  label={t("“Has the goal been completed?”")}/>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="footer create-goal__footer">
                        <button className="footer__button standard-button" onClick={handleDeleteGoal}>{t("Delete goal")}
                        </button>
                        <button className="footer__button standard-button" type="submit">{t("Save training goal")}
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}