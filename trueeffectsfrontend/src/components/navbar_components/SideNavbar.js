import React from 'react';
import '../../sass/navbar.scss';
import {useHistory} from "react-router-dom";
import SideNav, {NavIcon, NavItem, NavText} from '@trendmicro/react-sidenav';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClipboardList, faClock, faGavel, faHome, faWeight} from '@fortawesome/fontawesome-free-solid';
import {
    handleMovetoAddGoals,
    handleMovetoAllMeasurements, handleMoveToCreateTraining,
    handleMovetoCreator, handleMovetoGoalsAndDimensions,
    handleMovetoHome,
    handleMovetoMeasurements, handleMoveToModifyTraining, handleMoveToScheduler,
    handleMovetoScheduler, handleMovetoSettings
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
                <NavItem onClick={()=>handleMoveToScheduler(history)} eventKey="clipboard">
                    <NavIcon>
                        <FontAwesomeIcon icon={faClipboardList}/>
                    </NavIcon>
                    <NavText>
                        Kalendarz treningów v2
                    </NavText>
                </NavItem>
                <NavItem onClick={()=>handleMovetoGoalsAndDimensions(history)} eventKey="weightall">
                    <NavIcon>
                        <FontAwesomeIcon icon={faWeight}/>
                    </NavIcon>
                    <NavText>
                        Cele i pomiary
                    </NavText>
                </NavItem>
                <NavItem onClick={()=>handleMovetoAddGoals(history)} eventKey="goal">
                    <NavIcon>
                        <FontAwesomeIcon icon={faClock}/>
                    </NavIcon>
                    <NavText>
                        Cele
                    </NavText>
                </NavItem>
                <NavItem onClick={()=>handleMovetoSettings(history)} eventKey="settings">
                    <NavIcon>
                        <FontAwesomeIcon icon={faClock}/>
                    </NavIcon>
                    <NavText>
                        Ustawienia
                    </NavText>

                </NavItem>
                <NavItem onClick={()=>handleMoveToModifyTraining(history)} eventKey="settings">
                    <NavIcon>
                        <FontAwesomeIcon icon={faWeight}/>
                    </NavIcon>
                    <NavText>
                        Modyfikuj Trening
                    </NavText>

                </NavItem>
                <NavItem onClick={()=>handleMoveToCreateTraining(history)} eventKey="settings">
                    <NavIcon>
                        <FontAwesomeIcon icon={faWeight}/>
                    </NavIcon>
                    <NavText>
                        Create Training
                    </NavText>

                </NavItem>

            </SideNav.Nav>
        </SideNav>
    );
};

export default SideNavbar;