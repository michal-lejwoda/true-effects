import React from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight} from '@fortawesome/fontawesome-free-solid';
import AuthenticateLogo from "../AuthenticateLogo";
import {loadUser} from "../../redux/actions/authenticationActions";
import '../../new_sass/login.scss';
import {useLogin} from "../hooks/auth/useLogin";

const Login = (props) => {
    const [handleMoveToRegister, handleMoveToResetPassword, handleChange, handleSubmit, errors]= useLogin(props)
    if (props.token !== null) {
        props.history.push('/')
    }
    return (
        <div className="login">
            <div className="authenticate-logo login__authentication-logo">
                <AuthenticateLogo/>
            </div>
            <div className="container login__container">
                <div className="header container__header">
                    <div className="header__element" onClick={handleMoveToRegister}>
                        Zarejestruj się <FontAwesomeIcon icon={faArrowRight}/>
                    </div>
                </div>
                <div className="content container__content">
                    <form className="form content__form" onSubmit={handleSubmit}
                          noValidate autoComplete="off">
                        <div className="form__title">Zaloguj się</div>
                        <div className="form__username animatedInput">
                            <input
                                name="username"
                                onChange={handleChange}
                                type="text"
                            />
                            <span>Nazwa użytkownika</span>
                        </div>
                        <div className="errors form__errors">
                            {errors.username && <p>{errors.username}</p>}
                            {props.login_error["username"] && <p>{props.login_error["username"]}</p>}
                        </div>
                        <div className="form__password animatedInput">
                            <input
                                name="password"
                                onChange={handleChange}
                                type="password"
                            />
                            <span>Hasło</span>
                        </div>
                        <div className="errors form__errors">
                            {errors.password && <p>{errors.password}</p>}
                            {props.login_error["password"] && <p>{props.login_error["password"]}</p>}
                        </div>
                        <div className="errors form__errors">
                            {props.login_error.non_field_errors && Object.keys(errors).length === 0 && props.login_error &&
                                <p>{props.login_error.non_field_errors[0]}</p>}
                        </div>
                        <div className="button form__button">
                            <button className="button__login square-buttons" type="submit">
                                Zaloguj się
                            </button>
                            <div className="button__forgot-password" onClick={handleMoveToResetPassword}>
                                Zresetuj hasło
                            </div>
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
export default connect(mapStateToProps, {loadUser})(Login);
