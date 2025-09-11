import {useFormik} from "formik";
import {resetPasswordValidation} from "../../validation/validation";
import {useNavigate} from "react-router-dom";

export const useResetPassword = (props) => {
    const navigate = useNavigate()
    const handleMoveToLogin = () => {
        navigate('/login')
    }
    const handleMoveToRegister = () => {
        navigate('/register')
    }
    const handleResetPassword = async () => {
        let data = {
            "email": values.email,
        }
        return await props.postResetPassword(data)
    }
    // TODO Back here translation problem
    const {values, handleChange, handleSubmit, errors} = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: resetPasswordValidation,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            handleResetPassword().then(()=>{
                alert("Jeśli email istnieje w bazie danych to zostanie na niego wysłana wiadomość z linkiem do zmiany hasła")
            })
        },
    });
    return [handleMoveToRegister, handleMoveToLogin,  handleChange, handleSubmit, errors]
}