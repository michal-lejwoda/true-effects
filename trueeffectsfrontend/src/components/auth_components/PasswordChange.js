import React from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight} from '@fortawesome/fontawesome-free-solid';
import AuthenticateLogo from "../AuthenticateLogo";
import {postPasswordChangeWithToken, postResetPassword} from "../../redux/actions/authenticationActions";
import '../../new_sass/login.scss';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useFormik} from "formik";
import {changePasswordviaTokenValidation} from "../validation/validation";
import {handleMoveToLogin, handleMoveToRegister} from "../helpers/history_helpers";
import {useHistory, useParams} from "react-router-dom";

const PasswordChange = (props) => {
    const {token} = useParams();
    const history = useHistory()
    const {values, handleChange, handleSubmit, errors} = useFormik({
        initialValues: {
            email: "",
            new_password1: "",
            new_password2: ""
        },
        validationSchema: changePasswordviaTokenValidation,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            let data = values
            data['token'] = token
            props.postPasswordChangeWithToken(data)
                .then(() => {
                    alert("Hasło zostało zmienione")
                    handleMoveToLogin(history)
                })
                .catch(() => {
                    alert("Nie udało się zmienić hasła. Spróbuj ponownie")
                })
        },
    });
    return (
        <div className="login">
            <div className="authenticate-logo login__authentication-logo">
                <AuthenticateLogo/>
            </div>
            <div className="container login__container">
                <div className="header--space-between container__header">
                    <div className="header__element" onClick={() => handleMoveToLogin(history)}>
                        <FontAwesomeIcon icon={faArrowLeft}/> Zaloguj się
                    </div>
                    <div className="header__element" onClick={() => handleMoveToRegister(history)}>
                        Zarejestruj się <FontAwesomeIcon icon={faArrowRight}/>
                    </div>
                </div>
                <div className="content container__content">
                    <form className="form content__form" onSubmit={handleSubmit}
                          noValidate autoComplete="off">
                        <div className="form__title">Zmień hasło</div>
                        <div className="form__username animatedInput">
                            <input
                                name="email"
                                onChange={handleChange}
                                type="email"
                            />
                            <span>Podaj Email</span>
                        </div>
                        <div className="errors form__errors">
                            {errors.email && <p>{errors.email}</p>}
                        </div>
                        <div className="form__username animatedInput">
                            <input
                                name="new_password1"
                                onChange={handleChange}
                                type="email"
                            />
                            <span>Podaj nowe hasło</span>
                        </div>
                        <div className="errors form__errors">
                            {errors.email && <p>{errors.email}</p>}
                        </div>
                        <div className="form__username animatedInput">
                            <input
                                name="new_password2"
                                onChange={handleChange}
                                type="email"
                            />
                            <span>Podaj nowe hasło ponownie</span>
                        </div>
                        <div className="errors form__errors">
                            {errors.email && <p>{errors.email}</p>}
                        </div>
                        <div className="button form__button">
                            <button className="button__login square-buttons" type="submit">
                                Zmień hasło
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default connect(null, {postResetPassword, postPasswordChangeWithToken})(PasswordChange);
