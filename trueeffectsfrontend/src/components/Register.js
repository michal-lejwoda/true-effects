import React, { useState } from 'react';
import '../sass/register.scss';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/fontawesome-free-solid';
import AuthenticateLogo from './AuthenticateLogo';
import { postRegister } from '../redux/actions/authenticationActions';
import { connect } from 'react-redux';
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            width: '60ch',
            '& .MuiInputBase-input': {
                fontWeight: '700'
            }
        },
    },
}));
const Register = (props) => {
    if (props.token !== null) {
        props.history.push('/')
    }
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [emailerror, setEmailError] = useState(false)
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleMoveToLogin = () => {
        props.history.push('/login')
    }
    const handleMovetoBack = () => {
        props.history.goBack()
    }
    const handleRegister = async (e) => {
        e.preventDefault()
        if (validateEmail(email) !== false) {
            let data = {
                "username": username,
                "email": email,
                "password": password,
                "password2": password2
            }
            await props.postRegister(data)
        } else {
            setEmailError(true)
        }

    }
    const classes = useStyles();
    return (
        <div className="register">
            <AuthenticateLogo />
            <div className="register__secondcontainer">
                <div className="register__secondcontainer__top">
                    <div className="register__secondcontainer__top__back" onClick={handleMovetoBack}>
                        <div className="register__secondcontainer__top__back-icon"><FontAwesomeIcon icon={faArrowLeft} /></div>
                        <div className="register__secondcontainer__top__back-title">Cofnij</div>
                    </div>
                    <div className="register__secondcontainer__top__forward" onClick={handleMoveToLogin}>
                        <div className="register__secondcontainer__top__forward-title">Zaloguj się</div>
                        <div className="register__secondcontainer__top__forward-icon"><FontAwesomeIcon icon={faArrowRight} /></div>
                    </div>
                </div>
                <div className="register__secondcontainer__form">
                    <form className={classes.root} noValidate autoComplete="off">
                        <div className="register__secondcontainer__form__title">Zarejestruj się</div>
                        <div className="register__secondcontainer__form__secondtitle">Zarejestruj się aby kontynuować</div>
                        <div className="register__secondcontainer__form__allinputs">
                            <div className="register__secondcontainer__form__username-input">
                                <TextField id="standard-password-input" onChange={(e) => setUsername(e.target.value)} label="Nazwa użytkownika" type="text" autoComplete="current-password" />
                            </div>
                            {props.error_register.username !== undefined && <p style={{ color: 'red' }}>{props.error_register.username}</p>}
                            <div className="register__secondcontainer__form__username-email">
                                <TextField id="standard-password-input" onChange={(e) => setEmail(e.target.value)} label="Email" type="email" autoComplete="current-password" />
                            </div>
                            {emailerror && <p style={{ color: 'red' }}>Nieprawidłowy email</p>}
                            <div className="register__secondcontainer__form__username-password">
                                <TextField id="standard-password-input" onChange={(e) => setPassword(e.target.value)} label="Hasło" type="password" autoComplete="current-password" />
                            </div>
                            {props.error_register.password !== undefined && <p style={{ color: 'red' }}>{props.error_register.password}</p>}
                            <div className="register__secondcontainer__form__username-password">
                                <TextField id="standard-password-input" onChange={(e) => setPassword2(e.target.value)} label="Powtórz hasło" type="password" autoComplete="current-password" />
                            </div>
                            {props.error_register.password2 !== undefined && <p style={{ color: 'red' }}>{props.error_register.password2}</p>}

                        </div>
                        <div className="register__secondcontainer__form__button">
                            <button className="register__secondcontainer__form__button-register" onClick={handleRegister}>Zarejestruj się</button>
                            {/* <p className="register__secondcontainer__form__button-forget">Zapomniałem hasła</p> */}
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        error_register: state.authentication.error_register,
        token: state.authentication.token
    }
}
export default connect(mapStateToProps, { postRegister })(Register);
