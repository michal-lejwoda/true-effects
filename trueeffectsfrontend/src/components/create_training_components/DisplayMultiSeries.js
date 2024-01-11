import React from 'react';

const DisplayMultiSeries = (props) => {
    console.log(props.multiSeries)
    return (
        <div>
            {props.multiSeries.map(el => {
                console.log("Eer")
                console.log(el)
                return (
                    <div key={el.exercise.name}>
                        <h1>{el.exercise.name}</h1>
                        {el.single_series.map(element => {
                            console.log(element)
                            return (
                                <h1 key={element}>{element.exercise.name}</h1>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default DisplayMultiSeries;
