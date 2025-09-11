import {useCookies} from "react-cookie";
import {useEffect, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import webSocketClient from "../../websockets/LogInTimeWebSocket";

export const useAuth = (token, loadToken) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['true_effects_token']);

    const redirectToLogin = useCallback(() => {
        dispatch({ type: 'POST_LOGOUT_AUTH' });

        removeCookie('true_effects_token', { path: '/' });
        if (webSocketClient && webSocketClient.close) {
            webSocketClient.close();
        }
        navigate('/login');
    }, [dispatch, removeCookie, navigate]);

    useEffect(() => {
        if (token) {
            if (!cookies.true_effects_token) {
                console.log('Cookie zostało usunięte - czyszczę token z Redux');
                dispatch({ type: 'POST_LOGOUT_AUTH' });
                return;
            }

            if (cookies.true_effects_token !== token) {
                setCookie('true_effects_token', token, { path: '/', maxAge: 24 * 60 * 60 });
            }
            return;
        }

        if (cookies.true_effects_token) {
            console.log('Ładuję token z cookie do Redux');
            loadToken(cookies.true_effects_token);
            return;
        }

        redirectToLogin();

    }, [token, cookies.true_effects_token, setCookie, loadToken, redirectToLogin]);

    return { logout: redirectToLogin };
};