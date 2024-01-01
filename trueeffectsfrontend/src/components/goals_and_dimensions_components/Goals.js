import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import '../../sass/addgoals.css';
import "react-datepicker/dist/react-datepicker.css";
import {convertDate} from "../helpers/function_helpers";
import {createGoalValidation} from "../validation/validation";
import {useFormik} from "formik";
import {connect} from "react-redux";
import {getGoals, postGoal, postGoals} from "../../redux/actions/trainingActions";
import {CreateGoal} from "../goals_and_measurements_modals/CreateGoal";
import {CompareDimensions} from "../goals_and_measurements_modals/CompareDimensions";
import {CreateDimension} from "../goals_and_measurements_modals/CreateDimension";


const Goals = (props) => {
    const [showCreateGoal, setShowCreateGoal] = useState(false);

    const handleCloseCreateGoal = () => setShowCreateGoal(false);

    const handleShowCreateGoal = () => setShowCreateGoal(true);


    const {values, setFieldValue, handleSubmit, handleChange, errors} = useFormik({
        initialValues: {
            goal: '',
            description: '',
            finishDate: null,
            finishJsDate: null,
        },
        validationSchema: createGoalValidation,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            handleSendGoals(values)
        },
    });
    const handleDate = (date) => {
        const convertedDate = convertDate(date)
        setFieldValue("finishDate", convertedDate)
        setFieldValue("finishJsDate", date)
    }
    const handleSendGoals = async () => {
        console.log("sendGoals")
        const data = {
            "finish_date": values.finishDate,
            "goal": values.goal,
            "description": values.description,
        }
        await postGoals(data)
        // await getGoals()
        // history.push("/")
    }
    return (
        <div className="goals">
            <CreateGoal show={showCreateGoal} handleClose={handleCloseCreateGoal} handleShow={handleShowCreateGoal}
                postGoals={(data)=>props.postGoal(data)}
            />
            <button onClick={handleShowCreateGoal}>Dodaj nowy cel</button>
            <div className="goals__displaycontainers">
                <div className="goals__displaycontainers__unrealized">Niezrealizowane
                    <button onClick={handleShowCreateGoal}></button>
                </div>
                <div className="goals__displaycontainers__realized">Zrealizowane</div>
            </div>
        </div>
    );
};

export default connect(null, {postGoal, getGoals})(Goals);
