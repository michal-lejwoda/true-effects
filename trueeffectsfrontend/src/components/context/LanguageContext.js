import React, { createContext, useCallback, useContext } from 'react';
import { useCookies } from 'react-cookie';
import webSocketClient from "../websockets/LogInTimeWebSocket";
import { useTranslation } from "react-i18next";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const { i18n } = useTranslation();
    const [cookies] = useCookies(['true_effects_token']);
    const updateLanguage = useCallback((newLanguage) => {
        console.log("updateLanguage")
        if (i18n.language !== newLanguage) {
            i18n.changeLanguage(newLanguage);
            console.log("wywolanie updateLANGUAGE")
            if (webSocketClient.socket && webSocketClient.socket.readyState === WebSocket.OPEN) {
                const token = cookies.true_effects_token;
                if (token) {
                    console.log("przed")
                    webSocketClient.send(JSON.stringify({ action: 'update_language', language: newLanguage, token }));
                    console.log("po")
                }
            } else {
                console.warn('WebSocket is not open. Language update may not be sent.');
            }
        }
    }, [cookies.true_effects_token, i18n]);

    return (
        <LanguageContext.Provider value={{ updateLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
