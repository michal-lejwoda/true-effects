import React from 'react';
import {useNavigate} from "react-router-dom";
import {handleMoveToModifyTraining, handleMoveToTraining} from "../helpers/history_helpers";
import {useTranslation} from "react-i18next";

const DashboardUpcomingTrainings = (props) => {
    const {t} = useTranslation();
    const navigate = useNavigate()
    const handleGoToTraining = (id) => {
        props.getSingleTraining(id)
            .then((training) => {
                let date = new Date()
                let res = date.toISOString().split('T')[0]
                if (training.date === res) {
                    handleMoveToTraining(navigate, id)
                } else {
                    let data = training
                    data.date = res
                    props.createTraining(data)
                        .then((res) => {
                            props.getUpcomingTrainings()
                            props.getLastCompletedTrainings()
                            props.getTrainings()
                            handleMoveToTraining(navigate, res.id)
                        })
                }
            })
    }
    return (
        <div className="upcoming-trainings">
            <div className="completed-trainings__title dashboard__title">{t("Upcoming trainings")}</div>
            <div className="upcoming-trainings__list">
                {props.upcomingTrainings.length === 0 &&
                    <p className="dashboard__error-message">{t("You don't have any training planned yet")}</p>}
                {props.upcomingTrainings.map(upcoming_training => {
                    return (
                        <div className="upcoming_training__item" key={upcoming_training.id}>
                            <div className="dashboard__buttons">
                                <button onClick={() => handleGoToTraining(upcoming_training.id)}
                                        className="upcoming_training__button dashboard__button">{t("Train now")}
                                </button>
                                <button className="upcoming_training__button dashboard__button"
                                        onClick={() => handleMoveToModifyTraining(navigate, upcoming_training.id)}
                                >{t("Check")}
                                </button>
                            </div>
                            <p className="upcoming_training__date dashboard__date">
                                {t("Training Date")}: {upcoming_training.date}</p>
                            <p className="upcoming_training__name dashboard__name">{t("Training Name")}: {upcoming_training.name}</p>
                            <hr/>
                        </div>

                    )
                })}
            </div>

        </div>
    );
};

export default DashboardUpcomingTrainings;
