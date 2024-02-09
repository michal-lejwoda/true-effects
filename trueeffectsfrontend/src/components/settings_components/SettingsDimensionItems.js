import React, {useEffect} from 'react';
import {Form} from "react-bootstrap";
import {useFormik} from "formik";
import {connect} from "react-redux";
import {
    getDimensionConfiguration,
    getDimensionConfigurationForCompare,
    putDimensionConfiguration
} from "../../redux/actions/trainingActions";
import {settingsDimensionValidation} from "../validation/validation";
import {BoxLoading} from "react-loadingg";

const SettingsDimensionItems = (props) => {
    // Todo handle settings and refresh
    const {values, setFieldValue, handleSubmit, handleChange} = useFormik({
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
            handlePutSettingsDimensions(values)
        },

    });
    useEffect(() => {
        const {...dimensionConfig} = props.userDimensionConfiguration;

        Object.keys(dimensionConfig).forEach(key => {
            setFieldValue(key, dimensionConfig[key]);
        });
    }, [props.userDimensionConfiguration]);

    const handlePutSettingsDimensions = (values) => {
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
        props.putDimensionConfiguration(data)
            .then(() => {
                props.getDimensionConfiguration()
                props.getDimensionConfigurationForCompare()
                props.setSuccessModal(true)
            })
    }

    return props.userDimensionConfigurationLoaded ? (
        <form onSubmit={handleSubmit}>
            {/*<Form onSubmit={handleSubmit}>*/}
            <h2 className="settings__title">Ustawienia pomiarów</h2>
            <div className="settings__dimensions__elements">
                <Form.Check
                    type="switch"
                    className="settings__dimensions__element"
                    id="weight"
                    name="weight"
                    onChange={handleChange}
                    checked={values.weight}
                    label="Wyświetlaj wagę"
                />
                <Form.Check
                    type="switch"
                    className="settings__dimensions__element"
                    id="growth"
                    name="growth"
                    onChange={handleChange}
                    checked={values.growth}
                    label="Wyświetlaj wzrost"
                />
                <Form.Check
                    type="switch"
                    className="settings__dimensions__element"
                    id="left_biceps"
                    name="left_biceps"
                    onChange={handleChange}
                    checked={values.left_biceps}
                    label="Wyświetlaj lewy biceps"
                />
                <Form.Check
                    type="switch"
                    className="settings__dimensions__element"
                    id="right_biceps"
                    name="right_biceps"
                    onChange={handleChange}
                    checked={values.right_biceps}
                    label="Wyświetlaj prawy biceps"
                />
                <Form.Check
                    type="switch"
                    className="settings__dimensions__element"
                    id="left_forearm"
                    name="left_forearm"
                    onChange={handleChange}
                    checked={values.left_forearm}
                    label="Wyświetlaj lewe przedramię"
                />
                <Form.Check
                    type="switch"
                    className="settings__dimensions__element"
                    id="right_forearm"
                    name="right_forearm"
                    onChange={handleChange}
                    checked={values.right_forearm}
                    label="Wyświetlaj prawe przedramię"
                />
                <Form.Check
                    type="switch"
                    className="settings__dimensions__element"
                    id="left_leg"
                    name="left_leg"
                    onChange={handleChange}
                    checked={values.left_leg}
                    label="Wyświetlaj lewą nogę"
                />
                <Form.Check
                    type="switch"
                    className="settings__dimensions__element"
                    id="right_leg"
                    name="right_leg"
                    onChange={handleChange}
                    checked={values.right_leg}
                    label="Wyświetlaj prawą nogę"
                />
                <Form.Check
                    type="switch"
                    className="settings__dimensions__element"
                    id="bodyfat"
                    name="bodyfat"
                    onChange={handleChange}
                    checked={values.bodyfat}
                    label="Wyświetlaj tkanke tłuszczową"
                />
            </div>
            <div className="settings__accept-button">
                <button className="standard-button" type="submit">Zapisz ustawienia</button>
            </div>
        </form>
    ) : props.userDimensionConfigurationLoading && (
        <div className="box-loading">
            <BoxLoading/>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        userDimensionConfiguration: state.training.userDimensionConfiguration,
        userDimensionConfigurationLoading: state.training.userDimensionConfigurationLoading,
        userDimensionConfigurationLoaded: state.training.userDimensionConfigurationLoaded,
    }
}
export default connect(mapStateToProps, {
    putDimensionConfiguration,
    getDimensionConfiguration,
    getDimensionConfigurationForCompare
})(SettingsDimensionItems);
