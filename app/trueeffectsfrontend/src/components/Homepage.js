import React,{useEffect} from 'react';
import '../sass/homepage.scss';
import {connect} from 'react-redux';
import {postLogin} from '../redux/actions/authenticationActions';
import {getMeasurements,postTraining,getTrainings,getGoals} from '../redux/actions/trainingActions';
import HomepageTrainingItem from './homepagecomponents/HomepageTrainingItem';
import HomepageMeasurementItem from './homepagecomponents/HomepageMeasurementItem';
import HomepageGoalItem from './homepagecomponents/HomepageGoalItem';
import { useHistory } from "react-router-dom";
const Homepage = (props) => {
    const history = useHistory()
    const addNewGoals = () => {
        history.push('./addgoals')
    }
    
    const addNewTraining = () => {
        history.push('./createtraining')
    }
    
    return (
        <div className="homepage">
            <div className="homepage__title">
                Strona Domowa
            </div>
            <div className="homepage__container">
            <div className="homepage__firstcontainer">
            <div className="homepage__goalscontainer">
                <div className="homepage__goalscontainer-title">Twoje cele do zrealizowania</div>
                <div className="homepage__goalscontainer-add"><button onClick={addNewGoals}>+ Dodaj nowe cele</button></div>
                <div className="homepage__goalscontainer__elements">
                {props.goals.length>0 ? props.goals.map((goal)=><HomepageGoalItem goal={goal}/>): <p>Nie masz aktualnie żadnych celów do zrealizowania</p>}
                </div>
            </div>
            <div className="homepage__measurementcontainer">
            <HomepageMeasurementItem measurement={props.measurements}/>
            </div>
            </div>
            <div className="homepage__lasttrainingscontainer">
                <div className="homepage__lasttrainingscontainer-title">Ostatnie wykonane treningi</div>
                <div className="homepage__lasttrainingscontainer-add"><button onClick={addNewTraining}>+ Dodaj nowy trening</button></div>
                <div className="homepage__lasttrainingscontainer__container">
                    {props.trainings.length>0 ? props.trainings.map((training)=> <HomepageTrainingItem allprops={props} training={training}/>): <p>Nie wykonałeś jeszcze żadnych treningów</p>}
                </div>
            </div>
            </div>
        </div>
        
    );
};

const mapStateToProps = (state) => {
    return{
        trainings: state.training.trainings.data,
        loadedtrainings: state.training.loadedtrainings,
        measurements: state.training.measurements.data,
        goals: state.training.goals.data
    }
}
export default connect(mapStateToProps,{postLogin,getMeasurements,getTrainings,getGoals})(Homepage);     