import React, {useRef, useState} from 'react';
import {useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/fontawesome-free-solid";
import logo from "../../images/logo.png";
import MyStopwatch from "../MyStopwatch";
import Checkbox from "@material-ui/core/Checkbox";
import {connect} from "react-redux";
import {getDimensions, postDimension} from "../../redux/actions/trainingActions";

const Trainingv2 = (props) => {
    const history = useHistory()
    const {training} = props
    console.log(training)
    // const [series, setSeries] = useState(0);
    // const [singleSeries, setSingleSeries] = useState(0)
    // const [endtraining, setEndTraining] = useState(false)
    // const [input, setInput] = useState('')
    // const inputRef = useRef();
    // const buttonRef = useRef();
    // const endbuttonRef = useRef();
    // const childRef = useRef();
    // const goNext = () => {
    //     if (inputRef.current.value !== "") {
    //         training.training[`${series}`].reps[`${singleSeries}`] = parseInt(inputRef.current.value)
    //     }
    //     let value = parseInt(inputRef.current.value)
    //     let placeholder = parseInt(inputRef.current.placeholder)
    //     if (Number.isInteger(value)) {
    //         inputRef.current.value = ''
    //         if (singleSeries + 1 < training.training[series].reps.length) {
    //             setSingleSeries(singleSeries + 1)
    //         } else {
    //             if (series + 1 >= training.training.length) {
    //                 setEndTraining(true)
    //             } else {
    //                 setSeries(series + 1)
    //                 setSingleSeries(0)
    //             }
    //         }
    //     } else if (Number.isInteger(placeholder)) {
    //         inputRef.current.value = ''
    //         if (singleSeries + 1 < training.training[series].reps.length) {
    //             setSingleSeries(singleSeries + 1)
    //         } else {
    //             if (series + 1 >= training.training.length) {
    //                 setEndTraining(true)
    //             } else {
    //                 setSeries(series + 1)
    //                 setSingleSeries(0)
    //             }
    //         }
    //     } else {
    //         alert("Niepoprawne dane");
    //     }
    // }
    // const handlemovetoschedulepage = () => {
    //     history.push('/schedule/')
    // }
    // const handleInput = () => {
    //     setInput(inputRef.current.value)
    // }
    //
    // const handleEndTraining = async () => {
    //     await childRef.current.handleStop()
    //     await childRef.current.getAlert()
    //     await childRef.current.posttrain()
    //     await handlemovetoschedulepage()
    // }
    return (
        <div>
            <h1>Trainingv2</h1>
        </div>
        // <div className="training">
        //     <div className="training__top">
        //         <div className="training__top__previousexercise">
        //             <div
        //                 style={{visibility: typeof training.training[series - 1] !== "undefined" ? 'visible' : 'hidden'}}
        //                 className="training__top__previousexercise-title"><FontAwesomeIcon
        //                 icon={faArrowLeft}/> Poprzednie ćwiczenie
        //             </div>
        //             <div
        //                 style={{visibility: typeof training.training[series - 1] !== "undefined" ? 'visible' : 'hidden'}}
        //                 className="training__top__previousexercise-name">{typeof training.training[series - 1] !== "undefined" && training.training[series - 1].exercise.name}</div>
        //         </div>
        //         {typeof training.training[series + 1] !== "undefined" && <div className="training__top__nextexercise">
        //             <div
        //                 style={{visibility: typeof training.training[series + 1] !== "undefined" ? 'visible' : 'hidden'}}
        //                 className="training__top__nextexercise-title">Następne ćwiczenie <FontAwesomeIcon
        //                 icon={faArrowRight}/></div>
        //             <div
        //                 style={{visibility: typeof training.training[series + 1] !== "undefined" ? 'visible' : 'hidden'}}
        //                 className="training__top__nextexercise-name">{typeof training.training[series + 1] !== "undefined" && training.training[series + 1].exercise !== null ? training.training[series + 1].exercise.name !== null : training.training[series + 1].ownexercise.name}</div>
        //         </div>}
        //     </div>
        //     <div className="training__middle">
        //         <div className="training__middle-title">Aktualne Ćwiczenie</div>
        //         <div
        //             className="training__middle-exercise">{training.training[series].exercise !== null ? training.training[series].exercise.name : training.training[series].ownexercise.name}</div>
        //         <div className="training__middle__logotime">
        //             <div className="training__middle__logotime-logo">
        //                 <img src={logo} alt="logo"/>
        //             </div>
        //             <div className="training__middle__logotime-time">
        //                 <MyStopwatch ref={childRef} send={props.endTraining} get={props.getTrainings}
        //                              id={props.location.training.id} training={props.location.training}/>
        //             </div>
        //         </div>
        //         <div className="training__middle__series">
        //             <div className="training__middle__series__checkboxes"
        //                  style={{visibility: endtraining ? 'hidden' : 'visible'}}>
        //                 {training.training[`${series}`].reps.map(function (item, index) {
        //                         if (index < singleSeries + 1) {
        //                             return (
        //                                 <Checkbox checked={true}/>
        //                             )
        //                         } else {
        //                             return (
        //                                 <Checkbox disabled checked={false}/>
        //                             )
        //                         }
        //                     }
        //                 )}
        //             </div>
        //             <div className="training__middle__series-title"
        //                  style={{visibility: endtraining ? 'hidden' : 'visible'}}>Seria {singleSeries + 1}/{training.training[`${series}`].reps.length}</div>
        //         </div>
        //     </div>
        //     <div className="training__bottom">
        //         <div className="training__bottom__leftbutton">
        //             <button id="endtraining" ref={endbuttonRef} onClick={handleEndTraining}>Zakończ trening X</button>
        //         </div>
        //         <div className="training__bottom__phase" style={{visibility: endtraining ? 'hidden' : 'visible'}}>
        //             <div className="training__bottom__phase-title">Fazy</div>
        //             <div className="training__bottom__phase__allphases">
        //                 <div
        //                     className="training__bottom__phase__allphases-phase">{training.training[`${series}`].concentric_phase}</div>
        //                 <div className="training__bottom__phase__allphases-/">/</div>
        //                 <div
        //                     className="training__bottom__phase__allphases-phase">{training.training[`${series}`].pause_after_concentric_phase}</div>
        //                 <div className="training__bottom__phase__allphases-/">/</div>
        //                 <div
        //                     className="training__bottom__phase__allphases-phase">{training.training[`${series}`].eccentric_phase}</div>
        //                 <div className="training__bottom__phase__allphases-/">/</div>
        //                 <div
        //                     className="training__bottom__phase__allphases-phase">{training.training[`${series}`].pause_after_eccentric_phase}</div>
        //             </div>
        //             <div className="training__bottom__weight-title">Ciężar dodatkowy</div>
        //             <div className="training__bottom__weight-title2">
        //                 {training.training[`${series}`].weight}kg
        //             </div>
        //             <div className="training__bottom__phase-title2">Ile powtórzeń wykonałeś w serii</div>
        //             <div className="training__bottom__phase__reps">
        //                 <div className="training__bottom__phase__reps-actualreps"><input ref={inputRef}
        //                                                                                  placeholder={training.training[`${series}`].reps[`${singleSeries}`]}
        //                                                                                  onChange={handleInput}
        //                                                                                  id="actualreps" min="0"
        //                                                                                  max="10000"/></div>
        //                 <div className="training__bottom__phase__reps-/">/</div>
        //                 <div
        //                     className="training__bottom__phase__reps-assumedreps">{training.training[`${series}`].reps[`${singleSeries}`]}</div>
        //             </div>
        //         </div>
        //         <div className="training__bottom__rightbutton">
        //             <button ref={buttonRef} style={{visibility: endtraining ? 'hidden' : 'visible'}} onClick={goNext}
        //                     id="nextexercise">Przejdź dalej
        //             </button>
        //         </div>
        //     </div>
        //
        // </div>
    );
};

const mapStateToProps = (state) => {
    return {
        training: state.training.training,
    }
}

export default connect(mapStateToProps, {postDimension, getDimensions})(Trainingv2);
