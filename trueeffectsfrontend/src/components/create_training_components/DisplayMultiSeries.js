import React from 'react';
import {useDisplayMultiSeries} from "../hooks/training/useDisplayMultiSeries";
import {useTranslation} from "react-i18next";

const DisplayMultiSeries = (props) => {
    const [visibleElements, handleRemoveSingleSeries, handleRemoveMultiSeries, toggleVisibility] = useDisplayMultiSeries(props)
    const {t} = useTranslation();
    return (
        <div className="display-series create-training__display-series">
            <h1 className="display-series__title">{t("Series")}</h1>
            {props.multiSeries.length === 0 &&
                <p className="display-series__no-data">{t("No series have been created yet. Go to the 'Create Series' section and create one.")}</p>}
            <div className="container display-series__container">
                {props.multiSeries.map((el, multiIndex) => {
                    return (
                        <div className="multiseries container__multiseries" key={`${multiIndex}-${el.exercise.name}`} >
                            <div className="single-multiseries multiseries__single-multiseries">
                                <p className="single-multiseries__title"><span>{el.exercise.name}</span><span className="single-multiseries__title--red">{t("Series number")}: {el.single_series.length}</span></p>
                                <div className="single-multiseries__buttons">
                                    <button className="buttons__button"
                                            onClick={() => toggleVisibility(multiIndex)}>
                                        {t("Show")}
                                    </button>
                                    <button className="buttons__button"
                                            onClick={() => handleRemoveMultiSeries(multiIndex)} key={multiIndex}>
                                        {t("Delete")}
                                    </button>
                                </div>
                            </div>
                            {visibleElements.includes(multiIndex) && el.single_series.map((element, singleIndex) => {
                                return (
                                    <div className="single-singleseries single-multiseries__single-singleseries"
                                         key={`${multiIndex}-${singleIndex}`}>
                                        <div className="single-singleseries__header">
                                            <p className="header__phase">{t("Phases")}: {element.concentric_phase}/{element.pause_after_concentric_phase}/{element.eccentric_phase}/{element.pause_after_eccentric_phase}</p>
                                            <p className="header__title">{t("Series No.")} {singleIndex + 1}</p>

                                        </div>
                                        <div className="middle single-singleseries__middle">
                                            <p className="middle__reps">{"Repetitions number"}: {element.reps}</p>
                                            <p className="middle__weight">{t("Additional weight")}: {element.extra_weight} kg</p>
                                        </div>
                                        <div className="bottom single-singleseries__bottom">
                                            <p className="bottom__rest">{"Rest"}: {element.rest} s</p>
                                            <button className="bottom__button"
                                                    onClick={() => handleRemoveSingleSeries(multiIndex, singleIndex)}>{t("Delete")}
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
                    <button className="standard-button" onClick={props.handleSubmit}>{t("Accept Training")}</button>
                </div>
            }
        </div>
    );
};

export default DisplayMultiSeries;
