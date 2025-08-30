import React, {useEffect, useRef, useState} from 'react';
import AchievementNotification from './AchievementNotification';
import '../../new_sass/notification.scss';
import webSocketClient from "../websockets/LogInTimeWebSocket";
import {useCookies} from "react-cookie";
import {useTranslation} from "react-i18next";
import {postConfirmAchievement} from "../../redux/actions/authenticationActions";
import {connect} from "react-redux";

const AchievementNotificationContainer = (props) => {
    const [notifications, setNotifications] = useState([]);
    const [token, setToken] = useState(null);
    const [cookies] = useCookies(['true_effects_token']);
    const {i18n} = useTranslation();
    const websocketRef = useRef(null);
    const callbackRegistered = useRef(false);

    const confirmAchievement = (user_achievement_id) => {
        try {
            props.postConfirmAchievement(user_achievement_id);
        } catch (error) {}
    };

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
                        websocketRef.current.close();
                        websocketRef.current.removeAllCallbacks();
                    }
                    await webSocketClient.connect(token, i18n.language);

                    websocketRef.current = webSocketClient;

                    if (!callbackRegistered.current) {

                        websocketRef.current.addOnMessageCallback(handleNewMessage);
                        callbackRegistered.current = true;
                    }
                } catch (error) {}
            };

            connectWebSocket();

            return () => {
                if (websocketRef.current) {
                    websocketRef.current.close();
                    websocketRef.current.removeAllCallbacks();
                    websocketRef.current = null;
                }
                callbackRegistered.current = false;
            };
        }
    }, [token, i18n.language]);

    const handleNewMessage = async (data) => {
        await setNotifications((prevNotifications) => [...prevNotifications, data.message]);
        await confirmAchievement(data.user_achievement_id);
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

export default connect(null, {postConfirmAchievement})(AchievementNotificationContainer);
