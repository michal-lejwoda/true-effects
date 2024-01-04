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


// const useStyles = makeStyles((theme) => ({
//     root: {
//         '& .MuiTextField-root': {
//             width: '60ch',
//             '& .MuiInputBase-input': {
//                 fontWeight: '700'
//             }
//         },
//     },
// }));

const Login = (props) => {

    const [cookies, setCookie, removeCookie] = useCookies(['true_effects_token']);

    if (props.token !== null) {
        props.history.push('/')
    }
    const handleMoveToRegister = () => {
        props.history.push('/register')
    }
    const handleMovetoBack = () => {
        props.history.goBack()
    }
    const [login, setLogin] = useState("test")
    const [password, setPassword] = useState("test")
    // const classes = useStyles();
    const handleLogin = async (e) => {
        e.preventDefault();
        let data = {
            "username": login,
            "password": password
        }
        await props.loadUser(data, setCookie)
    }

    return (
        <div className="containerlogin">
            <div className="login">
                <AuthenticateLogo/>
                <div className="login__secondcontainer">
                    <div className="login__secondcontainer__top">
                        <div className="login__secondcontainer__top__back" onClick={handleMovetoBack}>
                            <div className="login__secondcontainer__top__back-icon"><FontAwesomeIcon
                                icon={faArrowLeft}/></div>
                            <div className="login__secondcontainer__top__back-title">Cofnij</div>
                        </div>
                        <div className="login__secondcontainer__top__forward" onClick={handleMoveToRegister}>
                            <div className="login__secondcontainer__top__forward-title">Zarejestruj się</div>
                            <div className="login__secondcontainer__top__forward-icon"><FontAwesomeIcon
                                icon={faArrowRight}/></div>
                        </div>
                    </div>
                    <div className="login__secondcontainer__form">
                        <form
                            // className={classes.root}
                              noValidate autoComplete="off">
                            <div className="login__secondcontainer__form__title">Zaloguj się</div>
                            <div className="login__secondcontainer__form__secondtitle">Zaloguj się aby kontynuować</div>
                            <div className="login__secondcontainer__form__username-input">
                                <TextField defaultValue="test" onChange={(e) => setLogin(e.target.value)}
                                           id="standard-password-input" label="Nazwa użytkownika" type="text"
                                           autoComplete="current-password"/>
                            </div>
                            <div className="login__secondcontainer__form__username-password">
                                <TextField defaultValue="test" onChange={(e) => setPassword(e.target.value)}
                                           id="standard-password-input" label="Hasło" type="password"
                                           autoComplete="current-password"/>
                            </div>
                            {/*{props.error !== '' && <p style={{ color: 'red' }}>{props.error}</p>}*/}
                            {props.login_error && <p style={{color: 'red'}}>{props.login_error.non_field_errors[0]}</p>}
                            <div className="login__secondcontainer__form__button">
                                <button className="login__secondcontainer__form__button-login"
                                        onClick={handleLogin}>Zaloguj się
                                </button>
                                <p className="login__secondcontainer__form__button-forget">Zapomniałem hasła</p>
                            </div>
                        </form>
                    </div>
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
