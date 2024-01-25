import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight} from '@fortawesome/fontawesome-free-solid';
import {connect} from 'react-redux';
import AuthenticateLogo from "../AuthenticateLogo";
import {postRegister} from "../../redux/actions/authenticationActions";
import "../../new_sass/register.scss";
import {useRegister} from "../hooks/auth/useRegister";

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
                        Zaloguj się <FontAwesomeIcon icon={faArrowRight}/>
                    </div>
                </div>
                <div className="content container__content">
                    <form className="form content__form" onSubmit={handleSubmit}
                          noValidate autoComplete="off">
                        <div className="form__title">Zarejestruj się</div>
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
                        </div>

                        <div className="form__email animatedInput">
                            <input
                                name="email"
                                onChange={handleChange}
                                type="email"
                            />
                            <span>Adres Email</span>
                        </div>
                        <div className="errors form__errors">
                            {errors.email && <p>{errors.email}</p>}
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
                        </div>
                        <div className="form__password animatedInput">
                            <input
                                name="password2"
                                onChange={handleChange}
                                type="password"
                            />
                            <span>Powtórz hasło</span>
                        </div>
                        <div className="errors form__errors">
                            {errors.password2 && <p>{errors.password2}</p>}
                        </div>
                        <div className="errors form__errors">
                            {Object.keys(errors).length == 0 && props.register_error &&
                                <p>{props.register_error.non_field_errors[0]}</p>}
                        </div>
                        <div className="button form__button">
                            <button className="button__register square-buttons" type="submit">
                                Zarejestruj się
                            </button>
                            {/*#TODO create forget password someday*/}
                            {/*<p className="button__forgot-password">*/}
                            {/*    Zapomniałem hasła*/}
                            {/*</p>*/}
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
