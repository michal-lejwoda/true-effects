import React, {useEffect, useState} from 'react';
import AchievementNotification from './AchievementNotification';
// import webSocketClient from './webSocketClient';
import '../../new_sass/notification.scss'
import webSocketClient from "../websockets/LogInTimeWebSocket";
import {useCookies} from "react-cookie";
import {useLanguage} from "../context/LanguageContext";

const AchievementNotificationContainer = () => {
    const [notifications, setNotifications] = useState([]);
    const [cookies] = useCookies(['true_effects_token']);
    const { language } = useLanguage()

    useEffect(() => {
        const token = cookies.true_effects_token;

        webSocketClient.connect(token, language)
            .then(() => {
                webSocketClient.addOnMessageCallback(handleNewMessage);
            })
            .catch(error => console.error('WebSocket connection error:', error));

        return () => {
            webSocketClient.close();
        };
    }, []);

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
