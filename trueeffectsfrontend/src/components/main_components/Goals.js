import React, {useState} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import {connect} from "react-redux";
import {deleteGoal, getCompletedGoals, getGoalsToAchieve, postGoal, putGoal} from "../../redux/actions/trainingActions";
import {CreateGoal} from "../goals_and_measurements_modals/CreateGoal";
import {CheckGoal} from "../goals_and_measurements_modals/CheckGoal";
import "../../new_sass/goals.scss"
import {BoxLoading} from "react-loadingg";


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
                    <h1 className="title goals__title">Do zrealizowania</h1>
                    <div className="goals__button">
                        <button className="standard-button" onClick={handleShowCreateGoal}>Dodaj nowy cel</button>
                    </div>
                    {props.userGoalsToAchieve.length === 0 &&
                        <p className="goals__info">Nie masz jeszcze żadnych celów do zrealizowania. Kliknij w przycisk
                            Dodaj
                            nowy cel aby dodać cel</p>}
                    {props.userGoalsToAchieve.map(goal_obj => {
                        return (
                            <div key={goal_obj.id} className="goals__element">
                                <div className="goals__date">{goal_obj.finish_date}</div>
                                <div className="goals__name">{goal_obj.goal}</div>
                                <div className="goals__check">
                                    <button className="standard-button"
                                            onClick={() => handleCheckGoal(goal_obj)}>Sprawdź
                                    </button>
                                </div>
                            </div>
                        )
                    })}

                </div>
                <hr className="goals--hr"/>
                <div className="goals--realized"><h1
                    className="title goals__title">Zrealizowane</h1>
                    {props.userGoalsCompleted.length === 0 &&
                        <p className="goals__info">Nie masz jeszcze żadnych celów do zrealizowania. Kliknij w przycisk
                            Dodaj
                            nowy cel aby dodać cel</p>}
                    {props.userGoalsCompleted.map(goal_obj => {
                        return (
                            <div key={goal_obj.id} className="goals__element">
                                <div className="goals__date">Data realizacji: {goal_obj.finish_date}</div>
                                <div className="goals__name">Cel: {goal_obj.goal}</div>
                                <div className="goals__check">
                                    <button className="standard-button"
                                            onClick={() => handleCheckGoal(goal_obj)}>Sprawdź
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
