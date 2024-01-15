import React, {useState} from 'react';

const DisplayMultiSeries = (props) => {
    const [visibleElements, setVisibleElements] = useState([]);
    const toggleVisibility = (elementId) => {
        setVisibleElements((prevVisibleElements) => {
            if (prevVisibleElements.includes(elementId)) {
                return prevVisibleElements.filter((id) => id !== elementId);
            } else {
                return [...prevVisibleElements, elementId];
            }
        });
    };
    const handleRemoveSingleSeries = (multiIndex, singleIndex) => {

        const updatedMultiSeries = [...props.multiSeries];
        updatedMultiSeries[multiIndex].single_series.splice(singleIndex, 1);
        props.setMultiSeries(updatedMultiSeries);
    }

    const handleRemoveMultiSeries = (multiIndex) => {
        toggleVisibility(multiIndex)
        const updatedMultiSeries = [...props.multiSeries];
        updatedMultiSeries.splice(multiIndex, 1);
        props.setMultiSeries(updatedMultiSeries);
    }

    return (
        <div className="create-training__container">
            <h1 className="create-training__title">Serie</h1>
            {props.multiSeries.map((el, multiIndex) => {
                return (
                    <div key={`${multiIndex}-${el.exercise.name}`}>
                        <div
                            // onClick={() => toggleVisibility(multiIndex)}
                            className="create-training__display-multiseries"
                             // onClick={() => toggleVisibility(multiIndex)}
                            // onClick={() => handleRemoveMultiSeries(multiIndex)} key={multiIndex}
                        >
                            <p className="create-training__display-multiseries__title">{el.exercise.name}</p>
                            <div className="create-training__display-multiseries__buttons">
                                <button className="create-training__display-multiseries__button"
                                        onClick={() => toggleVisibility(multiIndex)}
                                >
                                    Pokaż
                                </button>
                                <button className="create-training__display-multiseries__button"
                                        onClick={() => handleRemoveMultiSeries(multiIndex)} key={multiIndex}>Usuń
                                </button>
                            </div>
                        </div>
                        {visibleElements.includes(multiIndex) && el.single_series.map((element, singleIndex) => {
                            return (
                                // {visibleElements.includes(multiIndex) &&
                                <div className="create-training__display-singleseries"
                                     key={`${multiIndex}-${singleIndex}`}>
                                    {/*<h3>{element.exercise.name}</h3>*/}
                                    <div className="create-training__display-singleseries__elements__top">
                                        <p className="create-training__display-singleseries__element">Fazy: {element.concentric_phase}/{element.pause_after_concentric_phase}/{element.eccentric_phase}/{element.pause_after_eccentric_phase}</p>
                                        <p className="create-training__display-singleseries__element__title">Seria
                                            nr {singleIndex + 1}</p>

                                    </div>
                                    <div className="create-training__display-singleseries__elements">
                                        <p className="create-training__display-singleseries__element">Liczba
                                            powtórzeń: {element.reps}</p>


                                        <p className="create-training__display-singleseries__element">Waga
                                            dodatkowa: {element.extra_weight} kg</p> {/*<p>{element}</p>*/}
                                    </div>
                                    <div className="create-training__display-singleseries__elements__bottom">
                                        <p className="create-training__display-singleseries__element__bottom">Odpoczynek: {element.rest} s</p>
                                        <button className="create-training__display-singleseries__element__button"
                                                onClick={() => handleRemoveSingleSeries(multiIndex, singleIndex)}>Usuń
                                        </button>
                                    </div>
                                    {/*<div onClick={() => handleRemoveSingleSeries(multiIndex, singleIndex)}>Usuń*/}

                                    {/*</div>*/}
                                </div>
                                // }
                            );
                        })}
                    </div>
                );
            })}
            <div className="create-training__accept-training">
                <button className="standard-button" type="submit">Zaakceptuj trening</button>
            </div>
        </div>
    );
};

export default DisplayMultiSeries;
