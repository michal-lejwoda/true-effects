import React,{useState,useRef} from 'react';
import '../sass/createtraining.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight} from '@fortawesome/fontawesome-free-solid';
import DatePicker,{registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {connect} from 'react-redux';
import pl from "date-fns/locale/pl";
import { postTraining,postOwnExercise,getTrainings,getExercises } from '../redux/actions/trainingActions';
import { useHistory } from "react-router-dom";
const CreateTraining = (props) => {
    const history = useHistory()
    registerLocale('pl',pl)
    const [startDate, setStartDate] = useState(new Date())
    const [ownexerciseActive,setOwnExerciseActive] = useState(false)
    const [activediv , setActivediv] = useState(null)
    const [ownexercise,setOwnExercise] = useState({id: '', name:''})
    const [exercise,setExercise] = useState({id: '', name:''})
    const [series,setSeries] = useState(1)
    const [assumedreps,setAssumedReps] = useState(1)
    const [rest,setRest] = useState(60)
    const [weight,setWeight] = useState(0)
    const [concentricphase,setConcentricPhase] = useState(0)
    const [pauseconcentricphase,setPauseConcentricPhase] = useState(0)
    const [eccentricphase,setEccentricPhase] = useState(0)
    const [pauseeccentricphase,setPauseEccentricPhase] = useState(0)
    const [itemsplaceholders,setItemsPlaceHolders] = useState([])
    const [items,setItems] = useState([])
    const [seriesitems,setSeriesItems] = useState([])
    const name_of_training = useRef(null);
    const training_description = useRef(null);
    const training_date = useRef(null);
    const inputOwnExercise = useRef(null);
    const handlemovetoschedulepage = () =>{
        history.push('/schedule/')
    }
    const addElementtoItems = () =>{
        setItems(prevItems => [...prevItems, {
            exercise : {exercise},
            ownexercise: {ownexercise},
            series: {series},
            assumedreps: {assumedreps},
            rest: {rest},
            weight: {weight},
            concentricphase:{concentricphase},
            pauseconcentricphase:{pauseconcentricphase},
            eccentricphase:{eccentricphase},
            pauseeccentricphase:{pauseeccentricphase}
          }]);
    }
    const addElementstoMainItems = () => {
        setSeriesItems(prevItems => [...prevItems, {
            exercise : {exercise},
            ownexercise: {ownexercise},
            series: {series},
            assumedreps: {assumedreps},
            rest: {rest},
            weight: {weight},
            concentricphase:{concentricphase},
            pauseconcentricphase:{pauseconcentricphase},
            eccentricphase:{eccentricphase},
            pauseeccentricphase:{pauseeccentricphase}
          }]);
    }
    const clearState = () =>{
        // Domyślne dane
        setSeries(1)
        // setAssumedReps(1)
        // setRest(60)
        // setWeight(0)
        // setConcentricPhase(0)
        // setPauseConcentricPhase(0)
        // setEccentricPhase(0)
        // setPauseEccentricPhase(0)
    }

    const handleNewOwnExercise = async() => {
        await props.postOwnExercise(inputOwnExercise.current.value)
        await props.getExercises()
        
    }
    const handleClickExercise = (e,element) =>{
        if(activediv !== null){
            activediv.style.background = "#457B9D"
        }
        setActivediv(e.target)
        console.log(ownexerciseActive)
        if (ownexerciseActive == false){
        setExercise({id:element.id})
        setExercise({name:element.name})
        e.target.style.background = '#db3d44'}
        else{
            setOwnExercise({id:element.id})
            setOwnExercise({name:element.name})
            e.target.style.background = '#db3d44'
        }
    }
    const handleClickSelect = (e) =>{
        if (activediv !== null){
        addElementstoMainItems()
        for(let i=0;i<series;i++){
            setItemsPlaceHolders(oldArray => [...oldArray, assumedreps])
            addElementtoItems()
        }
        activediv.style.background = "#457B9D"
        setActivediv(null)
        clearState()
        }else{
            alert("Aby kontynuować musisz wybrać ćwiczenie")
        }
    }
    const changeOwnexercisetoExercise = () => {
        setExercise({id:'',name:''})
        setOwnExercise({id:'',name:''})
        setOwnExerciseActive(false)
    }
    const changeExercisetoOwnexercise = () => {
        setExercise({id:'',name:''})
        setOwnExercise({id:'',name:''})
        setOwnExerciseActive(true)
    }
    const handleChangeinTrainingItems = (e,element) =>{
        let temp = [...itemsplaceholders];
        temp[element.id] = e.target.value
        setItemsPlaceHolders(temp)
    }
    const handleAcceptTraining = () => {
        async function fetchData(data){
            await props.postTraining(data)
            await props.getTrainings()
            await handlemovetoschedulepage()
        }
        if (name_of_training.current.value === ""){
            alert("Wprowadź nazwę treningu")
        }else{
            if(training_description.current.value === ""){
                training_description.current.value = name_of_training.current.value
            }
            let splitdate = training_date.current.input.value.split("/")
            let fullday = splitdate[2] + "-" + splitdate[1] + "-" +  splitdate[0]
            let array = {
                name: name_of_training.current.value,
                description: training_description.current.value,
                date: fullday,
                training: []
            }
            let allobjects = []
            let temparray = [...itemsplaceholders]
            for(let i=0;i<seriesitems.length;i++){
                let objects = {reps: []}
                if(seriesitems[i].exercise.exercise.name !== ""){
                    objects["exercise"] = {"name" : seriesitems[i].exercise.exercise.name}
                }else{
                    objects["ownexercise"] = {"name" : seriesitems[i].ownexercise.ownexercise.name,"user":1}
                }
                objects["pause_after_concentric_phase"]=seriesitems[i].pauseconcentricphase.pauseconcentricphase
                objects["pause_after_eccentric_phase"]=seriesitems[i].pauseeccentricphase.pauseeccentricphase
                objects["weight"] = seriesitems[i].weight.weight
                objects["series"] = seriesitems[i].series.series
                objects["rest"] = seriesitems[i].rest.rest
                let secondtemparray = []
                for(let k=0; k<seriesitems[i].series.series;k++){
                    let temp = temparray.shift();
                    secondtemparray.push(temp)
                    objects['reps'] = secondtemparray  
                }
                array["training"].push(objects)
                allobjects.push(objects)
            }
            console.log(array)
            fetchData(array)
        // props.postTraining(array)
    }
}
    return (
        <div className="createtraining">
            <div className="createtraining-title">Kreator treningu</div>
            <div className="createtraining__containers">
                <div className="createtraining__containers__first">
                    <div className="createtraining__containers__first__selectors">
                        <div className="createtraining__containers__first__selectors-globalexercise" style={{color: ownexerciseActive ? 'white' : '#db3d44' }} onClick={changeOwnexercisetoExercise}>Ćwiczenia</div>
                        <div className="createtraining__containers__first__selectors-myexercise" style={{color: ownexerciseActive ? '#db3d44' : 'white' }} onClick={changeExercisetoOwnexercise}>Moje Ćwiczenia</div>
                    </div>
                    <div className="createtraining__containers__first__newexercise" style={{display: ownexerciseActive ? 'flex' : 'none' }}>
                        <div className="createtraining__containers__first__newexercise-title">Wprowadź nazwę ćwiczenia lub wyszukaj</div>
                        <span>
                            <input ref={inputOwnExercise} placeholder="Wprowadź swoje ćwiczenie" />
                        </span>
                        <div className="createtraining__containers__first__newexercise-button">
                            <button onClick={handleNewOwnExercise}>Dodaj</button>
                        </div>
                    </div>

                    <div className='createtraining__containers__first-input'>Wyszukaj ćwiczenie</div>
                    <div className="createtraining__containers__first__exercises">
                        {ownexerciseActive ? props.ownexercises.map((element)=><div className="createtraining__containers__first__exercises__element "onClick={(e)=>handleClickExercise(e,element)}>{element.name}</div>) : props.exercises.map((element)=><div className="createtraining__containers__first__exercises__element "onClick={(e)=>handleClickExercise(e,element)}>{element.name}</div>)}
                    </div>
                    <div className="createtraining__containers__first__trainingdata">
                        <div className="createtraining__containers__first__trainingdata__series">Podaj liczbę serii danego ćwiczenia *<span><input placeholder={series} value={series} onChange={(e)=>setSeries(parseInt(e.target.value))}/></span></div>
                        <div className="createtraining__containers__first__trainingdata__singleseries">Podaj liczbę powtórzeń danego ćwiczenia *<span><input placeholder={assumedreps} onChange={(e)=>setAssumedReps(parseInt(e.target.value))} /></span></div>
                        <div className="createtraining__containers__first__trainingdata__rest">Podaj czas odpoczynku w (s) *<span><input placeholder={rest} onChange={(e)=>setRest(parseInt(e.target.value))}/></span></div>
                        <div className="createtraining__containers__first__trainingdata__weight">Podaj ciężar w kg(domyślnie 0) <span><input placeholder={weight} onChange={(e)=>setWeight(parseInt(e.target.value))}/></span></div>
                        <div className="createtraining__containers__first__trainingdata__concentricphase">Czas fazy koncentrycznej <span><input placeholder={concentricphase} onChange={(e)=>setConcentricPhase(parseInt(e.target.value))}/></span></div>
                        <div className="createtraining__containers__first__trainingdata__pauseafterconcentricphase">Czas pauzy po fazie koncentrycznej <span><input placeholder={pauseconcentricphase} onChange={(e)=>setPauseConcentricPhase(parseInt(e.target.value))}/></span></div>
                        <div className="createtraining__containers__first__trainingdata__eccentricphase">Czas fazy ekscentrycznej <span><input placeholder={eccentricphase} onChange={(e)=>setEccentricPhase(parseInt(e.target.value))}/></span></div>
                        <div className="createtraining__containers__first__trainingdata__pauseaftereccentricphase">Czas pauzy po fazie ekscentrycznej <span><input placeholder={pauseeccentricphase} onChange={(e)=>setPauseEccentricPhase(parseInt(e.target.value))}/></span></div>
                    </div>
                </div>
                <div className="createtraining__containers__second">
                    <div className="createtraining__containers__second-select" onClick={handleClickSelect}>Wybierz <span> <FontAwesomeIcon icon={faArrowRight} /></span></div>
                    <div className="createtraining__containers__second-accepttraining" onClick={handleAcceptTraining}>Zaakceptuj trening</div>

                </div>
                <div className="createtraining__containers__third">
                    <div className="createtraining__containers__third-title"><span><input ref={name_of_training} placeholder="Nazwa treningu"/></span></div>
                    <div className="createtraining__containers__third-date"><span>
                    <DatePicker ref={training_date} locale='pl' dateFormat='dd/MM/yyyy' selected={startDate} onChange={date => setStartDate(date)} />
                        </span></div>
                    <div className="createtraining__containers__third-description"><span><input ref={training_description} placeholder="Opis"/></span></div>
                    <div className="createtraining__containers__third__elements">
                        <div className="createtraining__containers__third__elements-title">
                            Ćwiczenia
                        </div>
                        <div className="createtraining__containers__third__elements__element">
                            <table id="exercisetable">
                                <tr>
                                    <th>Ćwiczenie</th>
                                    <th>Powtórzenia</th>
                                    
                                </tr>
                                {items.length > 0 ? items.map((item,id)=>{
                                    return(
                                    <tr>
                                        {item.exercise.exercise.name === "" ?<td>{item.ownexercise.ownexercise.name}</td> : <td>{item.exercise.exercise.name}</td> }
                                        <td ><span><input  placeholder={itemsplaceholders[id]} onChange={(e)=>handleChangeinTrainingItems(e,{id})}/></span></td> 
                                    </tr>)
                                })
                                :<tr>
                                    </tr>}
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return{
        trainings: state.training.trainings.data,
        loadedtrainings: state.training.loadedtrainings,
        measurements: state.training.measurements.data,
        goals: state.training.goals.data,
        exercises: state.training.exercises.data,
        ownexercises: state.training.ownexercises
    }
}
export default connect(mapStateToProps,{postTraining,postOwnExercise,getTrainings,getExercises})(CreateTraining); 