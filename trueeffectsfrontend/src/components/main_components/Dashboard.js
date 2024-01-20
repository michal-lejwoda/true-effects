import React from 'react';
import {connect} from "react-redux";
import DashboardCompletedTrainings from "../dashboard_components/DashboardCompletedTrainings";
import DashboardLastDimension from "../dashboard_components/DashboardLastDimension";
import DashboardUpcomingTrainings from "../dashboard_components/DashboardUpcomingTrainings";

const Dashboard = props => {
    return (
        <div className="dashboard">
            <h1 className="dashboard__title">Dashboard</h1>
            <div className="main-information dashboard__main-information">
                <div className="main-information__upcoming-trainings"><DashboardUpcomingTrainings
                    upcomingTrainings={props.upcomingTrainings}/></div>
                <div className="main-information__completed-trainings"><DashboardCompletedTrainings
                    lastCompletedTrainings={props.lastCompletedTrainings}/></div>
                <div className="main-information__last-dimension"><DashboardLastDimension
                    userDimensions={props.userDimensions}/></div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        upcomingTrainings: state.training.upcomingTrainings,
        lastCompletedTrainings: state.training.lastCompletedTrainings,
        userDimensionConfiguration: state.training.userDimensionConfiguration,
        userDimensions: state.training.userDimensions,
        userDimensionsForCreate: state.training.userDimensionsForCreate,

    }
}
export default connect(mapStateToProps, null)(Dashboard);
