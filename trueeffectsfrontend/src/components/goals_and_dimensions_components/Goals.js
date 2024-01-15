import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import '../../sass/addgoals.css';
import "react-datepicker/dist/react-datepicker.css";
import {convertDate} from "../helpers/function_helpers";
import {createGoalValidation} from "../validation/validation";
import {useFormik} from "formik";
import {connect} from "react-redux";
import {getGoals, postGoal, postGoals} from "../../redux/actions/trainingActions";
import {CreateGoal} from "../goals_and_measurements_modals/CreateGoal";
import "../../new_sass/goals.scss"
import {CompareDimensions} from "../goals_and_measurements_modals/CompareDimensions";
import {CreateDimension} from "../goals_and_measurements_modals/CreateDimension";


const Goals = (props) => {
    console.log(props.userGoalsCompleted)
    console.log(props.userGoalsToAchieve)
    const [showCreateGoal, setShowCreateGoal] = useState(false);
    const handleCloseCreateGoal = () => setShowCreateGoal(false);

    const handleShowCreateGoal = () => setShowCreateGoal(true);

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
    const handleDate = (date) => {
        const convertedDate = convertDate(date)
        setFieldValue("finishDate", convertedDate)
        setFieldValue("finishJsDate", date)
    }
    const handleSendGoals = async () => {
        const data = {
            "finish_date": values.finishDate,
            "goal": values.goal,
            "description": values.description,
        }
        await postGoals(data)
        // await getGoals()
        // history.push("/")
    }
    return (
        <div className="goals">
            <CreateGoal show={showCreateGoal} handleClose={handleCloseCreateGoal} handleShow={handleShowCreateGoal}
                        postGoals={(data) => props.postGoal(data)}
            />

            <div className="goals">
                <div className="goals--unrealized">

                    <h1 className="create-training__title">Do zrealizowania</h1>
                    <div className="goals__button">
                        <button className="standard-button" onClick={handleShowCreateGoal}>Dodaj nowy cel</button>
                    </div>
                    {props.userGoalsToAchieve.map(goal_obj => {
                        return (
                            <div className="goals__element">
                                <div className="goals__date">{goal_obj.finish_date}</div>
                                <div className="goals__name">{goal_obj.goal}</div>
                                <div className="goals__check">
                                    <button className="standard-button">Sprawdź</button>
                                </div>
                            </div>
                        )
                    })}

                </div>
                <hr/>
                <div className="goals--realized"><h1
                    className="create-training__title">Zrealizowane</h1>
                    {props.userGoalsCompleted.map(goal_obj => {
                        return (
                            <div className="goals__element">
                                <div className="goals__date">{goal_obj.finish_date}</div>
                                <div className="goals__name">{goal_obj.goal}</div>
                                <div className="goals__check">
                                    <button className="standard-button">Sprawdź</button>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        userGoalsCompleted: state.training.userGoalsCompleted,
        userGoalsToAchieve: state.training.userGoalsToAchieve

    }
}
export default connect(mapStateToProps, {postGoal, getGoals})(Goals);
