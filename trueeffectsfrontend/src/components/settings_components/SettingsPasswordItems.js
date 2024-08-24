import React from 'react';
import {useFormik} from "formik";
import {changePasswordValidation} from "../validation/validation";
import {useTranslation} from "react-i18next";

export const SettingsPasswordItems = (props) => {
    const {t} = useTranslation();
    const {values, handleSubmit, handleChange, setErrors, errors} = useFormik({
        initialValues: {
            old_password: "", new_password1: "", new_password2: "",
        },
        validationSchema: changePasswordValidation,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            props.changePassword(values)
                .then(() => {
                    props.setSuccessModal(true)
                })
                .catch((err) => {
                    setErrors(err.response.data)
                })
        },
    });

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="settings__title">{t("Password change")}</h2>
            <div className="animatedInput">
                <input name="old_password" onChange={handleChange} value={values.old_password} required={true}
                       type="password"/>
                <span>{t('Old password')}</span>
            </div>
            {errors.old_password && <p className="settings__errors--red">{t(errors.old_password)}</p>}
            <div className="animatedInput">
                <input name="new_password1" onChange={handleChange} value={values.new_password1} required={true}
                       type="password"/>
                <span>{t('New password')}</span>
            </div>
            {errors.new_password1 && <p className="settings__errors--red">{t(errors.new_password1)}</p>}
            <div className="animatedInput">
                <input name="new_password2" onChange={handleChange} value={values.new_password2} required={true}
                       type="password"/>
                <span>{t('Repeat new password')}</span>
            </div>
            {errors.new_password2 && <p className="settings__errors--red">{t(errors.new_password2)}</p>}
            <div className="settings__accept-button">
                <button className="standard-button" type="submit">{t('Save settings')}</button>
            </div>
        </form>
    );
};
