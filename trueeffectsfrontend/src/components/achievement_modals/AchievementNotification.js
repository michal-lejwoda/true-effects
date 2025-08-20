import React from 'react';
import '../../new_sass/notification.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faTrophy} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";

const AchievementNotification = ({message, onClose}) => {
    const {t} = useTranslation();
    return (
        <div className="notification">
            <div className="notification__icon"><FontAwesomeIcon onClick={onClose} icon={faTimes}/></div>

            <span className="notification__message"><FontAwesomeIcon onClick={onClose} icon={faTrophy}/>{t(message)}</span>
            {/*<button onClick={onClose}>Close</button>*/}
        </div>
    );
};

export default AchievementNotification;