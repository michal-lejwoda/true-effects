import React from 'react';

const DashboardCompletedTrainings = (props) => {
    const handleGoToTraining = (id) => {
        console.log("handleGoToTraining Completed Trainings")
    }
    return (
        <div className="completed-trainings">
            <div className="completed-trainingss__list">
                {props.lastCompletedTrainings.map(upcoming_training => {
                    return (
                        <div className="completed-trainings__item">
                            <p className="completed-trainings__date">{upcoming_training.date}</p>
                            <p className="completed-trainings__name">{upcoming_training.name}</p>
                            <button onClick={() => handleGoToTraining(upcoming_training.id)}
                                    className="completed-trainings__button">Trenuj teraz
                            </button>
                        </div>
                    )
                })}
            </div>

        </div>
    );
};

export default DashboardCompletedTrainings;
