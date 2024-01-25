import React from 'react';
import {useDisplayMultiSeries} from "../hooks/training/useDisplayMultiSeries";

const DisplayMultiSeries = (props) => {
    const [visibleElements, handleRemoveSingleSeries, handleRemoveMultiSeries, toggleVisibility] = useDisplayMultiSeries(props)

    return (
        <div className="display-series create-training__display-series">
            <h1 className="display-series__title">Serie</h1>
            {props.multiSeries.length == 0 &&
                <p className="display-series__no-data">Nie została jeszcze stworzona żadna seria przejdź do sekcji
                    Stwórz Serie i ją utwórz</p>}
            <div className="container display-series__container">
                {props.multiSeries.map((el, multiIndex) => {
                    return (
                        <div className="multiseries container__multiseries" key={`${multiIndex}-${el.exercise.name}`} >
                            <div className="single-multiseries multiseries__single-multiseries">
                                <p className="single-multiseries__title">{el.exercise.name}</p>
                                <div className="single-multiseries__buttons">
                                    <button className="buttons__button"
                                            onClick={() => toggleVisibility(multiIndex)}>
                                        Pokaż
                                    </button>
                                    <button className="buttons__button"
                                            onClick={() => handleRemoveMultiSeries(multiIndex)} key={multiIndex}>
                                        Usuń
                                    </button>
                                </div>
                            </div>
                            {visibleElements.includes(multiIndex) && el.single_series.map((element, singleIndex) => {
                                return (
                                    <div className="single-singleseries single-multiseries__single-singleseries"
                                         key={`${multiIndex}-${singleIndex}`}>
                                        <div className="single-singleseries__header">
                                            <p className="header__phase">Fazy: {element.concentric_phase}/{element.pause_after_concentric_phase}/{element.eccentric_phase}/{element.pause_after_eccentric_phase}</p>
                                            <p className="header__title">Seria nr {singleIndex + 1}</p>

                                        </div>
                                        <div className="middle single-singleseries__middle">
                                            <p className="middle__reps">Liczba powtórzeń: {element.reps}</p>
                                            <p className="middle__weight">Waga dodatkowa: {element.extra_weight} kg</p>
                                        </div>
                                        <div className="bottom single-singleseries__bottom">
                                            <p className="bottom__rest">Odpoczynek: {element.rest} s</p>
                                            <button className="bottom__button"
                                                    onClick={() => handleRemoveSingleSeries(multiIndex, singleIndex)}>Usuń
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            {props.multiSeries.length !== 0 &&
                <div className="create-training__accept-training">
                    <button className="standard-button" onClick={props.handleSubmit}>Zaakceptuj trening</button>
                </div>
            }
        </div>
    );
};

export default DisplayMultiSeries;
