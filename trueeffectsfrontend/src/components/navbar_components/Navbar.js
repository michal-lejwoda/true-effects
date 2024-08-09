import "../../new_sass/navbar.scss"
import React, {useCallback, useEffect, useState} from "react";
import {faDumbbell} from "@fortawesome/fontawesome-free-solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {
    handleMoveToCreateTraining,
    handleMoveToDashboard,
    handleMovetoDimensions,
    handleMovetoGoals,
    handleMoveToMobileCreateTraining,
    handleMoveToMobileDashboard,
    handleMovetoMobileDimensions,
    handleMoveToMobileGoals,
    handleMoveToMobileScheduler,
    handleMoveToMobileSettings,
    handleMoveToScheduler,
    handleMovetoSettings
} from "../helpers/history_helpers";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {changeLanguage, postLogoutAuth} from "../../redux/actions/authenticationActions";
import {useCookies} from "react-cookie";
import {LANGUAGES} from "../context/languages";
import webSocketClient from "../websockets/LogInTimeWebSocket";
import {useTranslation} from "react-i18next";

const Navbar = (props) => {
    const history = useHistory()
    const {i18n, t} = useTranslation();
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [cookies, , removeCookie] = useCookies(['true_effects_token']);

    const syncLanguage = useCallback(() => {
        console.log("syncLanguage")
        if (webSocketClient.socket && webSocketClient.socket.readyState === WebSocket.OPEN) {
            const token = cookies.true_effects_token;
            if (token) {
                webSocketClient.send(JSON.stringify({action: 'update_language', language: i18n.language, token}));
            }
        } else {
            console.warn('WebSocket is not open. Language update may not be sent.');
        }
    }, [i18n.language]);

    useEffect(() => {
        syncLanguage();
    }, [syncLanguage]);

    const onChangeLanguage = (e) => {
        const data = {
            "language": e.target.value
        }
        i18n.changeLanguage(e.target.value)
        // updateLanguage(e.target.value);
        props.changeLanguage(data)
    };

    return (
        <nav className="nav_bar">
            <div className="nav_bar__toggle" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}><FontAwesomeIcon
                icon={faBars}/></div>
            <div className="nav_bar__logo"><FontAwesomeIcon icon={faDumbbell}/>TrueEffects</div>
            <ul className="nav_bar__desktop">
                {props.language_loaded && (
                    <select className="menu__language--select navbar__select"
                            value={i18n.language}
                            onChange={onChangeLanguage}>
                        {LANGUAGES.map(({code, label}) => (
                            <option key={code} value={code}>
                                {label}
                            </option>
                        ))}
                    </select>
                )}
                <li className="nav_bar__element nav_bar__desktop__element"
                    onClick={() => handleMoveToDashboard(history)}>
                    <button className="nav_bar__button">{t("Homepage")}</button>
                </li>
                <li className="nav_bar__element nav_bar__desktop__element"
                    onClick={() => handleMoveToScheduler(history)}>
                    <button className="nav_bar__button">Kalendarz treningów</button>
                </li>
                <li className="nav_bar__element nav_bar__desktop__element"
                    onClick={() => handleMoveToCreateTraining(history)}>
                    <button className="nav_bar__button">Kreator treningu</button>
                </li>
                <li className="nav_bar__element nav_bar__desktop__element" onClick={() => handleMovetoGoals(history)}>
                    <button className="nav_bar__button">Cele</button>
                </li>
                <li className="nav_bar__element nav_bar__desktop__element"
                    onClick={() => handleMovetoDimensions(history)}>
                    <button className="nav_bar__button">Pomiary</button>
                </li>
                <li className="nav_bar__element nav_bar__desktop__element"
                    onClick={() => handleMovetoSettings(history)}>
                    <button className="nav_bar__button">Ustawienia</button>
                </li>
                <li className="nav_bar__element nav_bar__desktop__element"
                    onClick={() => props.postLogoutAuth(removeCookie)}>
                    <button className="nav_bar__button">Wyloguj się</button>
                </li>
            </ul>
            <ul className="nav_bar__mobile" style={{display: isMobileNavOpen ? 'flex' : 'none'}}>
                <li className="nav_bar__element nav_bar__mobile__element"
                    onClick={() => handleMoveToMobileDashboard(history, isMobileNavOpen, setIsMobileNavOpen)}>
                    <button className="nav_bar__button">Strona Domowa
                    </button>
                </li>
                <li className="nav_bar__element nav_bar__mobile__element"
                    onClick={() => handleMoveToMobileScheduler(history, isMobileNavOpen, setIsMobileNavOpen)}>
                    <button className="nav_bar__button">Kalendarz
                        treningów
                    </button>
                </li>
                <li className="nav_bar__element nav_bar__mobile__element"
                    onClick={() => handleMoveToMobileCreateTraining(history, isMobileNavOpen, setIsMobileNavOpen)}>
                    <button className="nav_bar__button">Kreator
                        treningu
                    </button>
                </li>
                <li className="nav_bar__element nav_bar__mobile__element" onClick={() => {
                    handleMoveToMobileGoals(history, isMobileNavOpen, setIsMobileNavOpen)
                }}>
                    <button className="nav_bar__button">Cele</button>
                </li>
                <li className="nav_bar__element nav_bar__mobile__element"
                    onClick={() => handleMovetoMobileDimensions(history, isMobileNavOpen, setIsMobileNavOpen)}>
                    <button className="nav_bar__button">Pomiary</button>
                </li>
                <li className="nav_bar__element nav_bar__mobile__element"
                    onClick={() => handleMoveToMobileSettings(history, isMobileNavOpen, setIsMobileNavOpen)}>
                    <button className="nav_bar__button">Ustawienia</button>
                </li>
                {props.token &&
                    <li className="nav_bar__element nav_bar__mobile__element"
                        onClick={() => props.postLogoutAuth(removeCookie)}>
                        <button className="nav_bar__button">Wyloguj się</button>
                    </li>
                }
            </ul>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.authentication.token,
        language_loaded: state.authentication.language_loaded
    }
}

export default connect(mapStateToProps, {postLogoutAuth, changeLanguage})(Navbar);