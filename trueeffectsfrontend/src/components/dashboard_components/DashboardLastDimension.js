import React from 'react';
import {handleMovetoDimensions} from "../helpers/history_helpers";
import {useHistory} from "react-router-dom";

const DashboardLastDimension = (props) => {
    const history = useHistory()
    return (
        <div className="last-dimension">
            <div className="last-dimension__title dashboard__title">Ostatni pomiar</div>
            <div className="last-dimension__button dashboard__buttons">
                <button onClick={() => handleMovetoDimensions(history)}
                        className="upcoming_training__button dashboard__button">Przejdź do pomiarów
                </button>
            </div>
            {props.userDimensions.length > 0 ?
                Object.keys(props.userDimensionConfigurationForCompare).map(element => {
                    return (
                        <div key={element}>
                            <div className="animatedInput">
                                <input
                                    defaultValue={props.userDimensions[0][element]}
                                    type="text" disabled={true}/>
                                <span>{props.userDimensionConfigurationForCompare[element]}</span>
                            </div>
                        </div>
                    )
                }) : <p className="dashboard__error-message">Nie masz jeszcze żadnych pomiarów</p>}
        </div>
    );
};

export default DashboardLastDimension;
