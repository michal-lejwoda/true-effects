import React, { forwardRef, useImperativeHandle } from 'react';
import { useStopwatch } from 'react-timer-hook';
import "../../new_sass/stopwatch.scss";

const MyStopwatch = forwardRef((props, ref) => {
  const {
    seconds,
    minutes,
    hours,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });
  const handleStart = () => {
    start()
  }
  useImperativeHandle(ref, () => ({
    getAlert() {
      alert(`Zakonczono trenining w czasie ${hours < 10 ? 0 : ""}${hours}:${minutes < 10 ? 0 : ""}${minutes}:${seconds < 10 ? 0 : ""}${seconds}`);
    },
    handleStop() {
      pause()
    },
    async posttrain() {
      let string = ""
      if (hours < 10) {
        string += "0" + hours
        string += ":"
      }
      else {
        string += hours
        string += ":"
      }
      if (minutes < 10) {
        string += "0" + minutes
        string += ":"
      }
      else {
        string += minutes
        string += ":"
      }
      if (seconds < 10) {
        string += "0" + seconds

      }
      else {
        string += seconds

      }
      props.training.time = string
      await props.send(props.id, props.training)
      await props.get()
    }

  }));



  return (
    <div className="stopwatch">
      <div className="stopwatch__timer">
        <span>{hours < 10 && 0}{hours}:{minutes < 10 && 0}{minutes}:{seconds < 10 && 0}{seconds}</span>
      </div>
      <div className="stopwatch__buttons">
        <button className="stopwatch__button square-buttons" id="start" onClick={handleStart}>Start</button>
        <button className="stopwatch__button square-buttons" id="pause" onClick={pause}>Pauza</button>
        <button className="stopwatch__button square-buttons" id="reset" onClick={reset}>Reset</button>
      </div>
    </div>
  );
})
export default MyStopwatch;
