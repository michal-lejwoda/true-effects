import React, {useState} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import {connect} from "react-redux";
import {deleteGoal, getCompletedGoals, getGoalsToAchieve, postGoal, putGoal} from "../../redux/actions/trainingActions";
import {CreateGoal} from "../goals_and_measurements_modals/CreateGoal";
import {CheckGoal} from "../goals_and_measurements_modals/CheckGoal";
import "../../new_sass/goals.scss"
import {BoxLoading} from "react-loadingg";
import {t} from "i18next";


const Goals = (props) => {
    const [showCreateGoal, setShowCreateGoal] = useState(false);
    const [showCheckGoal, setShowCheckGoal] = useState(false)
    const [selectedGoal, setSelectedGoal] = useState(null)
    const handleCloseCreateGoal = () => setShowCreateGoal(false);
    const handleShowCreateGoal = () => setShowCreateGoal(true);

    const handleCheckGoal = async (goal_obj) => {
        await setSelectedGoal(goal_obj)
        await setShowCheckGoal(true)
    }
    return props.userGoalsCompletedLoaded && props.userGoalsToAchieveLoaded ?
        (
            <div className="goals">
                <div className="goals--unrealized">
                    <h1 className="title goals__title">{t("To achieve")}</h1>
                    <div className="goals__button">
                        <button className="standard-button" onClick={handleShowCreateGoal}>{t("Add new goal")}</button>
                    </div>
                    {props.userGoalsToAchieve.length === 0 &&
                        <p className="goals__info">{t("You don't have any goals to achieve yet. Click the 'Add New Goal' button to add a goal.")}</p>}
                    {props.userGoalsToAchieve.map(goal_obj => {
                        return (
                            <div key={goal_obj.id} className="goals__element">
                                <div className="goals__date">{goal_obj.finish_date}</div>
                                <div className="goals__name">{goal_obj.goal}</div>
                                <div className="goals__check">
                                    <button className="standard-button"
                                            onClick={() => handleCheckGoal(goal_obj)}>{t("Check")}
                                    </button>
                                </div>
                            </div>
                        )
                    })}

                </div>
                <hr className="goals--hr"/>
                <div className="goals--realized"><h1
                    className="title goals__title">{t("Completed")}</h1>
                    {props.userGoalsCompleted.length === 0 &&
                        <p className="goals__info">{t("You don't have any goals to achieve yet. Click the 'Add New Goal' button to add a goal.")}</p>}
                    {props.userGoalsCompleted.map(goal_obj => {
                        return (
                            <div key={goal_obj.id} className="goals__element">
                                <div className="goals__date">{t("Completion date")}: {goal_obj.finish_date}</div>
                                <div className="goals__name">{t("Goal")}: {goal_obj.goal}</div>
                                <div className="goals__check">
                                    <button className="standard-button"
                                            onClick={() => handleCheckGoal(goal_obj)}>{t("Check")}
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <CreateGoal show={showCreateGoal} handleClose={handleCloseCreateGoal} handleShow={handleShowCreateGoal}
                            postGoals={props.postGoal} getCompletedGoals={props.getCompletedGoals}
                            getGoalsToAchieve={props.getGoalsToAchieve}
                />
                {selectedGoal && <CheckGoal putGoal={props.putGoal} getCompletedGoals={props.getCompletedGoals}
                                            getGoalsToAchieve={props.getGoalsToAchieve} selectedGoal={selectedGoal}
                                            showCheckGoal={showCheckGoal} setShowCheckGoal={setShowCheckGoal}
                                            deleteGoal={props.deleteGoal}/>
                }
            </div>
        ) :
        (props.userGoalsCompletedLoading || props.userGoalsToAchieveLoading) && (
            <div className="box-loading">
                <BoxLoading/>
            </div>
        )
};
const mapStateToProps = (state) => {
    return {
        userGoalsCompleted: state.training.userGoalsCompleted,
        userGoalsCompletedLoading: state.training.userGoalsCompletedLoading,
        userGoalsCompletedLoaded: state.training.userGoalsCompletedLoaded,
        userGoalsToAchieve: state.training.userGoalsToAchieve,
        userGoalsToAchieveLoading: state.training.userGoalsToAchieveLoading,
        userGoalsToAchieveLoaded: state.training.userGoalsToAchieveLoaded
    }
}
export default connect(mapStateToProps, {postGoal, putGoal, getCompletedGoals, getGoalsToAchieve, deleteGoal})(Goals);
