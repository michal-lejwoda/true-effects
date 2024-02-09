import React from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight} from '@fortawesome/fontawesome-free-solid';
import AuthenticateLogo from "../AuthenticateLogo";
import {postResetPassword} from "../../redux/actions/authenticationActions";
import '../../new_sass/login.scss';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useResetPassword} from "../hooks/auth/useResetPassword";

const ResetPassword = (props) => {
    const [handleMoveToRegister, handleMoveToLogin, handleChange, handleSubmit, errors] = useResetPassword(props)
    return (
        <div className="login">
            <div className="authenticate-logo login__authentication-logo">
                <AuthenticateLogo/>
            </div>
            <div className="container login__container">
                <div className="header--space-between container__header">
                    <div className="header__element" onClick={handleMoveToLogin}>
                       <FontAwesomeIcon icon={faArrowLeft}/> Zaloguj się
                    </div>
                    <div className="header__element" onClick={handleMoveToRegister}>
                        Zarejestruj się <FontAwesomeIcon icon={faArrowRight}/>
                    </div>
                </div>
                <div className="content container__content">
                    <form className="form content__form" onSubmit={handleSubmit}
                          noValidate autoComplete="off">
                        <div className="form__title">Zresetuj hasło</div>
                        <div className="form__username animatedInput">
                            <input
                                name="username"
                                onChange={handleChange}
                                type="email"
                            />
                            <span>Email</span>
                        </div>
                        <div className="errors form__errors">
                            {errors.email && <p>{errors.email}</p>}
                        </div>
                        <div className="button form__button">
                            <button className="button__login square-buttons" type="submit">
                                Zaloguj się
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default connect(null, {postResetPassword})(ResetPassword);
