import {useEffect, useState} from "react";

export const useTraining = (props) => {
    const {training} = props;
    const [currentTraining, setCurrentTraining] = useState(null);
    const [actualMultiSeries, setActualMultiSeries] = useState(0);
    const [actualSingleSeries, setActualSingleSeries] = useState(0);
    const [trainingFinished, setTrainingFinished] = useState(false);
    const [extraWeight, setExtraWeight] = useState(null)
    const [actualReps, setActualReps] = useState(null)
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
        setActualSingleSeries(actualSingleSeries + 1)
        setExtraWeight(multi_series[actualMultiSeries].single_series[actualSingleSeries + 1].extra_weight)
        setActualReps(multi_series[actualMultiSeries].single_series[actualSingleSeries + 1].reps)
    }
    const setAnotherMultiSeries = () => {
        const {multi_series} = currentTraining
        setActualSingleSeries(0)
        setActualMultiSeries(actualMultiSeries + 1)
        setExtraWeight(multi_series[actualMultiSeries + 1].single_series[0].extra_weight)
        setActualReps(multi_series[actualMultiSeries + 1].single_series[0].reps)
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
            reps
        } = currentTraining.multi_series[actualMultiSeries].single_series[actualSingleSeries]
        const {multi_series} = currentTraining
        return [concentric_phase, pause_after_concentric_phase, eccentric_phase, pause_after_eccentric_phase,
            extra_weight, reps, extraWeight, actualReps, multi_series, actualMultiSeries, actualSingleSeries,
            handleExtraWeight, handleReps, handleMovetoAnotherSeries, modifyMultiSeries]
    } else {
        return [null, null, null, null,
            null, null, null, null, null, actualMultiSeries, actualSingleSeries,
            handleExtraWeight, handleReps, handleMovetoAnotherSeries, modifyMultiSeries]
    }
}