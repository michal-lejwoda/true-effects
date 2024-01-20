import React from 'react';

const DashboardCompletedTrainings = (props) => {
    const handleGoToTraining = (id) => {
        console.log("handleGoToTraining Completed Trainings")
    }
    return (
        <div className="completed-trainings">
            <div className="completed-trainings__title">Treninigi już zrealizowane</div>
            <div className="completed-trainingss__list">
                {props.lastCompletedTrainings.map(completed_training => {
                    return (
                        <div className="completed-trainings__item" key={completed_training.id}>
                            <p className="completed-trainings__date">{completed_training.date}</p>
                            <p className="completed-trainings__name">{completed_training.name}</p>
                            <button onClick={() => handleGoToTraining(completed_training.id)}
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
