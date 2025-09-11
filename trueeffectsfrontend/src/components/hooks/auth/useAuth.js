import {useCookies} from "react-cookie";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import webSocketClient from "../../websockets/LogInTimeWebSocket";

export const useAuth = (token, loadToken) => {
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['true_effects_token']);

    useEffect(() => {
    if (token === null) {
        removeCookie('true_effects_token', { path: '/' });
        if (webSocketClient) webSocketClient.close();
        navigate('/login');
    } else if (cookies.true_effects_token) {
        loadToken(cookies.true_effects_token);
    } else if (token) {
        setCookie('true_effects_token', token, { path: '/' });
    } else {
        navigate('/login');
    }
}, [token, cookies.true_effects_token]);
}