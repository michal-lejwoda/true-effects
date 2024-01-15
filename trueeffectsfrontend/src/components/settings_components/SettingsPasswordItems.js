import React from 'react';
import {useFormik} from "formik";
import {createGoalValidation} from "../validation/validation";


export const SettingsPasswordItems = () => {
    const {values, setFieldValue, handleSubmit, handleChange, errors} = useFormik({
        initialValues: {
            old_password: "", new_password: "", repeat_password: "",
        },
        // validationSchema: createGoalValidation,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            // handleSendGoals(values)
        },
    });
    return (
        <form>
            <h2 className="settings__title">Zmiana hasła</h2>
            {/*<label htmlFor="">Stare hasło</label>*/}
            {/*<input type="text"/>*/}
            <div className="animatedInput">
                <input name="old_password" onChange={handleChange} value={values.old_password} required="required"
                       type="number"/>
                <span>Stare hasło</span>
            </div>
            {errors.new_password&& <p>{errors.new_password}</p>}
            <div className="animatedInput">
                <input name="old_password" onChange={handleChange} value={values.new_password} required="required"
                       type="number"/>
                <span>Nowe hasło</span>
            </div>
            {errors.new_password && <p>{errors.new_password}</p>}
            <div className="animatedInput">
                <input name="repeat_password" onChange={handleChange} value={values.repeat_password} required="required"
                       type="number"/>
                <span>Powtórz nowe hasło</span>
            </div>
            {errors.repeat_password && <p>{errors.repeat_password}</p>}
            {/*<label htmlFor="">Nowe hasło</label>*/}
            {/*<input type="text"/>*/}
            {/*<label htmlFor="">Powtórz nowe hasło</label>*/}
            {/*<input type="text"/>*/}
            <div className="settings__accept-button">
                <button className="standard-button" type="submit">Zapisz ustawienia</button>
            </div>
        </form>
    );
};
