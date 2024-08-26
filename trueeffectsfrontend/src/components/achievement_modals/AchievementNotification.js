import React from 'react';
import '../../new_sass/notification.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";

const AchievementNotification = ({message, onClose}) => {

    return (
        <div className="notification">
            <div className="notification__icon"><FontAwesomeIcon onClick={onClose} icon={faWindowClose}/></div>
            <span className="notification__message">{message}</span>
            {/*<button onClick={onClose}>Close</button>*/}
        </div>
    );
};

export default AchievementNotification;