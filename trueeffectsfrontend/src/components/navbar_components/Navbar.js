import "../../new_sass/navbar.scss"
import React, {useState} from "react";
import {faDumbbell} from "@fortawesome/fontawesome-free-solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {
    handleMoveToCreateTraining,
    handleMovetoDimensions,
    handleMovetoGoals,
    handleMoveToMobileCreateTraining,
    handleMovetoMobileDimensions,
    handleMoveToMobileGoals,
    handleMoveToMobileScheduler,
    handleMoveToMobileSettings,
    handleMoveToScheduler,
    handleMovetoSettings
} from "../helpers/history_helpers";
import {useHistory} from "react-router-dom";

const Navbar = () => {
    const history = useHistory()
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    return (
        <nav className="nav_bar">
            <div className="nav_bar__toggle" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}><FontAwesomeIcon
                icon={faBars}/></div>
            <div className="nav_bar__logo"><FontAwesomeIcon icon={faDumbbell}/>TrueEffects</div>
            <ul className="nav_bar__desktop">
                <li className="nav_bar__element nav_bar__desktop__element"
                    onClick={() => handleMoveToScheduler(history)}><a>Kalendarz treningów</a></li>
                <li className="nav_bar__element nav_bar__desktop__element"
                    onClick={() => handleMoveToCreateTraining(history)}><a>Kreator treningu</a></li>
                <li className="nav_bar__element nav_bar__desktop__element" onClick={() => handleMovetoGoals(history)}>
                    <a>Cele</a></li>
                <li className="nav_bar__element nav_bar__desktop__element"
                    onClick={() => handleMovetoDimensions(history)}><a>Pomiary</a></li>
                <li className="nav_bar__element nav_bar__desktop__element"
                    onClick={() => handleMovetoSettings(history)}><a>Ustawienia</a></li>
            </ul>
            <ul className="nav_bar__mobile" style={{display: isMobileNavOpen ? 'flex' : 'none'}}>
                <li className="nav_bar__element nav_bar__mobile__element"
                    onClick={() => handleMoveToMobileScheduler(history, isMobileNavOpen, setIsMobileNavOpen)}><a>Kalendarz
                    treningów</a></li>
                <li className="nav_bar__element nav_bar__mobile__element"
                    onClick={() => handleMoveToMobileCreateTraining(history, isMobileNavOpen, setIsMobileNavOpen)}><a>Kreator
                    treningu</a></li>
                <li className="nav_bar__element nav_bar__mobile__element" onClick={() => {
                    handleMoveToMobileGoals(history, isMobileNavOpen, setIsMobileNavOpen)
                }}><a>Cele</a></li>
                <li className="nav_bar__element nav_bar__mobile__element"
                    onClick={() => handleMovetoMobileDimensions(history, isMobileNavOpen, setIsMobileNavOpen)}>
                    <a>Pomiary</a></li>
                <li className="nav_bar__element nav_bar__mobile__element"
                    onClick={() => handleMoveToMobileSettings(history, isMobileNavOpen, setIsMobileNavOpen)}>
                    <a>Ustawienia</a></li>
            </ul>
        </nav>
    )
}

export default Navbar;