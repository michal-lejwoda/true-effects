import React from 'react';
import {handleMovetoDimensions} from "../helpers/history_helpers";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";

const DashboardLastDimension = (props) => {
    const history = useHistory()
    const {t} = useTranslation();
    return (
        <div className="last-dimension">
            <div className="last-dimension__title dashboard__title">{t("Last body measurement")}</div>
            <div className="last-dimension__button dashboard__buttons">
                <button onClick={() => handleMovetoDimensions(history)}
                        className="upcoming_training__button dashboard__button">{t("Go to Measurements")}
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
                }) : <p className="dashboard__error-message">{t("You don't have any measurements yet")}</p>}
        </div>
    );
};

export default DashboardLastDimension;
