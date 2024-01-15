import React from 'react';
import {Form} from "react-bootstrap";
import {useFormik} from "formik";
import {connect} from "react-redux";
import {putDimensionConfiguration} from "../../redux/actions/trainingActions";
import {settingsDimensionValidation} from "../validation/validation";

const SettingsDimensionItems = (props) => {


    const {values, handleSubmit, handleChange} = useFormik({
        initialValues: {
            id: props.userDimensionConfiguration.id,
            weight: props.userDimensionConfiguration.weight,
            growth: props.userDimensionConfiguration.growth,
            left_biceps: props.userDimensionConfiguration.left_biceps,
            right_biceps: props.userDimensionConfiguration.right_biceps,
            left_forearm: props.userDimensionConfiguration.left_forearm,
            right_forearm: props.userDimensionConfiguration.right_forearm,
            left_leg: props.userDimensionConfiguration.left_leg,
            right_leg: props.userDimensionConfiguration.right_leg,
            bodyfat: props.userDimensionConfiguration.bodyfat


        },
        validationSchema: settingsDimensionValidation,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            console.log("onSubmit")
            console.log(values)
            handlePutSettingsDimensions(values)
        },

    });

    const handlePutSettingsDimensions = async (values) => {
        const data = {
            "id": values.id,
            "weight": values.weight,
            "growth": values.growth,
            "left_biceps": values.left_biceps,
            "right_biceps": values.right_biceps,
            "left_forearm": values.left_forearm,
            "right_forearm": values.right_forearm,
            "left_leg": values.left_leg,
            "right_leg": values.right_leg,
            "bodyfat": values.bodyfat
        }
        await props.putDimensionConfiguration(data)
    }

    return (
        <form onSubmit={handleSubmit}>
            {/*<Form onSubmit={handleSubmit}>*/}
            <h2 className="settings__title">Ustawienia pomiarów</h2>
            <Form.Check
                type="switch"
                className="settings__dimensions__element"
                id="custom-switch"
                name="weight"
                onChange={handleChange}
                checked={values.weight}
                label="Wyświetlaj wagę"
            />
            <Form.Check
                type="switch"
                className="settings__dimensions__element"
                id="custom-switch"
                name="growth"
                onChange={handleChange}
                checked={values.growth}
                label="Wyświetlaj wzrost"
            />
            <Form.Check
                type="switch"
                className="settings__dimensions__element"
                id="custom-switch"
                name="left_biceps"
                onChange={handleChange}
                checked={values.left_biceps}
                label="Wyświetlaj lewy biceps"
            />
            <Form.Check
                type="switch"
                className="settings__dimensions__element"
                id="custom-switch"
                name="right_biceps"
                onChange={handleChange}
                checked={values.right_biceps}
                label="Wyświetlaj prawy biceps"
            />
            <Form.Check
                type="switch"
                className="settings__dimensions__element"
                id="custom-switch"
                name="left_forearm"
                onChange={handleChange}
                checked={values.left_forearm}
                label="Wyświetlaj lewe przedramię"
            /><Form.Check
            type="switch"
            className="settings__dimensions__element"
            id="custom-switch"
            name="right_forearm"
            onChange={handleChange}
            checked={values.right_forearm}
            label="Wyświetlaj prawe przedramię"
        /><Form.Check // prettier-ignore
            type="switch"
            className="settings__dimensions__element"
            id="custom-switch"
            name="left_leg"
            onChange={handleChange}
            checked={values.left_leg}
            label="Wyświetlaj lewą nogę"
        /><Form.Check
            type="switch"
            className="settings__dimensions__element"
            id="custom-switch"
            name="right_leg"
            onChange={handleChange}
            checked={values.right_leg}
            label="Wyświetlaj prawą nogę"
        /><Form.Check
            type="switch"
            className="settings__dimensions__element"
            id="custom-switch"
            name="bodyfat"
            onChange={handleChange}
            checked={values.bodyfat}
            label="Wyświetlaj bodyfat"
        />
            <div className="settings__accept-button">
                <button className="standard-button" type="submit">Zapisz ustawienia</button>
            </div>
            {/*</Form>*/}
        </form>
    );
};
const mapStateToProps = (state) => {
    return {
        userDimensionConfiguration: state.training.userDimensionConfiguration,
    }
}
export default connect(mapStateToProps, {putDimensionConfiguration})(SettingsDimensionItems);
