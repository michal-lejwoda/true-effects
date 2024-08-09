import React, {useEffect, useState} from 'react';
import AchievementNotification from './AchievementNotification';
import '../../new_sass/notification.scss';
import webSocketClient from "../websockets/LogInTimeWebSocket";
import {useCookies} from "react-cookie";
import {useTranslation} from "react-i18next";

const AchievementNotificationContainer = () => {
    const [notifications, setNotifications] = useState([]);
    const [token, setToken] = useState(null);
    const [cookies] = useCookies(['true_effects_token']);
    const {i18n} = useTranslation();
    useEffect(() => {
        if (cookies.true_effects_token) {
            setToken(cookies.true_effects_token);
        }
    }, [cookies]);

    useEffect(() => {
        if (token) {
            webSocketClient.connect(token, i18n.language)
                .then(() => {
                    webSocketClient.addOnMessageCallback(handleNewMessage);
                })
                .catch(error => console.error('WebSocket connection error:', error));
            return () => {
                webSocketClient.close();
            };
        }
    }, [token]);

    const handleNewMessage = (data) => {
        setNotifications((prevNotifications) => [...prevNotifications, data.message]);
    };

    const removeNotification = (index) => {
        setNotifications((prevNotifications) => prevNotifications.filter((_, i) => i !== index));
    };

    return (
        <div className="notification-container">
            {notifications.map((message, index) => (
                <AchievementNotification
                    key={index}
                    message={message}
                    onClose={() => removeNotification(index)}
                />
            ))}
        </div>
    );
};

export default AchievementNotificationContainer;
