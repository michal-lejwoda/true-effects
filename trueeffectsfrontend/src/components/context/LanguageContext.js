import React, { createContext, useState, useContext, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import webSocketClient from "../websockets/LogInTimeWebSocket";
import {useTranslation} from "react-i18next";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const {i18n} = useTranslation();
    const [cookies] = useCookies(['true_effects_token']);
    const [language, setLanguage] = useState("en");

    const updateLanguage = useCallback((newLanguage) => {
        setLanguage(newLanguage);
        if (webSocketClient.socket && webSocketClient.socket.readyState === WebSocket.OPEN) {
            const token = cookies.true_effects_token;
            if (token) {
                console.log("wysyła")
                webSocketClient.send(JSON.stringify({ action: 'update_language', language: newLanguage, token }));
            }
        }
    }, [cookies.token]);

    return (
        <LanguageContext.Provider value={{ language, updateLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
