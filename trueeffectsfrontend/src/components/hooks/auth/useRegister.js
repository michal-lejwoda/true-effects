import {useCookies} from "react-cookie";
import {useFormik} from "formik";
import {registerUserValidation} from "../../validation/validation";

export const useRegister = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['true_effects_token']);

    const handleSetToken = (token) => {
        setCookie("true_effects_token", token)
    }

    const handleMoveToLogin = () => {
        props.history.push('/login')
    }
    const handleMovetoBack = () => {
        props.history.goBack()
    }
    const handleRegister = async () => {
        let data = {
            "username": values.username,
            "email": values.email,
            "password": values.password,
            "password2": values.password2
        }
        await props.postRegister(data, handleSetToken)
    }


    const {values, handleChange, handleSubmit, errors} = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            password2: ""
        },
        validationSchema: registerUserValidation,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            handleRegister()
        },
    });
    return [handleMoveToLogin, handleMovetoBack, handleChange, handleSubmit, errors]
}