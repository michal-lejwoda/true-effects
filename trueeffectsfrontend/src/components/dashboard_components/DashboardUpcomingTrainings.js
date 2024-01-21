import React from 'react';

const DashboardUpcomingTrainings = (props) => {
    const handleGoToTraining = (id) => {
        console.log("handleGoToTraining")
    }
    return (
        <div className="upcoming-trainings">
            <div className="completed-trainings__title dashboard__title">Zbliżające się treningi</div>
            <div className="upcoming-trainings__list">
                {props.upcomingTrainings.length == 0 &&
                    <p className="dashboard__error-message">Nie masz jeszcze zaplanowanych żadnych treningów</p>}
                {props.upcomingTrainings.map(upcoming_training => {
                    return (
                        <div className="upcoming_training__item" key={upcoming_training.id}>
                            <div className="dashboard__buttons">
                                <button onClick={() => handleGoToTraining(upcoming_training.id)}
                                        className="upcoming_training__button dashboard__button">Trenuj teraz
                                </button>
                                <button className="upcoming_training__button dashboard__button">Sprawdź
                                </button>
                            </div>
                            <p className="upcoming_training__date dashboard__date">Data
                                Treningu: {upcoming_training.date}</p>
                            <p className="upcoming_training__name dashboard__name">Nazwa
                                Treningu: {upcoming_training.name}</p>
                            <hr/>
                        </div>

                    )
                })}
            </div>

        </div>
    );
};

export default DashboardUpcomingTrainings;
