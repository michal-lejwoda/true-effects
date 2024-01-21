import {useCookies} from "react-cookie";
import {useEffect} from "react";

export const useAuth = (token, loadToken, postLogoutAuth, history) => {
    const [cookies, setCookie, removeCookie] = useCookies(['true_effects_token']);

    useEffect(() => {
        if (cookies.true_effects_token !== undefined) {
            return loadToken(cookies.true_effects_token)
        } else if (token !== null) {
            return setCookie('true_effects_token', token)
        } else if (token === null) {
            history.push('/login')
        }


        // else {
        //     history.push('/login')
        // }
    }, [token])
    return {cookies, setCookie, removeCookie}
}