import React from 'react';
import {handleMoveToModifyTraining, handleMoveToTraining} from "../helpers/history_helpers";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";

const DashboardCompletedTrainings = (props) => {
    const {t} = useTranslation();
    const history = useHistory()
    const handleGoToTraining = (id) => {
        props.getSingleTraining(id)
            .then((training) => {
                let date = new Date()
                let res = date.toISOString().split('T')[0]
                if (training.date === res) {
                    handleMoveToTraining(history, id)
                } else {
                    let data = training
                    data.date = res
                    props.createTraining(data)
                        .then((res) => {
                            props.getUpcomingTrainings()
                            props.getLastCompletedTrainings()
                            props.getTrainings()
                            handleMoveToTraining(history, res.id)
                        })
                }
            })
    }
    return (
        <div className="completed-trainings">
            <div className="completed-trainings__title dashboard__title">{t("Trainings completed")}</div>
            <div className="completed-trainings__list">
                {props.lastCompletedTrainings.length === 0 && <p className="dashboard__error-message">{t("You haven't completed any training yet")}</p>}
                {props.lastCompletedTrainings.map(completed_training => {
                    return (
                        <div className="completed-trainings__item" key={completed_training.id}>
                            <div className="dashboard__buttons">
                                <button onClick={() => handleGoToTraining(completed_training.id)}
                                        className="completed-trainings__button dashboard__button">{t("Train again now")}
                                </button>
                                <button
                                    className="completed-trainings__button dashboard__button"
                                    onClick={()=>handleMoveToModifyTraining(history, completed_training.id)}
                                >{t("Check")}

                                </button>
                            </div>
                            <p className="completed-trainings__date dashboard__date">{t("Training Date")}: {completed_training.date}</p>
                            <p className="completed-trainings__name dashboard__name">{t("Training Name")}: {completed_training.name}</p>
                            <hr/>
                        </div>
                    )
                })}
            </div>

        </div>
    );
};

export default DashboardCompletedTrainings;
