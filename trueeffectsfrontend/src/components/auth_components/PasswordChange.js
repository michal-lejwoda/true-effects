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
import {useTranslation} from "react-i18next";

const PasswordChange = (props) => {
    const {token} = useParams();
    const {t} = useTranslation();
    const history = useHistory()
    const {handleChange, handleSubmit, errors} = useFormik({
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
                    alert(t("Password has been changed"))
                    handleMoveToLogin(history)
                })
                .catch(() => {
                    alert(t("Can't change password. Try again"))
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
                        <FontAwesomeIcon icon={faArrowLeft}/>{t("Log in")}
                    </div>
                    <div className="header__element" onClick={() => handleMoveToRegister(history)}>
                        {t("Register")}<FontAwesomeIcon icon={faArrowRight}/>
                    </div>
                </div>
                <div className="content container__content">
                    <form className="form content__form" onSubmit={handleSubmit}
                          noValidate autoComplete="off">
                        <div className="form__title">{t("Change password")}</div>
                        <div className="form__username animatedInput">
                            <input
                                name="email"
                                onChange={handleChange}
                                type="email"
                            />
                            <span>{t("Email address")}</span>
                        </div>
                        <div className="errors form__errors">
                            {errors.email && <p>{t(errors.email)}</p>}
                        </div>
                        <div className="form__username animatedInput">
                            <input
                                name="new_password1"
                                onChange={handleChange}
                                type="email"
                            />
                            <span>{t("New password")}</span>
                        </div>
                        <div className="errors form__errors">
                            {errors.new_password1 && <p>{t(errors.new_password1)}</p>}
                        </div>
                        <div className="form__username animatedInput">
                            <input
                                name="new_password2"
                                onChange={handleChange}
                                type="email"
                            />
                            <span>{t("Repeat new password")}</span>
                        </div>
                        <div className="errors form__errors">
                            {errors.new_password2 && <p>{t(errors.new_password2)}</p>}
                        </div>
                        <div className="button form__button">
                            <button className="button__login square-buttons" type="submit">
                                {t("Change password")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default connect(null, {postResetPassword, postPasswordChangeWithToken})(PasswordChange);
