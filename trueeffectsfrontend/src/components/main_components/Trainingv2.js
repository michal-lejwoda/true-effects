import React from 'react';
import MyStopwatch from "./MyStopwatch";
import {connect} from "react-redux";
import {updateTraining} from "../../redux/actions/trainingActions";
import "../../new_sass/training.scss";
import {useTraining} from "../hooks";
import {useStopwatch} from "react-timer-hook";
import CustomStopwatch from "../training_components/CustomStopwatch";
import {handleMoveToScheduler} from "../helpers/history_helpers";
import {timeToString} from "../helpers/function_helpers";

const Trainingv2 = (props) => {
        const {
            seconds, minutes, hours, start, pause, reset,
        } = useStopwatch({autoStart: false});
        console.log(props.training)
        const [concentric_phase, pause_after_concentric_phase, eccentric_phase, pause_after_eccentric_phase, extra_weight,
            reps, extraWeight, actualReps, multi_series, actualMultiSeries,
            handleExtraWeight, handleReps, handleMovetoAnotherSeries] = useTraining(props)

        const handleFinishTraining = async () => {
            const string_time = timeToString(hours, minutes, seconds)
            let training_obj = Object.assign({}, props.training)
            training_obj.multi_series = multi_series
            training_obj.time = string_time
            await props.updateTraining(training_obj)
            //Display finish modal
            // await handleMoveToScheduler(history)
        }
        return (
            <div className="training">
                <div className="header training__header">
                    <div className="header--previousexercise">
                        <div
                            style={{visibility: typeof multi_series[actualMultiSeries - 1] !== "undefined" ? 'visible' : 'hidden'}}
                            className="header__label">
                            Poprzednie ćwiczenie
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
                            className="header__label">Następne ćwiczenie
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
                    <div className="stoper__label">Aktualne Ćwiczenie</div>
                    <div
                        className="stoper__name">
                        {multi_series[actualMultiSeries].exercise.name}
                    </div>
                    <div className="stoper__stopwatch">
                        <CustomStopwatch
                            seconds={seconds} minutes={minutes} hours={hours} start={start} pause={pause} reset={reset}
                        />
                    </div>

                    {/*<div className="">*/}
                    {/*    <div className=""*/}
                    {/*        // style={{visibility: endtraining ? 'hidden' : 'visible'}}*/}
                    {/*    >*/}
                    {/*        /!*{training.training[`${series}`].reps.map(function (item, index) {*!/*/}
                    {/*        /!*        if (index < singleSeries + 1) {*!/*/}
                    {/*        /!*            return (*!/*/}
                    {/*        /!*                <Checkbox checked={true}/>*!/*/}
                    {/*        /!*            )*!/*/}
                    {/*        /!*        } else {*!/*/}
                    {/*        /!*            return (*!/*/}
                    {/*        /!*                <Checkbox disabled checked={false}/>*!/*/}
                    {/*        /!*            )*!/*/}
                    {/*        /!*        }*!/*/}
                    {/*        /!*    }*!/*/}
                    {/*        /!*)}*!/*/}
                    {/*    </div>*/}
                    {/*    <div className=""*/}
                    {/*        // style={{visibility: endtraining ? 'hidden' : 'visible'}}*/}
                    {/*    >*/}
                    {/*        /!*Seria {singleSeries + 1}/{training.training[`${series}`].reps.length}*!/*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                <div className="content training__content">
                    <div className="row content__row">
                        <div className="row__label">Fazy</div>
                        <div
                            className="row__name">{concentric_phase}/{pause_after_concentric_phase}/{eccentric_phase}/{pause_after_eccentric_phase}</div>
                    </div>
                    <div className="row content__row">
                        <div className="row__label">Ciężar dodatkowy</div>
                        <div className="modify-data row__modify-data">
                            <input
                                className="modify-data__input"
                                // ref={weightRef}
                                onChange={handleExtraWeight}
                                placeholder={extra_weight}
                                value={extraWeight}
                                id="actualreps" min="0"
                                max="10000"/>
                            <div className="modify-data__display-old">/ {extra_weight} kg</div>
                        </div>
                    </div>
                    <div className="row content__row">

                        <div className="row__label">Powtórzenia</div>
                        <div className="modify-data row__modify-data">
                            <input
                                className="modify-data__input"
                                // ref={repsRef}
                                placeholder={reps}
                                value={actualReps}
                                onChange={handleReps}
                                id="actualreps" min="0"
                                max="10000"/>
                            <div className="modify-data__display-old">/ {reps} </div>
                        </div>
                    </div>
                    <div className="buttons content__buttons">
                        <button
                            // id="endtraining"
                            onClick={handleFinishTraining}
                            className="buttons__finish standard-button"
                            // ref={endbuttonRef}
                            // onClick={handleEndTraining}
                        >Zakończ trening X
                        </button>
                        <button
                            onClick={handleMovetoAnotherSeries}
                            className="buttons__next standard-button"
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
