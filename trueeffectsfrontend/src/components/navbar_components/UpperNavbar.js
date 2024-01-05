import React from 'react';
import '../../sass/navbar.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDumbbell} from '@fortawesome/fontawesome-free-solid';
import {connect} from 'react-redux';
import {logoutUser, postLogout} from '../../redux/actions/authenticationActions';
import {useCookies} from "react-cookie";

const UpperNavbar = (props) => {
    const [cookies, setCookies, removeCookie] = useCookies(['true_effects_token']);
    const handleRemoveToken = () =>{
        removeCookie('true_effects_token');
    }
    const handleLogout = async () => {
        await props.logoutUser(handleRemoveToken)
    }

    return (
        <div className="navbar__root">
            <AppBar
                className="navbar__bar"
                position="static"
            >
                <Toolbar>
                    <IconButton edge="start"
                                className="navbar__menubutton"
                                color="inherit" aria-label="menu">
                    </IconButton>
                    <Typography variant="h6"
                                className="navbar__title"
                    >
                        <FontAwesomeIcon icon={faDumbbell}/>TrueEffects
                    </Typography>
                    {props.token !== null ? <> <p
                        className="navbar__secondtitle"
                        id="navbaruser">Witaj {props.name}<Button onClick={handleLogout} color="inherit">Wyloguj
                        się</Button></p></> : <><Button color="inherit">Zaloguj się</Button></>}
                </Toolbar>
            </AppBar>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        trainings: state.training.trainings.data,
        loadedtrainings: state.training.loadedtrainings,
        measurements: state.training.measurements.data,
        goals: state.training.goals.data,
        name: state.authentication.name,
        token: state.authentication.token
    }
}
export default connect(mapStateToProps, {logoutUser})(UpperNavbar);
