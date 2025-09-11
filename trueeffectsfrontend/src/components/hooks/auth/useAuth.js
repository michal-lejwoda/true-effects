import {useCookies} from "react-cookie";
import {useEffect, useCallback, useRef} from "react";
import {useNavigate} from "react-router-dom";
import webSocketClient from "../../websockets/LogInTimeWebSocket";

export const useAuth = (token, loadToken) => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['true_effects_token']);
    const initialized = useRef(false);
    const lastTokenRef = useRef(token);

    const redirectToLogin = useCallback(() => {
        removeCookie('true_effects_token', { path: '/' });
        if (webSocketClient && webSocketClient.close) {
            webSocketClient.close();
        }
        navigate('/login');
    }, [removeCookie, navigate]);

    useEffect(() => {
        if (initialized.current) return;
        if (!token && cookies.true_effects_token) {
            loadToken(cookies.true_effects_token);
        } else if (!token && !cookies.true_effects_token) {
            redirectToLogin();
        }

        initialized.current = true;
        lastTokenRef.current = token;
    }, []);

    useEffect(() => {
        if (!initialized.current) return;
        if (lastTokenRef.current === token) return;
        if (token) {
            setCookie('true_effects_token', token, {
                path: '/',
                maxAge: 24 * 60 * 60
            });
        } else {
            redirectToLogin();
        }

        lastTokenRef.current = token;
    }, [token]);

    return {
        logout: redirectToLogin
    };
};