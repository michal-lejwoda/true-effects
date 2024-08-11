import React, { useEffect, useState, useRef } from 'react';
import AchievementNotification from './AchievementNotification';
import '../../new_sass/notification.scss';
import webSocketClient from "../websockets/LogInTimeWebSocket";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";

const AchievementNotificationContainer = () => {
    const [notifications, setNotifications] = useState([]);
    const [token, setToken] = useState(null);
    const [cookies] = useCookies(['true_effects_token']);
    const { i18n } = useTranslation();
    const websocketRef = useRef(null);
    const callbackRegistered = useRef(false);

    useEffect(() => {
        if (cookies.true_effects_token) {
            setToken(cookies.true_effects_token);
        }
    }, [cookies]);

    useEffect(() => {
        if (token) {
            const connectWebSocket = async () => {
                try {
                    if (websocketRef.current) {
                        console.log("Closing existing WebSocket connection");
                        websocketRef.current.close();
                        websocketRef.current.removeAllCallbacks();
                    }

                    await webSocketClient.connect(token, i18n.language);

                    websocketRef.current = webSocketClient;

                    if (!callbackRegistered.current) {
                        console.log("Registering new callback");
                        websocketRef.current.addOnMessageCallback(handleNewMessage);
                        callbackRegistered.current = true;
                    }
                } catch (error) {
                    console.error('WebSocket connection error:', error);
                }
            };

            connectWebSocket();

            return () => {
                console.log("Cleaning up WebSocket");
                if (websocketRef.current) {
                    websocketRef.current.close();
                    websocketRef.current.removeAllCallbacks();
                    websocketRef.current = null;
                }
                callbackRegistered.current = false;
            };
        }
    }, [token, i18n.language]);

    const handleNewMessage = (data) => {
        console.log("Handling new message:", data);
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
