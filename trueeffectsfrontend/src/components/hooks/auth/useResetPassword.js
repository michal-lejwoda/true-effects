import {useFormik} from "formik";
import {resetPasswordValidation} from "../../validation/validation";

export const useResetPassword = (props) => {
    const handleMoveToLogin = () => {
        props.history.push('/login')
    }
    const handleMoveToRegister = () => {
        props.history.push('/register')
    }
    const handleResetPassword = async () => {
        let data = {
            "email": values.email,
        }
        return await props.postResetPassword(data)
    }

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