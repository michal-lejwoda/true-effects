import {Route} from 'react-router-dom';
import React, {useEffect} from 'react';
import Training from './Training';
import Schedule from './Schedule';
import Homepage from './Homepage';
import AddGoals from './AddGoals';
import {connect} from 'react-redux';

import {
    getDimensionConfiguration, getDimensionConfigurationForCompare, getDimensions,
    getExercises,
    getGoals,
    getMeasurements,
    getTrainings, getUserDimensionsForCreate
} from '../redux/actions/trainingActions';
// import {loadToken, postLogoutAuth} from '../redux/actions/authenticationActions';
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
import {useCookies} from "react-cookie";
import {loadToken, postLogoutAuth} from "../redux/actions/authenticationActions";

const DefaultContainer = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['true_effects_token']);
    useEffect(() => {
        if (cookies.true_effects_token !== undefined) {
            props.loadToken(cookies.true_effects_token)
            props.getDimensionConfiguration();
            props.getDimensions();
            props.getUserDimensionsForCreate();
            props.getDimensionConfigurationForCompare()
        }else{
            props.postLogoutAuth(removeCookie)
            props.history.push('/login')
        }
    }, [])

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
    getDimensions,
    getUserDimensionsForCreate,
    getDimensionConfigurationForCompare,
    getMeasurements,
    getTrainings,
    getGoals,
    getExercises,
    postLogoutAuth,
    loadToken,
})(DefaultContainer);