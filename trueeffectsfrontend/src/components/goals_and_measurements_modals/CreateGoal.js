import React from 'react';
import Modal from 'react-bootstrap/Modal';
import DatePicker from "react-datepicker";
import {useFormik} from "formik";
import {createGoalValidation} from "../validation/validation";
import {handleDateForGoals} from "../helpers/function_helpers";
import {CloseButton} from "react-bootstrap";

export function CreateGoal(props) {
    const {values, setFieldValue, handleSubmit, handleChange, errors} = useFormik({
        initialValues: {
            goal: '',
            description: '',
            finishDate: null,
            finishJsDate: null,
        },
        validationSchema: createGoalValidation,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            handleSendGoals(values)
        },
    });

    const handleSendGoals = async () => {
        const data = {
            "finish_date": values.finishDate,
            "goal": values.goal,
            "description": values.description,
            "completed": false,
        }
        await props.postGoals(data)
        await props.getCompletedGoals()
        await props.getGoalsToAchieve()
        await props.handleClose()
    }
    return (
        <>
            <Modal className="create-goal goals__create-goal" show={props.show} onHide={props.handleClose} size="lg">
                <form className="create-goal__form" onSubmit={handleSubmit}>
                    <Modal.Header className="header create-goal__header">
                        <Modal.Title>Stwórz cel</Modal.Title>
                        <CloseButton onClick={props.handleClose} variant="white"/>
                    </Modal.Header>
                    <Modal.Body className="content create-goal__content">
                        <div className="inputs content__inputs">
                            <div className="inputs__datepicker "><DatePicker locale='pl'
                                                                             className="animated-datepicker"
                                                                             placeholderText={"Data realizacji"}
                                                                             dateFormat='dd/MM/yyyy'
                                                                             selected={values.finishJsDate}
                                                                             onChange={date => handleDateForGoals(date, setFieldValue)}
                            />
                            </div>
                            {errors.finishDate && <p className="inputs__error--red">{errors.finishDate}</p>}
                            <div className="inputs__goal-name animatedInput">
                                <input name="goal" type="text" value={values.goal} onChange={handleChange}/>
                                <span>Nazwa celu treningowego</span>
                            </div>
                            {errors.goal && <p className="inputs__error--red inputs__error--start">{errors.goal}</p>}
                            <div className="inputs__goal-description animatedInput">

                                <textarea name="description" cols="50" rows="10" value={values.description}
                                          onChange={handleChange}></textarea>
                                <span>Opis celu</span>
                            </div>
                            {errors.description && <p className="inputs__error--red inputs__error--start">{errors.description}</p>}
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="footer create-goal__footer">
                        <button className="footer__button standard-button" type="submit">Zapisz cel treningowy
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

// export default CreateGoal;