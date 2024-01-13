import "../../new_sass/navbar.scss"
import React, {useState} from "react";
import {faDumbbell, faWeight} from "@fortawesome/fontawesome-free-solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {handleMoveToCreateTraining, handleMoveToScheduler} from "../helpers/history_helpers";
import {useHistory} from "react-router-dom";
const Navbar = () =>{
    const history = useHistory()
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    console.log(isMobileNavOpen)

    return (
        <nav className="nav_bar">
            <div className="nav_bar__toggle" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}><FontAwesomeIcon icon={faBars}/></div>
            <div className="nav_bar__logo"><FontAwesomeIcon icon={faDumbbell}/>TrueEffects</div>
            <ul className="nav_bar__desktop">
                <li className="nav_bar__element nav_bar__desktop__element"><a>Kalendarz treningów</a></li>
                <li className="nav_bar__element nav_bar__desktop__element" onClick={()=>handleMoveToCreateTraining(history)}><a>Kreator treningu</a></li>
                <li className="nav_bar__element nav_bar__desktop__element"><a>Cele</a></li>
                <li className="nav_bar__element nav_bar__desktop__element"><a>Pomiary</a></li>
                <li className="nav_bar__element nav_bar__desktop__element"><a>Ustawienia</a></li>
            </ul>
            <ul className="nav_bar__mobile" style={{ display: isMobileNavOpen ? 'flex' : 'none' }}>
                <li className="nav_bar__element nav_bar__mobile__element" onClick={()=>handleMoveToScheduler(history)} ><a>Kalendarz treningów</a></li>
                <li className="nav_bar__element nav_bar__mobile__element" onClick={()=>handleMoveToCreateTraining(history)}><a>Kreator treningu</a></li>
                <li className="nav_bar__element nav_bar__mobile__element" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}><a>Cele</a></li>
                <li className="nav_bar__element nav_bar__mobile__element"><a>Pomiary</a></li>
                <li className="nav_bar__element nav_bar__mobile__element"><a>Ustawienia</a></li>
            </ul>
        </nav>
    )
}

export default Navbar;