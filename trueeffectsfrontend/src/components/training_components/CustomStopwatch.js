import React from 'react';

const CustomStopwatch = (props) => {
    return (
        <div className="stopwatch">
            <div className="stopwatch__timer">
                <span>{props.hours < 10 && 0}{props.hours}:{props.minutes < 10 && 0}{props.minutes}:{props.seconds < 10 && 0}{props.seconds}</span>
            </div>
            <div className="stopwatch__buttons">
                <button className="stopwatch__button square-buttons" id="start" onClick={props.start}>Start</button>
                <button className="stopwatch__button square-buttons" id="pause" onClick={props.pause}>Pauza</button>
                <button className="stopwatch__button square-buttons" id="reset" onClick={props.reset}>Reset</button>
            </div>
        </div>
    );
};

export default CustomStopwatch;
