import React from 'react';
import Logo from './Logo';
const MeasurementNotification = () => {
    return (
        <div className="measurementnotification">
            <div className="measurementnotification__logo">
            <Logo />
            <div className="measurementnotification__title">
                Właśnie zaktualizowałeś swoje pomiary
            </div>
            </div>
            <div className="measurementnotification__changes">
                <div className="measurementnotification__changes-title">Zmiany</div>
                <div className="measurementnotification__changes__elements">
                    <div className="measurementnotification__changes__elements__element">
                        <div className="measurementnotification__changes__elements__element-name"></div>
                        <div className="measurementnotification__changes__elements__element-result"></div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default MeasurementNotification;