import {useState} from "react";

export const useTraining = (props) => {
    const {training} = props
    const [currentTraining, setCurrentTraining] = useState(training)
    const [actualMultiSeries, setActualMultiSeries] = useState(0)
    const [actualSingleSeries, setActualSingleSeries] = useState(0)
    const [trainingFinished, setTrainingFinished] = useState(false)
    const {multi_series} = currentTraining
    const {
        concentric_phase,
        pause_after_concentric_phase,
        eccentric_phase,
        pause_after_eccentric_phase,
        extra_weight,
        reps
    } = multi_series[actualMultiSeries].single_series[actualSingleSeries]

    const [extraWeight, setExtraWeight] = useState(extra_weight)
    const [actualReps, setActualReps] = useState(reps)
    const modifyMultiSeries = () => {
        const updatedCurrentTraining = {...currentTraining}
        updatedCurrentTraining.multi_series[actualMultiSeries].single_series[actualSingleSeries].extra_weight = extraWeight
        // reps
        updatedCurrentTraining.multi_series[actualMultiSeries].single_series[actualSingleSeries].reps = actualReps
        setCurrentTraining(updatedCurrentTraining)
    }


    const handleExtraWeight = (e) => {
        setExtraWeight(e.target.value)
    }
    const handleReps = (e) => {
        setActualReps(e.target.value)
    }
    const setAnotherSeries = () => {
        setActualSingleSeries(actualSingleSeries + 1)
        setExtraWeight(multi_series[actualMultiSeries].single_series[actualSingleSeries + 1].extra_weight)
        setActualReps(multi_series[actualMultiSeries].single_series[actualSingleSeries + 1].reps)
    }
    const setAnotherMultiSeries = () => {
        setActualSingleSeries(0)
        setActualMultiSeries(actualMultiSeries + 1)
        setExtraWeight(multi_series[actualMultiSeries + 1].single_series[0].extra_weight)
        setActualReps(multi_series[actualMultiSeries + 1].single_series[0].reps)
    }


    const handleMovetoAnotherSeries = () => {
        if (trainingFinished) {
            return
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

    return [concentric_phase, pause_after_concentric_phase, eccentric_phase, pause_after_eccentric_phase,
        extra_weight, reps, extraWeight, actualReps, multi_series, actualMultiSeries, actualSingleSeries,
        handleExtraWeight, handleReps, handleMovetoAnotherSeries, modifyMultiSeries]
}