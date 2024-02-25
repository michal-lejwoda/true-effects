import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";

export const useTraining = (props) => {
    const [cookies, setCookie] = useCookies(['true_effects_training']);
    const {training} = props;
    const [currentTraining, setCurrentTraining] = useState(null);
    const [actualMultiSeries, setActualMultiSeries] = useState(0);
    const [actualSingleSeries, setActualSingleSeries] = useState(0);
    const [trainingFinished, setTrainingFinished] = useState(false);
    const [extraWeight, setExtraWeight] = useState(null)
    const [actualReps, setActualReps] = useState(null)
    const [errors, setErrors] = useState(null)

    useEffect(() => {
        if (cookies.true_effects_training !== undefined) {
            setActualMultiSeries(cookies.true_effects_training.actualMultiSeries)
            setActualSingleSeries(cookies.true_effects_training.actualSingleSeries)
            setCurrentTraining(cookies.true_effects_training.currentTraining)
        }
    }, [])

    useEffect(() => {
        if (training) {
            setExtraWeight(training.multi_series[actualMultiSeries].single_series[actualSingleSeries].extra_weight)
            setActualReps(training.multi_series[actualMultiSeries].single_series[actualSingleSeries].reps)
            setCurrentTraining(training);
        }
    }, [training]);

    const modifyMultiSeries = () => {
        const updatedCurrentTraining = {...currentTraining};
        updatedCurrentTraining.multi_series[actualMultiSeries].single_series[actualSingleSeries].extra_weight = extraWeight;
        updatedCurrentTraining.multi_series[actualMultiSeries].single_series[actualSingleSeries].reps = actualReps;
        setCurrentTraining(updatedCurrentTraining);

    };
    const handleExtraWeight = (e) => {
        setExtraWeight(e.target.value)
    }
    const handleReps = (e) => {
        setActualReps(e.target.value)
    }
    const setAnotherSeries = () => {
        const {multi_series} = currentTraining
        props.updateSingleSeries(multi_series[actualMultiSeries].single_series[actualSingleSeries])
            .then(() => {
                setCookie("true_effects_training", {
                    "trainingId": training.id,
                    "actualMultiSeries": actualMultiSeries,
                    "actualSingleSeries": actualSingleSeries + 1,
                    "time": props.getTimeForCookie()
                }, {maxAge: 3600, sameSite: 'strict'})
                setActualSingleSeries(actualSingleSeries + 1)
                setExtraWeight(multi_series[actualMultiSeries].single_series[actualSingleSeries + 1].extra_weight)
                setActualReps(multi_series[actualMultiSeries].single_series[actualSingleSeries + 1].reps)
                setErrors(null)
            })
            .catch((err) => {
                setErrors(err.response.data)
            })


    }
    const setAnotherMultiSeries = () => {
        const {multi_series} = currentTraining
        props.updateSingleSeries(multi_series[actualMultiSeries].single_series[actualSingleSeries])
            .then(() => {
                setCookie("true_effects_training", {
                    "trainingId": training.id,
                    "actualMultiSeries": actualMultiSeries + 1,
                    "actualSingleSeries": 0,
                    "time": props.getTimeForCookie()
                }, {maxAge: 3600, sameSite: 'strict'})
                setActualSingleSeries(0)
                setActualMultiSeries(actualMultiSeries + 1)
                setExtraWeight(multi_series[actualMultiSeries + 1].single_series[0].extra_weight)
                setActualReps(multi_series[actualMultiSeries + 1].single_series[0].reps)
                setErrors(null)
            })
            .catch((err) => {
                setErrors(err.response.data)
            })

    }

    const handleMovetoAnotherSeries = () => {
        const {multi_series} = currentTraining
        if (trainingFinished) {
            return null
        }
        if (actualSingleSeries < multi_series[actualMultiSeries].single_series.length - 1) {
            modifyMultiSeries()
            setAnotherSeries()
        } else {

            if (actualMultiSeries < multi_series.length - 1) {
                modifyMultiSeries()
                setAnotherMultiSeries()
            } else {
                if (trainingFinished === false) {
                    modifyMultiSeries()
                    setTrainingFinished(true)
                    alert("Zakończono trening")
                }
            }
        }
    }
    if (currentTraining) {
        const {
            concentric_phase,
            pause_after_concentric_phase,
            eccentric_phase,
            pause_after_eccentric_phase,
            extra_weight,
            reps,
            rest
        } = currentTraining.multi_series[actualMultiSeries].single_series[actualSingleSeries]
        const {multi_series} = currentTraining
        return [concentric_phase, pause_after_concentric_phase, eccentric_phase, pause_after_eccentric_phase,
            extra_weight, reps, rest, extraWeight, actualReps, multi_series, actualMultiSeries, actualSingleSeries, errors,
            handleExtraWeight, handleReps, handleMovetoAnotherSeries, modifyMultiSeries]
    } else {
        return [null, null, null, null,
            null, null, null, null, null, null, actualMultiSeries, actualSingleSeries, errors,
            handleExtraWeight, handleReps, handleMovetoAnotherSeries, modifyMultiSeries]
    }
}