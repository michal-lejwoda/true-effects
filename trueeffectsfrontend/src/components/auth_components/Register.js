import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight} from '@fortawesome/fontawesome-free-solid';
import {connect} from 'react-redux';
import AuthenticateLogo from "../AuthenticateLogo";
import {postRegister} from "../../redux/actions/authenticationActions";
import "../../new_sass/register.scss";
import {useRegister} from "../hooks/auth/useRegister";
import {t} from "i18next";

const Register = (props) => {
    const [handleMoveToLogin, handleChange, handleSubmit, errors] = useRegister(props)
    if (props.token !== null) {
        props.history.push('/')
    }
    return (
        <div className="register">
            <div className="authenticate-logo register__authentication-logo">
                <AuthenticateLogo/>
            </div>
            <div className="container register__container">
                <div className="header container__header">
                    <div className="header__element" onClick={handleMoveToLogin}>
                        {t("Log in")}<FontAwesomeIcon icon={faArrowRight}/>
                    </div>
                </div>
                <div className="content container__content">
                    <form className="form content__form" onSubmit={handleSubmit}
                          noValidate autoComplete="off">
                        <div className="form__title">{t("Register")}</div>
                        <div className="form__username animatedInput">
                            <input
                                name="username"
                                onChange={handleChange}
                                type="text"
                            />
                            <span>{t("Username")}</span>
                        </div>
                        <div className="errors form__errors">
                            {errors.username && <p>{errors.username}</p>}
                            {props.error_register["username"] && <p>{props.error_register["username"]}</p>}
                        </div>

                        <div className="form__email animatedInput">
                            <input
                                name="email"
                                onChange={handleChange}
                                type="email"
                            />
                            <span>{t("Email address")}</span>
                        </div>
                        <div className="errors form__errors">
                            {errors.email && <p>{errors.email}</p>}
                            {props.error_register["email"] && <p>{props.error_register["email"]}</p>}
                        </div>
                        <div className="form__password animatedInput">
                            <input
                                name="password"
                                onChange={handleChange}
                                type="password"
                            />
                            <span>{t("Password")}</span>
                        </div>
                        <div className="errors form__errors">
                            {errors.password && <p>{errors.password}</p>}
                            {props.error_register["password"] && <p>{props.error_register["password"]}</p>}
                        </div>
                        <div className="form__password animatedInput">
                            <input
                                name="password2"
                                onChange={handleChange}
                                type="password"
                            />
                            <span>{t("Repeat password")}</span>
                        </div>
                        <div className="errors form__errors">
                            {errors.password2 && <p>{errors.password2}</p>}
                            {props.error_register["password2"] && <p>{props.error_register["password2"]}</p>}
                        </div>
                        <div className="errors form__errors">
                            {props.error_register.non_field_errors && Object.keys(errors).length === 0 && props.error_register &&
                                <p>{props.error_register.non_field_errors[0]}</p>}
                        </div>
                        <div className="button form__button">
                            <button className="button__register square-buttons" type="submit">
                                {t("Register")}
                            </button>
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
export default connect(mapStateToProps, {postRegister})(Register);
