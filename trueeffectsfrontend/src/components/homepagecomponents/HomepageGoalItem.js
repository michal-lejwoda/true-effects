import React from 'react';
import Moment from 'react-moment';
import 'moment/locale/pl';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteGoals, getGoals } from '../../redux/actions/trainingActions'
moment().locale('pl')
const HomepageGoalItem = (props) => {
    const handleDelete = async () => {
        await props.deleteGoals(props.goal.id)
        await props.getGoals()
    }
    let currentTime = new Date();
    let dd = currentTime.getDate();
    let mm = currentTime.getMonth() + 1;
    // let yyyy = currentTime.getFullYear();

    if (dd < 10) {
        dd = `0${dd}`;
    }
    if (mm < 10) {
        mm = `0${mm}`;
    }
    return (
        <div className="homepage__goalscontainer__elements__element">
            <div className="homepage__goalscontainer__elements__element-name">{props.goal.description}<button onClick={handleDelete}>Usuń cel</button></div>
            <div className="homepage__goalscontainer__elements__element__time">
                <div className="homepage__goalscontainer__elements__element__time-description">Pozostały czas upłynie</div>
                <div className="homepage__goalscontainer__elements__element__time-number">
                    <Moment locale='pl' fromNow>{props.goal.date}</Moment>
                </div>
                <div className="homepage__goalscontainer__elements__element__time-data">{props.goal.date}</div>
            </div>
        </div>
    );
};
const mapDispatchToProps = () => dispatch => {
    return {
        deleteGoals: (x) => dispatch(deleteGoals(x)),
        getGoals: () => dispatch(getGoals())
    };
};
export default connect(null, mapDispatchToProps)(HomepageGoalItem);