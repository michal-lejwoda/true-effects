import React from 'react';
import '../../new_sass/notification.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faTrophy} from "@fortawesome/free-solid-svg-icons";

const AchievementNotification = ({message, onClose}) => {

    return (
        <div className="notification">
            <div className="notification__icon"><FontAwesomeIcon onClick={onClose} icon={faTimes}/></div>

            <span className="notification__message"><FontAwesomeIcon onClick={onClose} icon={faTrophy}/>{message}</span>
            {/*<button onClick={onClose}>Close</button>*/}
        </div>
    );
};

export default AchievementNotification;