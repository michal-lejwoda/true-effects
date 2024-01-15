import React from 'react';
import {useDisplayMultiSeries} from "../hooks";

const DisplayMultiSeries = (props) => {
    const [visibleElements, handleRemoveSingleSeries, handleRemoveMultiSeries, toggleVisibility] = useDisplayMultiSeries(props)

    return (
        <div className="create-training__container">
            <h1 className="title create-training__title">Serie</h1>
            {props.multiSeries.length == 0 &&
                <p className="create-training__no-data">Nie została jeszcze stworzona żadna seria przejdź do sekcji
                    Stwórz Serie i ją utwórz</p>
            }
            {props.multiSeries.map((el, multiIndex) => {
                return (
                    <div key={`${multiIndex}-${el.exercise.name}`}>
                        <div className="create-training__display-multiseries">
                            <p className="create-training__display-multiseries__title">{el.exercise.name}</p>
                            <div className="create-training__display-multiseries__buttons">
                                <button className="create-training__display-multiseries__button"
                                        onClick={() => toggleVisibility(multiIndex)}>
                                    Pokaż
                                </button>
                                <button className="create-training__display-multiseries__button"
                                        onClick={() => handleRemoveMultiSeries(multiIndex)} key={multiIndex}>
                                    Usuń
                                </button>
                            </div>
                        </div>
                        {visibleElements.includes(multiIndex) && el.single_series.map((element, singleIndex) => {
                            return (
                                <div className="create-training__display-singleseries"
                                     key={`${multiIndex}-${singleIndex}`}>
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
                                </div>
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
