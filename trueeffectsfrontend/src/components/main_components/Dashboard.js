import React from 'react';
import { connect } from "react-redux";
import DashboardCompletedTrainings from "../dashboard_components/DashboardCompletedTrainings";
import DashboardLastDimension from "../dashboard_components/DashboardLastDimension";
import DashboardUpcomingTrainings from "../dashboard_components/DashboardUpcomingTrainings";
import "../../new_sass/dashboard.scss";
import {
    createTraining,
    getLastCompletedTrainings,
    getSingleTraining,
    getTrainings,
    getUpcomingTrainings
} from "../../redux/actions/trainingActions";
import { useTranslation } from "react-i18next";
import { BoxLoading } from "react-loadingg";

const Dashboard = props => {
    const { t } = useTranslation();
    const isDataLoaded = props.upcomingTrainingsLoaded && props.lastCompletedTrainingsLoaded && props.userDimensionsLoaded;

    return (
        !isDataLoaded ? (
            <BoxLoading />
        ) : (
            <div className="dashboard">
                <h1 className="title">{t("Homepage")}</h1>
                <div className="main-information dashboard__main-information">
                    <div className="main-information__upcoming-trainings">
                        <DashboardUpcomingTrainings
                            upcomingTrainings={props.upcomingTrainings} createTraining={props.createTraining}
                            getSingleTraining={props.getSingleTraining}
                            getUpcomingTrainings={props.getUpcomingTrainings}
                            getLastCompletedTrainings={props.getLastCompletedTrainings}
                            getTrainings={props.getTrainings}
                        />
                    </div>
                    <div className="main-information__completed-trainings">
                        <DashboardCompletedTrainings lastCompletedTrainings={props.lastCompletedTrainings}
                                                     createTraining={props.createTraining}
                                                     getSingleTraining={props.getSingleTraining}
                                                     getUpcomingTrainings={props.getUpcomingTrainings}
                                                     getLastCompletedTrainings={props.getLastCompletedTrainings}
                                                     getTrainings={props.getTrainings}
                        />
                    </div>
                    <div className="main-information__last-dimension">
                        <DashboardLastDimension userDimensions={props.userDimensions}
                                                userDimensionConfigurationForCompare={props.userDimensionConfigurationForCompare}
                        />
                    </div>
                </div>
            </div>
        )
    );
};

const mapStateToProps = (state) => {
    return {
        upcomingTrainings: state.training.upcomingTrainings,
        lastCompletedTrainings: state.training.lastCompletedTrainings,
        userDimensionConfigurationForCompare: state.training.userDimensionConfigurationForCompare,
        userDimensions: state.training.userDimensions,
        lastCompletedTrainingsLoaded: state.training.lastCompletedTrainingsLoaded,
        upcomingTrainingsLoaded: state.training.upcomingTrainingsLoaded,
        userDimensionsLoaded: state.training.userDimensionsLoaded
    };
};

export default connect(mapStateToProps, {
    createTraining,
    getSingleTraining,
    getUpcomingTrainings,
    getLastCompletedTrainings,
    getTrainings
})(Dashboard);
