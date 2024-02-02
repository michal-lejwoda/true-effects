import {Route} from 'react-router-dom';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Settings from "./main_components/Settings";
import {loadToken, postLogoutAuth} from "../redux/actions/authenticationActions";
import Scheduler from "./main_components/Scheduler";
import Training from "./main_components/Training";
import ModifyTraining from "./main_components/ModifyTraining";
import Navbar from "./navbar_components/Navbar";
import Dimensions from "./main_components/Dimensions";
import Goals from "./main_components/Goals";
import CreateTraining from "./main_components/CreateTraining";
import Dashboard from "./main_components/Dashboard";
import {BoxLoading} from 'react-loadingg';
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
import CheckTraining from "./main_components/CheckTraining";


const DefaultContainer = (props) => {
    useAuth(props.token, props.loadToken, props.postLogoutAuth, props.history)
    async function fetchAllData() {
        try {
            const promises = [
                props.getDimensionConfiguration(),
                props.getDimensions(),
                props.getUserDimensionsForCreate(),
                props.getDimensionConfigurationForCompare(),
                props.getTrainings(),
                props.getGoalsToAchieve(),
                props.getCompletedGoals(),
                props.getUpcomingTrainings(),
                props.getLastCompletedTrainings()
            ];
            await Promise.all(promises);

        } catch (error) {
            // #TODO Back here
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        if (props.token) {
            fetchAllData();

        }
    }, [props.token])

    return (
        <>
            <Navbar/>
            {props.token ?
                <>
                    <Route exact path="/" component={Dashboard}/>
                    <Route path="/goals" component={Goals}/>
                    <Route path="/dimensions" component={Dimensions}/>
                    <Route path="/settings" component={Settings}/>
                    <Route path="/scheduler" component={Scheduler}/>
                    {/*<Route path="/training" component={Training}/>*/}
                    <Route path="/training/:trainingId" component={Training}/>
                    <Route path="/modify_training/:trainingId" component={ModifyTraining}/>
                    <Route path="/check_training/:trainingId" component={CheckTraining}/>
                    <Route path="/create_training" component={CreateTraining}/>
                </>
                : <BoxLoading/>
            }

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