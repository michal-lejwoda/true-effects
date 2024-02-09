import {useCookies} from "react-cookie";
import {useFormik} from "formik";
import {loginUserValidation} from "../../validation/validation";

export const useLogin = (props) => {
    const [, setCookie] = useCookies(['true_effects_token']);
    const handleSetToken = (token) => {
        setCookie("true_effects_token", token)
    }
    const handleMoveToRegister = () => {
        props.history.push('/register')
    }
    const handleMoveToResetPassword = () => {
        props.history.push('/reset_password')
    }
    const handleLogin = async () => {
        let data = {
            "username": values.username,
            "password": values.password
        }
        return await props.loadUser(data, handleSetToken)
    }

    const {values, handleChange, handleSubmit, errors} = useFormik({
        initialValues: {
            username: "", password: "",
        },
        validationSchema: loginUserValidation,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            handleLogin()
        },
    });
    return [handleMoveToRegister, handleMoveToResetPassword, handleChange, handleSubmit, errors]
}