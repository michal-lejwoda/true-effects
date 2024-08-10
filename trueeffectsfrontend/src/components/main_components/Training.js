import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {getSingleTraining, updateSingleSeries, updateTraining} from "../../redux/actions/trainingActions";
import "../../new_sass/training.scss";
import {useStopwatch} from "react-timer-hook";
import CustomStopwatch from "../training_components/CustomStopwatch";
import {handleMovetoHome, handleMoveToScheduler} from "../helpers/history_helpers";
import {timeToString} from "../helpers/function_helpers";
import FinishTrainingModal from "../training_components/modals/FinishTrainingModal";
import {useHistory} from "react-router-dom";
import {useTraining} from "../hooks/training/useTraining";
import {useCookies} from "react-cookie";
import {t} from "i18next";

const Training = (props) => {
        const history = useHistory()
        const [cookies, , removeCookieTraining] = useCookies('true_effects_training')
        const [apiData, setApiData] = useState(null);
        const [oldApiData, setOldApiData] = useState(null)
        const {trainingId} = props.match.params;
        const [showFinishTraining, setShowFinishTraining] = useState(false)
        const timeToSeconds = (timeString) => {
            const [hours, minutes, seconds] = timeString.split(':').map(Number);
            const totalSeconds = hours * 3600 + minutes * 60 + seconds;
            return totalSeconds;
        }

        let stopwatchOffset = new Date();
        if (cookies.true_effects_training) {
            stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + timeToSeconds(cookies.true_effects_training.time));
        }
        const {
            seconds, minutes, hours, start, pause, reset,
        } = useStopwatch({autoStart: false, offsetTimestamp: stopwatchOffset});

        const getTimeForCookie = () => {
            const string_time = timeToString(hours, minutes, seconds)
            return string_time
        }

        useEffect(() => {
            props.getSingleTraining(trainingId)
                .then((res) => {
                    setApiData(res);
                    setOldApiData(JSON.parse(JSON.stringify(res)));
                })
                .catch(() => {
                    handleMovetoHome(history)
                })
        }, [trainingId])
        const [concentric_phase, pause_after_concentric_phase, eccentric_phase, pause_after_eccentric_phase,
            extra_weight, reps, rest, extraWeight, actualReps, multi_series, actualMultiSeries, actualSingleSeries, errors,
            handleExtraWeight, handleReps, handleMovetoAnotherSeries, modifyMultiSeries] = useTraining({
            training: apiData,
            updateSingleSeries: props.updateSingleSeries,
            getTimeForCookie
        });

        if (!multi_series) {
            return null;
        }
        const handleFinishTraining = async () => {
            modifyMultiSeries()
            const string_time = timeToString(hours, minutes, seconds)
            let training_obj = Object.assign({}, apiData)
            training_obj.multi_series = multi_series
            training_obj.time = string_time
            await props.updateTraining(training_obj)
            await removeCookieTraining("true_effects_training")
            await handleMoveToScheduler(history)
        }
        return (
            <div className="training">
                <div className="header training__header">
                    <div className="header--previousexercise">
                        <div
                            style={{visibility: typeof multi_series[actualMultiSeries - 1] !== "undefined" ? 'visible' : 'hidden'}}
                            className="header__label">
                            {t("Previous exercise")}
                        </div>
                        <div
                            style={{visibility: typeof multi_series[actualMultiSeries - 1] !== "undefined" ? 'visible' : 'hidden'}}
                            className="header__name">
                            {typeof multi_series[actualMultiSeries - 1] !== "undefined" && multi_series[actualMultiSeries - 1].exercise.name}
                        </div>
                    </div>
                    <div className="header--nextexercise">
                        <div
                            style={{visibility: typeof multi_series[actualMultiSeries + 1] !== "undefined" ? 'visible' : 'hidden'}}
                            className="header__label">{t("Next exercise")}
                            {/*<FontAwesomeIcon icon={faArrowRight}/>*/}
                        </div>
                        <div
                            style={{visibility: typeof multi_series[actualMultiSeries + 1] !== "undefined" ? 'visible' : 'hidden'}}
                            className="header__name">
                            {typeof multi_series[actualMultiSeries + 1] !== "undefined" && multi_series[actualMultiSeries + 1].exercise.name}
                        </div>
                    </div>
                </div>
                <div className="stoper training__stoper">
                    <div className="stoper__label">{t("Actual exercise")}</div>
                    <div
                        className="stoper__name">
                        {multi_series[actualMultiSeries].exercise.name}
                    </div>
                    <div
                        className="stoper__label">
                        Seria {actualSingleSeries + 1}/{multi_series[actualMultiSeries].single_series.length}
                    </div>
                    <div className="stoper__stopwatch">
                        <CustomStopwatch
                            seconds={seconds} minutes={minutes} hours={hours} start={start} pause={pause} reset={reset}
                        />
                    </div>
                </div>
                <div className="content training__content">
                    <div className="row content__row">
                        <div className="row__label">{"Phases"}</div>
                        <div
                            className="row__name">{concentric_phase}/{pause_after_concentric_phase}/{eccentric_phase}/{pause_after_eccentric_phase}
                        </div>
                        <div className="error__container">

                        </div>
                    </div>
                    <div className="row content__row">
                        <div className="row__label">{t("Rest")}</div>
                        <div
                            className="row__name">{rest} s
                        </div>
                        <div className="error__container">

                        </div>
                    </div>

                    <div className="row content__row">

                        <div className="row__label">{t("Repetitions")}</div>
                        <div className="modify-data row__modify-data">
                            <input
                                className="modify-data__input"
                                placeholder={reps}
                                value={actualReps}
                                onChange={handleReps}
                                id="actualreps" min="0"
                                max="10000"/>
                            <div
                                className="modify-data__display-old">/ {oldApiData.multi_series[actualMultiSeries].single_series[actualSingleSeries].reps} </div>
                        </div>
                        <div className="error__container">
                            {errors && errors.reps && <p className="header__errors">{errors.reps}</p>}
                        </div>
                    </div>
                    <div className="row__element content__row">
                        <div className="row__label">{t("Additional weight")}</div>
                        <div className="modify-data row__modify-data">
                            <input
                                className="modify-data__input"
                                onChange={handleExtraWeight}
                                placeholder={extra_weight}
                                value={extraWeight}
                                id="actualreps" min="0"
                                max="10000"/>
                            <div
                                className="modify-data__display-old">/ {oldApiData.multi_series[actualMultiSeries].single_series[actualSingleSeries].extra_weight} kg
                            </div>
                        </div>
                        <div className="error__container">
                            {errors && errors.extra_weight && <p className="header__errors">{errors.extra_weight}</p>}
                        </div>
                    </div>

                </div>

                <div className="buttons content__buttons">
                    <button
                        onClick={() => setShowFinishTraining(true)}
                        className="buttons__finish standard-button"
                    >t{"Finish training"}
                    </button>
                    <button
                        onClick={handleMovetoAnotherSeries}
                        className="buttons__next standard-button"
                        style={{
                            visibility:
                                actualMultiSeries === multi_series.length - 1 &&
                                actualSingleSeries ===
                                multi_series[multi_series.length - 1].single_series.length - 1
                                    ? 'hidden'
                                    : 'visible'
                        }}
                        id="nextexercise"
                    >{t("Continue")}
                    </button>

                </div>
                <FinishTrainingModal showFinishTraining={showFinishTraining}
                                     setShowFinishTraining={setShowFinishTraining}
                                     handleFinishTraining={handleFinishTraining}/>

            </div>
        );
    }
;

const mapStateToProps = (state) => {
    return {
        training: state.training.training,
    }
}

export default connect(mapStateToProps, {updateTraining, getSingleTraining, updateSingleSeries})(Training);
