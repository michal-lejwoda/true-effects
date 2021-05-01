import React from 'react';
import { useHistory } from "react-router-dom";
const HomepageMeasurementItem = (props) => {
    const history = useHistory()

    const addNewMeasurement = () => {
        history.push('./addmeasurements')

    }
    return (
        <>      {props.measurement.length > 0 ? <>
            <div className="homepage__measurementcontainer-data">Pomiary na dzień {props.measurement[props.measurement.length - 1].date}</div>
            <div className="homepage__measurementcontainer-add"><button onClick={addNewMeasurement}>+ Dodaj nowe pomiary</button></div>
            <div className="homepage__measurementcontainer__container">
                <div className="homepage__measurementcontainer__container__element">
                    <div className="homepage__measurementcontainer__container__element-name">Prawy biceps</div>
                    <div className="homepage__measurementcontainer__container__element-result">{props.measurement[props.measurement.length - 1].right_biceps}  cm</div>
                </div>
                <div className="homepage__measurementcontainer__container__element">
                    <div className="homepage__measurementcontainer__container__element-name">Lewy biceps</div>
                    <div className="homepage__measurementcontainer__container__element-result">{props.measurement[props.measurement.length - 1].left_biceps} cm</div>
                </div>
                <div className="homepage__measurementcontainer__container__element">
                    <div className="homepage__measurementcontainer__container__element-name">Prawe przedramię</div>
                    <div className="homepage__measurementcontainer__container__element-result">{props.measurement[props.measurement.length - 1].right_forearm} cm</div>
                </div>
                <div className="homepage__measurementcontainer__container__element">
                    <div className="homepage__measurementcontainer__container__element-name">Lewe przedramię</div>
                    <div className="homepage__measurementcontainer__container__element-result">{props.measurement[props.measurement.length - 1].left_forearm}  cm</div>
                </div>
                <div className="homepage__measurementcontainer__container__element">
                    <div className="homepage__measurementcontainer__container__element-name">Udo prawej nogi</div>
                    <div className="homepage__measurementcontainer__container__element-result">{props.measurement[props.measurement.length - 1].right_leg} cm</div>
                </div>
                <div className="homepage__measurementcontainer__container__element">
                    <div className="homepage__measurementcontainer__container__element-name">Udo lewej nogi</div>
                    <div className="homepage__measurementcontainer__container__element-result">{props.measurement[props.measurement.length - 1].right_leg} cm</div>
                </div>
                <div className="homepage__measurementcontainer__container__element">
                    <div className="homepage__measurementcontainer__container__element-name">Waga</div>
                    <div className="homepage__measurementcontainer__container__element-result">{props.measurement[props.measurement.length - 1].weight}kg</div>
                </div>
                <div className="homepage__measurementcontainer__container__element">
                    <div className="homepage__measurementcontainer__container__element-name">Wzrost</div>
                    <div className="homepage__measurementcontainer__container__element-result">{props.measurement[props.measurement.length - 1].growth} cm</div>
                </div>
                {/* <div className="homepage__measurementcontainer__container__element">
                        <div className="homepage__measurementcontainer__container__element-name">Tkanka Tłuszczowa</div>
                        <div className="homepage__measurementcontainer__container__element-result">{props.measurement[props.measurement.length-1].bodyfat} %</div>
                
                </div> */}
            </div> </> : <div className="homepage__measurementcontainer__title">
            <div className="homepage__measurementcontainer-title">Twoje ostatnie pomiary</div>
            <div className="homepage__measurementcontainer-add"><button onClick={addNewMeasurement}>+ Dodaj nowe pomiary</button></div>
            <p>Nie masz aktualnie żadnych pomiarów.</p>
        </div>
        }
        </>
    );
};

export default HomepageMeasurementItem;