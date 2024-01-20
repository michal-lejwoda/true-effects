import React from 'react';

const DashboardLastDimension = (props) => {
    return (
        <div className="last-dimension">
            <div className="last-dimension__title dashboard__title">Ostatni pomiar</div>
            {props.userDimensions.length > 0 ?
                Object.keys(props.userDimensionConfigurationForCompare).map(element => {
                    return (
                        <div key={element}>
                            <div className="animatedInput">
                                <input
                                    defaultValue={props.userDimensions[0][element]}
                                    type="text" disabled="true"/>
                                <span>{props.userDimensionConfigurationForCompare[element]}</span>
                            </div>
                        </div>
                    )
                }) : <p className="dashboard__error-message">Nie masz jeszcze żadnych pomiarów</p>}
        </div>
    );
};

export default DashboardLastDimension;
