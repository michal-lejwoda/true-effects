import React from 'react';
import {connect} from "react-redux";
import DashboardCompletedTrainings from "../dashboard_components/DashboardCompletedTrainings";
import DashboardLastDimension from "../dashboard_components/DashboardLastDimension";
import DashboardUpcomingTrainings from "../dashboard_components/DashboardUpcomingTrainings";
import "../../new_sass/dashboard.scss";
import {
    createTraining,
    getLastCompletedTrainings,
    getSingleTraining,
    getUpcomingTrainings
} from "../../redux/actions/trainingActions";

const Dashboard = props => {
    return (
        <div className="dashboard">
            <h1 className="title">Strona domowa</h1>
            <div className="main-information dashboard__main-information">
                <div className="main-information__upcoming-trainings">
                    <DashboardUpcomingTrainings
                        upcomingTrainings={props.upcomingTrainings} createTraining={props.createTraining} getSingleTraining={props.getSingleTraining}
                        getUpcomingTrainings={props.getUpcomingTrainings} getLastCompletedTrainings={props.getLastCompletedTrainings}
                    />
                </div>
                <div className="main-information__completed-trainings">
                    <DashboardCompletedTrainings lastCompletedTrainings={props.lastCompletedTrainings} createTraining={createTraining}
                        getUpcomingTrainings={props.getUpcomingTrainings} getLastCompletedTrainings={props.getLastCompletedTrainings}
                    />
                </div>
                <div className="main-information__last-dimension">
                    <DashboardLastDimension userDimensions={props.userDimensions}
                                            userDimensionConfigurationForCompare={props.userDimensionConfigurationForCompare}
                    />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        upcomingTrainings: state.training.upcomingTrainings,
        lastCompletedTrainings: state.training.lastCompletedTrainings,
        userDimensionConfigurationForCompare: state.training.userDimensionConfigurationForCompare,
        userDimensions: state.training.userDimensions,
        // userDimensionsForCreate: state.training.userDimensionsForCreate,

    }
}

export default connect(mapStateToProps, {createTraining, getSingleTraining, getUpcomingTrainings, getLastCompletedTrainings})(Dashboard);
