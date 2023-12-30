import React from 'react';
import '../../sass/navbar.scss';
import {useHistory} from "react-router-dom";
import SideNav, {NavIcon, NavItem, NavText} from '@trendmicro/react-sidenav';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClipboardList, faClock, faGavel, faHome, faWeight} from '@fortawesome/fontawesome-free-solid';
import {
    handleMovetoAddGoals,
    handleMovetoAllMeasurements,
    handleMovetoCreator,
    handleMovetoHome,
    handleMovetoMeasurements,
    handleMovetoScheduler
} from "../helpers/history_helpers";
const SideNavbar = () => {
    const history = useHistory()
    return (
        <SideNav>
            <SideNav.Toggle/>
            <SideNav.Nav defaultSelected="home">
                <NavItem onClick={()=>handleMovetoHome(history)} eventKey="home">
                    <NavIcon>
                        <FontAwesomeIcon icon={faHome}/>
                    </NavIcon>
                    <NavText>
                        Strona Domowa
                    </NavText>
                </NavItem>
                <NavItem onClick={()=>handleMovetoScheduler(history)} eventKey="clipboard">
                    <NavIcon>
                        <FontAwesomeIcon icon={faClipboardList}/>
                    </NavIcon>
                    <NavText>
                        Kalendarz treningów
                    </NavText>
                </NavItem>
                <NavItem onClick={()=>handleMovetoCreator(history)} eventKey="gavel">
                    <NavIcon>
                        <FontAwesomeIcon icon={faGavel}/>
                    </NavIcon>
                    <NavText>
                        Kreator trening
                    </NavText>
                </NavItem>
                <NavItem onClick={()=>handleMovetoMeasurements(history)} eventKey="weight">
                    <NavIcon>
                        <FontAwesomeIcon icon={faWeight}/>
                    </NavIcon>
                    <NavText>
                        Dodaj pomiary
                    </NavText>
                </NavItem>
                <NavItem onClick={()=>handleMovetoAllMeasurements(history)} eventKey="weightall">
                    <NavIcon>
                        <FontAwesomeIcon icon={faWeight}/>
                    </NavIcon>
                    <NavText>
                        Wyświetl wszystkie pomiary
                    </NavText>
                </NavItem>
                <NavItem onClick={()=>handleMovetoAddGoals(history)} eventKey="goal">
                    <NavIcon>
                        <FontAwesomeIcon icon={faClock}/>
                    </NavIcon>
                    <NavText>
                        Dodaj Cel do zrealizowania
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    );
};

export default SideNavbar;