import React from 'react';

const DisplayMultiSeries = (props) => {
    const handleRemoveSingleSeries = (multiIndex, singleIndex) => {
        const updatedMultiSeries = [...props.multiSeries];
        updatedMultiSeries[multiIndex].single_series.splice(singleIndex, 1);
        props.setMultiSeries(updatedMultiSeries);
    }

    const handleRemoveMultiSeries = (multiIndex) =>{
        const updatedMultiSeries = [...props.multiSeries];
        updatedMultiSeries.splice(multiIndex, 1);
        props.setMultiSeries(updatedMultiSeries);
    }

    return (
        <div>
            {props.multiSeries.map((el, multiIndex) => {
                return (
                    <div key={el.exercise.name}>
                        <div onClick={()=>handleRemoveMultiSeries(multiIndex)} key={multiIndex}>
                            <h1>{el.exercise.name}</h1>
                        </div>
                        {el.single_series.map((element, singleIndex) => {
                            return (
                                <div key={`${multiIndex}-${singleIndex}`}>
                                    <h3>{element.exercise.name}</h3>
                                    <div onClick={()=>handleRemoveSingleSeries(multiIndex, singleIndex)}>Usuń</div>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default DisplayMultiSeries;
