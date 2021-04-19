import React from 'react';
import '../sass/navbar.scss';
import { useHistory } from "react-router-dom";
import SideNav, {NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faClipboardList,faWeight,faGavel,faClock } from '@fortawesome/fontawesome-free-solid';
// import { makeStyles } from '@material-ui/core/styles';
const Navbar2 = (props) => {
    const history = useHistory()
    const handleMovetoHome = () =>{
        history.push("/");
    }
    const handleMovetoScheduler = () =>{
        history.push("/schedule");
    }
    const handleMovetoCreator = () =>{
        history.push("/createtraining");
    }
    const handleMovetoMeasurements = () =>{
        history.push("/addmeasurements");
    }
    const handleMovetoAllMeasurements = () =>{
        history.push("/displaymeasurements");
    }
    const handleMovetoAddGoals = () =>{
        history.push("/addgoals");
    }
    return (
        <SideNav>
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem onClick={handleMovetoHome} eventKey="home">
                        <NavIcon >
                          <FontAwesomeIcon icon={faHome} />
                        </NavIcon>
                        <NavText>
                            Strona Domowa
                        </NavText>
                    </NavItem>
                    <NavItem onClick={handleMovetoScheduler} eventKey="clipboard">
                        <NavIcon >
                          <FontAwesomeIcon icon={faClipboardList} />
                        </NavIcon>
                        <NavText>
                            Kalendarz treningów
                        </NavText>
                    </NavItem>
                    <NavItem onClick={handleMovetoCreator} eventKey="gavel">
                        <NavIcon>
                          <FontAwesomeIcon icon={faGavel} />
                        </NavIcon>
                        <NavText>
                            Kreator trening
                        </NavText>
                    </NavItem>
                    <NavItem  onClick={handleMovetoMeasurements} eventKey="weight">
                        <NavIcon>
                         <FontAwesomeIcon icon={faWeight} />
                        </NavIcon>
                        <NavText>
                            Dodaj pomiary
                        </NavText>
                    </NavItem>
                    <NavItem onClick={handleMovetoAllMeasurements} eventKey="weightall">
                        <NavIcon>
                          <FontAwesomeIcon icon={faWeight} />
                        </NavIcon>
                        <NavText>
                            Wyświetl wszystkie pomiary
                        </NavText>
                    </NavItem>
                    <NavItem onClick={handleMovetoAddGoals} eventKey="goal">
                        <NavIcon>
                          <FontAwesomeIcon icon={faClock} />
                        </NavIcon>
                        <NavText>
                            Dodaj Cel do zrealizowania
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
    );
};

export default Navbar2;