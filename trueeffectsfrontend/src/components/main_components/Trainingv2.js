import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import MyStopwatch from "./MyStopwatch";
import {connect} from "react-redux";
import {updateTraining} from "../../redux/actions/trainingActions";
import {handleMoveToScheduler} from "../helpers/history_helpers";
import "../../new_sass/training.scss";

const Trainingv2 = (props) => {
        const history = useHistory()
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
            updatedCurrentTraining.multi_series[actualMultiSeries].single_series[actualSingleSeries].reps = reps
            setCurrentTraining(updatedCurrentTraining)
        }


        const handleFinishTraining = async () => {
            await props.updateTraining(currentTraining)
            await handleMoveToScheduler(history)
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
                        handleFinishTraining()
                    }
                }
            }
        }
        return (
            <div className="training">
                <div className="training__header">
                    {/*{typeof multi_series[actualMultiSeries - 1] !== "undefined" &&*/}
                    <div className="training__header--previousexercise">
                        <div
                            style={{visibility: typeof multi_series[actualMultiSeries - 1] !== "undefined" ? 'visible' : 'hidden'}}
                            className="training__header__label">
                            {/*<FontAwesomeIcon icon={faArrowLeft}/> */}
                            Poprzednie ćwiczenie
                        </div>
                        <div
                            style={{visibility: typeof multi_series[actualMultiSeries - 1] !== "undefined" ? 'visible' : 'hidden'}}
                            className="training__header__name">
                            {typeof multi_series[actualMultiSeries - 1] !== "undefined" && multi_series[actualMultiSeries - 1].exercise.name}
                        </div>
                    </div>
                    {/*}*/}
                    {/*{typeof multi_series[actualMultiSeries + 1] !== "undefined" &&*/}
                    <div className="training__header--nextexercise">
                        <div
                            style={{visibility: typeof multi_series[actualMultiSeries + 1] !== "undefined" ? 'visible' : 'hidden'}}
                            className="training__header__label">Następne ćwiczenie
                            {/*<FontAwesomeIcon icon={faArrowRight}/>*/}
                        </div>
                        <div
                            style={{visibility: typeof multi_series[actualMultiSeries + 1] !== "undefined" ? 'visible' : 'hidden'}}
                            className="training__header__name">
                            {typeof multi_series[actualMultiSeries + 1] !== "undefined" && multi_series[actualMultiSeries + 1].exercise.name}
                        </div>
                    </div>
                    {/*}*/}
                </div>
                <div className="training__stoper">
                    <div className="training__stoper__label">Aktualne Ćwiczenie</div>
                    <div
                        className="training__stoper__name">
                        {multi_series[actualMultiSeries].exercise.name}
                        {/*{training.training[series].exercise !== null ? training.training[series].exercise.name : training.training[series].ownexercise.name}*/}
                    </div>
                    {/*<div className="">*/}
                    {/*    <img src={logo} alt="logo"/>*/}
                    {/*</div>*/}
                    <div className="training__stoper__stopwatch">
                        <MyStopwatch
                            // ref={childRef}
                            // send={props.endTraining}
                            // get={props.getTrainings}
                            // id={props.location.training.id}
                            // training={props.location.training}
                        />
                    </div>

                    <div className="">
                        <div className=""
                            // style={{visibility: endtraining ? 'hidden' : 'visible'}}
                        >
                            {/*{training.training[`${series}`].reps.map(function (item, index) {*/}
                            {/*        if (index < singleSeries + 1) {*/}
                            {/*            return (*/}
                            {/*                <Checkbox checked={true}/>*/}
                            {/*            )*/}
                            {/*        } else {*/}
                            {/*            return (*/}
                            {/*                <Checkbox disabled checked={false}/>*/}
                            {/*            )*/}
                            {/*        }*/}
                            {/*    }*/}
                            {/*)}*/}
                        </div>
                        <div className=""
                            // style={{visibility: endtraining ? 'hidden' : 'visible'}}
                        >
                            {/*Seria {singleSeries + 1}/{training.training[`${series}`].reps.length}*/}
                        </div>
                    </div>
                </div>
                <div className="training__content">
                    <div className="training__content__element"
                        // style={{visibility: endtraining ? 'hidden' : 'visible'}}
                    >

                        <div className="training__content__label">Fazy</div>
                        <div
                            className="training__content__name">{concentric_phase}/{pause_after_concentric_phase}/{eccentric_phase}/{pause_after_eccentric_phase}</div>
                    </div>
                    <div className="training__content__element">
                        <div className="training__content__label">Ciężar dodatkowy</div>
                        <div className="training__content__modify-data">
                            <input
                                className="training__content__input"
                                // ref={weightRef}
                                onChange={handleExtraWeight}
                                placeholder={extra_weight}
                                value={extraWeight}
                                id="actualreps" min="0"
                                max="10000"/>
                            <div className="">/ {extra_weight} kg</div>

                        </div>

                    </div>
                    <div className="training__content__element">

                        <div className="training__content__label">Powtórzenia</div>
                        <div className="training__content__modify-data">
                            <input
                                className="training__content__input"
                                // ref={repsRef}
                                placeholder={reps}
                                value={actualReps}
                                onChange={handleReps}
                                id="actualreps" min="0"
                                max="10000"/>
                            <div className="">/ {reps} </div>
                        </div>
                    </div>

                    <div className="training__content__buttons">
                        <button id="endtraining"
                                onClick={handleFinishTraining}
                                className="standard-button"
                            // ref={endbuttonRef}
                            // onClick={handleEndTraining}
                        >Zakończ trening X
                        </button>
                        <button
                            onClick={handleMovetoAnotherSeries}
                            className="standard-button"
                            // ref={buttonRef} style={{visibility: endtraining ? 'hidden' : 'visible'}} onClick={goNext}
                            id="nextexercise"
                        >Przejdź dalej
                        </button>

                    </div>
                </div>

            </div>
        );
    }
;

const mapStateToProps = (state) => {
    return {
        training: state.training.training,
    }
}

export default connect(mapStateToProps, {updateTraining})(Trainingv2);
