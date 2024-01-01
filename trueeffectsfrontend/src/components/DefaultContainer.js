import {Route} from 'react-router-dom';
import React, {useEffect} from 'react';
import Training from './Training';
import Schedule from './Schedule';
import Homepage from './Homepage';
import AddGoals from './AddGoals';
import {connect} from 'react-redux';
import {
    getDimensionConfiguration,
    getExercises,
    getGoals,
    getMeasurements,
    getTrainings
} from '../redux/actions/trainingActions';
import {postLogoutAuth} from '../redux/actions/authenticationActions';
import DisplayMeasurements from './DisplayMeasurements'
import AddMeasurements from './AddMeasurements';
import CreateTraining from './CreateTraining';
import '../sass/defaultcontainer.scss';
import AddMeasurementsSummary from './AddMeasurementsSummary';
import UpperNavbar from "./navbar_components/UpperNavbar";
import SideNavbar from "./navbar_components/SideNavbar";
import Goals from "./goals_and_dimensions_components/Goals";
import {GoalsAndDimensions} from "./main_components/GoalsAndDimensions";
import Settings from "./main_components/Settings";

const DefaultContainer = (props) => {
    useEffect(() => {
      if (props.token === "undefined") {
        props.postLogoutAuth()
      } else if (props.token) {

        // props.getMeasurements();
        props.getDimensionConfiguration();
        // props.getTrainings();
        // props.getGoals();
        // props.getExercises();
      } else {
        props.history.push('/login')
      }
    }, [])
    //
    // useEffect(() => {
    //   if (props.token === null) {
    //     props.history.push('/login')
    //   }
    // }, [props.token])
    return (
        <div className="containerdefault">
            {/*{props.loadedtrainings && props.loadedgoals && props.loadedmeasurements && props.loadedexercises ? */}
            <>
                <UpperNavbar/>
                <SideNavbar/>
                <Route exact path="/" component={Homepage}/>
                <Route path="/training" component={Training}/>
                <Route path="/schedule" component={Schedule}/>
                <Route path="/addmeasurements" component={AddMeasurements}/>
                <Route path="/displaymeasurements" component={DisplayMeasurements}/>
                <Route path="/createtraining" component={CreateTraining}/>
                <Route path="/measurementsummary" component={AddMeasurementsSummary}/>
                <Route path="/addgoals" component={AddGoals}/>
                <Route path="/goals_and_dimensions" component={GoalsAndDimensions}/>
                <Route path="/settings" component={Settings}/>

            </>
            {/*// : <BoxLoading />}*/}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        token: state.authentication.token,
        loadedtrainings: state.training.loadedtrainings,
        loadedmeasurements: state.training.loadedmeasurements,
        loadedgoals: state.training.loadedgoals,
        loadedexercises: state.training.loadedexercises
    }
}

export default connect(mapStateToProps, {
    getDimensionConfiguration,
    getMeasurements,
    getTrainings,
    getGoals,
    getExercises,
    postLogoutAuth
})(DefaultContainer);