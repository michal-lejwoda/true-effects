import React from 'react';

const DashboardUpcomingTrainings = (props) => {
    const handleGoToTraining = (id) =>{
        console.log("handleGoToTraining")
    }
    return (
        <div className="upcoming-trainings">
            <div className="completed-trainings__title">Zbliżające się treningi</div>
            <div className="upcoming-trainings__list">
                {props.upcomingTrainings.map(upcoming_training => {
                    return (
                        <div className="upcoming_training__item" key={upcoming_training.id}>
                            <p className="upcoming_training__date">{upcoming_training.date}</p>
                            <p className="upcoming_training__name">{upcoming_training.name}</p>
                            <button onClick={()=>handleGoToTraining(upcoming_training.id)} className="upcoming_training__button">Trenuj teraz</button>
                        </div>

                    )
                })}
            </div>

        </div>
    );
};

export default DashboardUpcomingTrainings;
