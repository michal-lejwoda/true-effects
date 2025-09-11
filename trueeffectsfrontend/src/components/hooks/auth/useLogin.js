import {useCookies} from "react-cookie";
import {useFormik} from "formik";
import {loginUserValidation} from "../../validation/validation";
import {useNavigate} from "react-router-dom";
// import {connectLogInTimeWebSocket} from "../../websockets/LogInTimeWebSocket";


export const useLogin = (props) => {
    const [, setCookie] = useCookies(['true_effects_token']);
    const navigate = useNavigate()
    const handleSetToken = (token) => {
        setCookie("true_effects_token", token)
    }
    const handleMoveToRegister = () => {
        navigate('/register')
    }
    const handleMoveToResetPassword = () => {
        navigate('/reset_password')
    }
    const handleLogin = async () => {
        let data = {
            "username": values.username,
            "password": values.password
        }
        try {
            await props.loadUser(data, handleSetToken);
        } catch (err) {
            console.error("Problem with logging:", err);
        }
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