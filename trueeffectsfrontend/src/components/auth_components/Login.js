import React, {useState} from 'react';
import '../../sass/login.scss';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/fontawesome-free-solid';
import AuthenticateLogo from "../AuthenticateLogo";
import {loadUser, postLogin} from "../../redux/actions/authenticationActions";
import {getExercises, getGoals, getMeasurements, getTrainings, postTraining} from "../../redux/actions/trainingActions";
import {useCookies} from "react-cookie";
import '../../new_sass/login.scss';

const Login = (props) => {

    const [cookies, setCookie] = useCookies(['true_effects_token']);

    if (props.token !== null) {
        props.history.push('/')
    }

    const handleSetToken = (token) => {
        setCookie("true_effects_token", token)
    }
    const handleMoveToRegister = () => {
        props.history.push('/register')
    }
    const handleMovetoBack = () => {
        props.history.goBack()
    }
    const [login, setLogin] = useState("test")
    const [password, setPassword] = useState("test")
    const handleLogin = async (e) => {
        e.preventDefault();
        let data = {
            "username": login,
            "password": password
        }
        await props.loadUser(data, handleSetToken)
    }

    return (
        <div className="login">
            <div className="authenticate-logo login__authentication-logo">
                <AuthenticateLogo/>
            </div>
            <div className="form login__form">
                <div className="header form__header">
                    <div className="header__element" onClick={handleMovetoBack}>
                        <FontAwesomeIcon icon={faArrowLeft}/> Cofnij
                    </div>
                    <div className="header__element" onClick={handleMoveToRegister}>
                        Zarejestruj się <FontAwesomeIcon icon={faArrowRight}/>
                    </div>
                </div>
                <div className="content form__content">
                    <form
                        noValidate autoComplete="off">
                        <div className="content__title">Zaloguj się</div>
                        <div className="content__secondtitle">Zaloguj się aby kontynuować</div>
                        <div className="content__username">
                            <TextField defaultValue="test" onChange={(e) => setLogin(e.target.value)}
                                       id="standard-password-input" label="Nazwa użytkownika" type="text"
                                       autoComplete="current-password"/>
                        </div>
                        <div className="content__password">
                            <TextField defaultValue="test" onChange={(e) => setPassword(e.target.value)}
                                       id="standard-password-input" label="Hasło" type="password"
                                       autoComplete="current-password"/>
                        </div>
                        <div className="errors content__errors">
                            {props.login_error && <p style={{color: 'red'}}>{props.login_error.non_field_errors[0]}</p>}
                        </div>
                        <div className="button content__button">
                            <button className="button__login"
                                    onClick={handleLogin}>Zaloguj się
                            </button>
                            <p className="button__forgot-password">Zapomniałem hasła</p>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        error: state.authentication.error,
        login_error: state.authentication.login_error,
        token: state.authentication.token,
        tokenloaded: state.authentication.tokenloaded
    }
}
export default connect(mapStateToProps, {
    postLogin,
    getMeasurements,
    postTraining,
    getTrainings,
    getGoals,
    getExercises,
    loadUser
})(Login);
