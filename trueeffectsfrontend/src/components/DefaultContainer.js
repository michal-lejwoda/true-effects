import {Route} from 'react-router-dom';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Settings from "./main_components/Settings";
import {loadToken, postLogoutAuth} from "../redux/actions/authenticationActions";
import Scheduler from "./main_components/Scheduler";
import Training from "./main_components/Training";
import ModifyTraining from "./main_components/ModifyTraining";
import Navbar from "./navbar_components/Navbar";
import Dimensions from "./goals_and_dimensions_components/Dimensions";
import Goals from "./goals_and_dimensions_components/Goals";
import CreateTraining from "./main_components/CreateTraining";
import Dashboard from "./main_components/Dashboard";
import {
    getCompletedGoals,
    getDimensionConfiguration,
    getDimensionConfigurationForCompare,
    getDimensions,
    getExercises,
    getGoalsToAchieve,
    getLastCompletedTrainings,
    getSingleTraining,
    getTrainings,
    getUpcomingTrainings,
    getUserDimensionsForCreate
} from '../redux/actions/trainingActions';
import {useAuth} from "./hooks/auth/useAuth";



const DefaultContainer = (props) => {
    const {} = useAuth(props.token, props.loadToken, props.postLogoutAuth, props.history)
    useEffect(() => {
        // if (props.token == null) {
        //     props.history.push('/login')
        // }
        if (props.token) {
            props.getDimensionConfiguration();
            props.getDimensions();
            props.getUserDimensionsForCreate();
            props.getDimensionConfigurationForCompare();
            props.getTrainings();
            // props.getSingleTraining(1);
            props.getGoalsToAchieve();
            props.getCompletedGoals();
            props.getUpcomingTrainings();
            props.getLastCompletedTrainings()

        }
    }, [props.token])

    return (
        <>
            <Navbar/>
            {/*{props.loadedtrainings && props.loadedgoals && props.loadedmeasurements && props.loadedexercises ? */}
            <Route exact path="/" component={Dashboard}/>
            <Route path="/goals" component={Goals}/>
            <Route path="/dimensions" component={Dimensions}/>
            <Route path="/settings" component={Settings}/>
            <Route path="/scheduler" component={Scheduler}/>
            <Route path="/training" component={Training}/>
            <Route path="/modify_training" component={ModifyTraining}/>
            <Route path="/create_training" component={CreateTraining}/>

            {/*// : <BoxLoading />}*/}
            {/*</div>*/}

        </>
    )
}
const mapStateToProps = (state) => {
    return {
        token: state.authentication.token,
    }
}

export default connect(mapStateToProps, {
    getDimensionConfiguration,
    getDimensions,
    getGoalsToAchieve,
    getCompletedGoals,
    getUserDimensionsForCreate,
    getDimensionConfigurationForCompare,
    getSingleTraining,
    getTrainings,
    getExercises,
    postLogoutAuth,
    loadToken,
    getLastCompletedTrainings,
    getUpcomingTrainings

})(DefaultContainer);