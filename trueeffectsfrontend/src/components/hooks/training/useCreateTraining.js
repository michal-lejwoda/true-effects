import {useState} from "react";
import {useFormik} from "formik";
import {convertDate} from "../../helpers/function_helpers";
import {createTrainingValidation} from "../../validation/validation";

export const useCreateTraining = (createTraining, getTrainings, getUpcomingTrainings, getLastCompletedTrainings) => {
    const [showCreatedTrainingModal, setShowCreatedTrainingModal] = useState(false)
    const [showCreateExerciseModal, setShowExerciseModal] = useState(false)
    const [createdTraining, setCreatedTraining] = useState(null)
    const [multiSeries, setMultiSeries] = useState([])
    const [multiSeriesIndex, setMultiSeriesIndex] = useState(0)
    const [singleSeries, setSingleSeries] = useState([])
    const handleCloseCreatedTrainingModal = () => {
        setShowCreatedTrainingModal(false);
    }

    const handleCloseCreateExerciseModal = () => {
        setShowExerciseModal(false)
    }

    const handleSubmit = async () => {
        let data = values
        let multiSeriesToModify = JSON.parse(JSON.stringify(multiSeries))
        for(let i=0; i<multiSeriesToModify.length;i++){
            multiSeriesToModify[i].exercise = multiSeriesToModify[i].exercise.id
            for(let j=0; j<multiSeriesToModify[i]['single_series'].length;j++){
                multiSeriesToModify[i]['single_series'][j].exercise = multiSeriesToModify[i].exercise
            }
        }
        data["multi_series"] = multiSeriesToModify
        if (validateTraining(data) === true) {
            setCreatedTraining(await createTraining(data))
            await getUpcomingTrainings()
            await getLastCompletedTrainings()
            await getTrainings()
            await setShowCreatedTrainingModal(true)
        } else {
            return null;
        }
    }
    const {values, setFieldValue, handleChange, setErrors, errors} = useFormik({
        initialValues: {
            name: "", date: convertDate(new Date()), description: "",
        },
        validationSchema: createTrainingValidation,
        validateOnChange: false,
        validationOnBlue: false,
    });

    const validateTraining = (data) => {
        try {
            createTrainingValidation.validateSync(data, {abortEarly: false});
            setErrors({})
            return true
        } catch (error) {
            const formattedErrors = error.inner.reduce((acc, validationError) => {
                acc[validationError.path] = validationError.message;
                return acc;
            }, {});

            setErrors(formattedErrors);
            return false
        }
    }
    return [multiSeries, multiSeriesIndex, singleSeries, values, errors, showCreatedTrainingModal, showCreateExerciseModal, createdTraining, setMultiSeries, setMultiSeriesIndex,
        setSingleSeries, setFieldValue, handleChange, handleSubmit, handleCloseCreatedTrainingModal, handleCloseCreateExerciseModal,
        setShowExerciseModal]

}