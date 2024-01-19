import React, {useState} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import {convertDate} from "../helpers/function_helpers";
import {createGoalValidation} from "../validation/validation";
import {useFormik} from "formik";
import {connect} from "react-redux";
import {getGoals, postGoal, postGoals} from "../../redux/actions/trainingActions";
import {CreateGoal} from "../goals_and_measurements_modals/CreateGoal";
import "../../new_sass/goals.scss"
import {CheckGoal} from "../goals_and_measurements_modals/CheckGoal";


const Goals = (props) => {
    console.log(props.userGoalsCompleted)
    console.log(props.userGoalsToAchieve)
    const [showCreateGoal, setShowCreateGoal] = useState(false);
    const [showCheckGoal, setShowCheckGoal] = useState(false)
    const [selectedGoal, setSelectedGoal] = useState(null)
    console.log("selectedGoal")
    console.log(selectedGoal)
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
        await getGoals()
        // await getGoals()
        // history.push("/")
    }
    const handleCheckGoal = async (goal_obj) => {
        await setSelectedGoal(goal_obj)
        await setShowCheckGoal(true)

    }

    return (
        <div className="goals">
            <div className="goals--unrealized">
                <h1 className="title goals__title">Do zrealizowania</h1>
                <div className="goals__button">
                    <button className="standard-button" onClick={handleShowCreateGoal}>Dodaj nowy cel</button>
                </div>
                {props.userGoalsToAchieve.length == 0 && <p className="goals__info">Nie masz jeszcze żadnych celów do zrealizowania. Kliknij w przycisk Dodaj nowy cel aby dodać cel</p>}
                {props.userGoalsToAchieve.map(goal_obj => {
                    return (
                        <div className="goals__element">
                            <div className="goals__date">{goal_obj.finish_date}</div>
                            <div className="goals__name">{goal_obj.goal}</div>
                            <div className="goals__check">
                                <button className="standard-button" onClick={()=>handleCheckGoal(goal_obj)}>Sprawdź</button>
                            </div>
                        </div>
                    )
                })}

            </div>
            <hr className="goals--hr"/>
            <div className="goals--realized"><h1
                className="title goals__title">Zrealizowane</h1>
                {props.userGoalsCompleted.length == 0 && <p className="goals__info">Nie masz jeszcze żadnych celów do zrealizowania. Kliknij w przycisk Dodaj nowy cel aby dodać cel</p>}
                {props.userGoalsCompleted.map(goal_obj => {
                    return (
                        <div className="goals__element">
                            <div className="goals__date">{goal_obj.finish_date}</div>
                            <div className="goals__name">{goal_obj.goal}</div>
                            <div className="goals__check">
                                <button className="standard-button" onClick={()=>handleCheckGoal(goal_obj)}>Sprawdź</button>
                            </div>
                        </div>
                    )
                })}

            </div>
            <CreateGoal show={showCreateGoal} handleClose={handleCloseCreateGoal} handleShow={handleShowCreateGoal}
                        postGoals={props.postGoal}
            />
            {selectedGoal && <CheckGoal selectedGoal={selectedGoal} showCheckGoal={showCheckGoal} setShowCheckGoal={setShowCheckGoal}/>}
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
