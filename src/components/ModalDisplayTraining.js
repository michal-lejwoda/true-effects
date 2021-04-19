import React,{useState,useRef} from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/fontawesome-free-solid';
import ModalDisplayTrainingItem from './modaldisplaytraining/ModalDisplayTrainingItem';
import {connect} from 'react-redux';
import '../sass/modaldisplaytraining.scss';
import DatePicker from "react-datepicker";
import {deleteTraining,getTrainings,updateDateTraining} from '../redux/actions/trainingActions';
const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    backgroundColor: '#457B9D',
    padding: '50px',
    zIndex: 10
}
const OVERLAY_STYLES = {
    position:'fixed',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor: 'rgba(0,0,0,.7)',
    zIndex:10,
    color: 'rgba(0,0,0)',
}

const ModalDisplayTraining = props => {
    const [newday,setNewDay] = useState(false)
    const [summary,setSummary] = useState(false)
    const [selectDate,setSelectDate] = useState(new Date())
    const training_date = useRef(null);
    const handleMovetoTraining = () =>{
        props.allprops.history.push({pathname:'/training',training:props.alldata});
    }
    
    const handleDeleteTraining = async() => {
        await props.deleteTraining(props.alldata.id)
        await props.getTrainings()
        await props.back()
    }
    const handleAddtoDate = async() => {
        console.log("addToDate")
        let splitdate = training_date.current.input.value.split("/")
        let fullday = splitdate[2] + "-" + splitdate[1] + "-" +  splitdate[0]
        let date = {'date': fullday}
        await props.updateDateTraining(props.alldata.id,date)
        await props.getTrainings()
    }
    
    return ReactDOM.createPortal(
        <div className="modaldisplaytraining" style={OVERLAY_STYLES}>
            <div className="modaldisplaytraining__data" style={MODAL_STYLES}>
            <div className="modaldisplaytraining__data-close" ><span><FontAwesomeIcon onClick={()=>props.back()} icon={faTimes}/></span></div>
            <div className="modaldisplaytraining__data-title">{props.title}</div>
            <div className="modaldisplaytraining__data__datetime">
                <div className="modaldisplaytraining__data__datetime-time">Czas trwania treningu : {props.time}</div>
                <div className="modaldisplaytraining__data__datetime-date">{props.date}</div>
            </div>
            <div className="modaldisplaytraining__data-completed"></div>
            <div className="modaldisplaytraining__data-description">{props.description}</div>
            
            <div className="modaldisplaytraining__data__buttons">
            {/* <div className="modaldisplaytraining__data__buttons-button">
                <button onClick={handleSummaryTraining}>Podsumowanie treningu</button>
            </div> */}
            
            <div className="modaldisplaytraining__data__buttons-button">
                <button onClick={handleDeleteTraining}>Usuń trening</button>
            </div>
            <div className="modaldisplaytraining__data__buttons-button">
                <button onClick={handleMovetoTraining}>Powtórz trening</button>
            </div>
            <div className="modaldisplaytraining__data__buttons-button" onClick={()=>setNewDay(!newday)} >
                <button>{newday ? "Schowaj formularz " : "Dodaj trening do innego dnia"}</button>
            </div>
            </div>
            <div className="modaldisplaytraining__data__input" style={{display: newday ? 'flex' : 'none' }}>
                <span>
                    <DatePicker ref={training_date} locale='pl' dateFormat='dd/MM/yyyy' selected={selectDate} onChange={date => setSelectDate(date)} />
                </span>
                <div className="modaldisplaytraining__data__input-button">
                    <button onClick={handleAddtoDate}>Dodaj trening do podanego dnia</button>
                </div>
            </div>
            <div className="modaldisplaytraining__data__elements">
                <table id="training">
                <tr>
                    <th>Nazwa Ćwiczenia</th>
                    <th>Liczba Serii</th>
                    <th>Liczba Powtórzeń</th>
                    <th>Przerwa między seriami</th>
                    <th>Ciężar</th>
                    <th>Fazy</th>
                </tr>
                    {props.training.map((training)=> <ModalDisplayTrainingItem training={training} />)}
                </table>
            </div>
        </div>
        </div>,
        document.getElementById('root')
    );
};
const mapStateToProps = (state) => {
    return{
        token : state.authentication.token,
        loadedtrainings: state.training.loadedtrainings,
        loadedmeasurements: state.training.loadedmeasurements,
        loadedgoals: state.training.loadedgoals,
        loadedexercises: state.training.loadedexercises
    }
  }

const mapDispatchToProps = () =>dispatch => {
    return {
      deleteTraining: (x) =>dispatch(deleteTraining(x)),
      getTrainings: () =>dispatch(getTrainings()),
      updateDateTraining: (x,y) =>dispatch(updateDateTraining(x,y))
    };
  };
export default connect(mapStateToProps,mapDispatchToProps)(ModalDisplayTraining);
