import React,{forwardRef,useImperativeHandle,useRef}from 'react';
import { useStopwatch } from 'react-timer-hook';
const MyStopwatch = forwardRef((props, ref) => {
  const reference = useRef()
  const {
    seconds,
    minutes,
    hours,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });
  const handleStart = () =>{
      start()
  }
  useImperativeHandle(ref, () => ({
    getAlert() {
      alert(`Zakonczono trenining w czasie ${hours<10 ? 0: ""}${hours}:${minutes<10 ? 0: ""}${minutes}:${seconds<10 ? 0: ""}${seconds}`);
    },
    handleStop(){
      pause()
  },
    async posttrain (){
      console.log(props.id)
      let string = ""
      if (hours<10){
        string += "0" + hours
        string += ":"
      }
      else{
        string += hours
        string += ":"
      }
      if (minutes<10){
        string += "0" + minutes
        string += ":"
      }
      else{
        string += minutes
        string += ":"
      }
      if (seconds<10){
        string += "0" + seconds
        
      }
      else{
        string += seconds
        
      }
      props.training.time = string
      await props.send(props.id,props.training)
      await props.get()
    }
    
  }));


  
  return (
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '100px'}}>
        <span >{hours<10 && 0}{hours}</span>:<span ref={props.refminutes}>{minutes<10 && 0}{minutes}</span>:<span ref={props.refseconds}>{seconds<10 && 0}{seconds}</span>
      </div>
      <div className="stopwatchbuttons">
        <button ref={ref} id="start" onClick={handleStart}>Start</button>
        <button id="pause" onClick={pause}>Pause</button>
        <button id="reset"onClick={reset}>Reset</button>
      </div>
    </div>
  );
})
export default MyStopwatch; 
