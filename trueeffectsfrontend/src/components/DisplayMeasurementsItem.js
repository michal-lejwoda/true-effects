import React from 'react';
import { connect } from 'react-redux'
import { deleteMeasurement, getMeasurements } from '../redux/actions/trainingActions';
const DisplayMeasurementsItem = (props) => {

    const handleDeleteMeasurement = async () => {
        await props.deleteMeasurement(props.measurement.id)
        await props.getMeasurements()
    }
    return (
        <div className="displaymeasurements__containers__container">
            <div className="displaymeasurements__containers__container__elements">
                <div className="displaymeasurements__containers__container__elements-date">Data : {props.measurement.date}</div>
                <div className="displaymeasurements__containers__container__elements__element-delete"><button onClick={handleDeleteMeasurement}>Usuń pomiar</button></div>
                <div className="displaymeasurements__containers__container__elements__element">

                    <div className="displaymeasurements__containers__container__elements__element-name">Waga</div>
                    <div className="displaymeasurements__containers__container__elements__element-result">{props.measurement.weight} kg</div>
                </div>
                <div className="displaymeasurements__containers__container__elements__element">
                    <div className="displaymeasurements__containers__container__elements__element-name">Wzrost</div>
                    <div className="displaymeasurements__containers__container__elements__element-result">{props.measurement.growth} cm</div>
                </div>
                <div className="displaymeasurements__containers__container__elements__element">
                    <div className="displaymeasurements__containers__container__elements__element-name">Prawy biceps</div>
                    <div className="displaymeasurements__containers__container__elements__element-result">{props.measurement.right_biceps} cm</div>
                </div>
                <div className="displaymeasurements__containers__container__elements__element">
                    <div className="displaymeasurements__containers__container__elements__element-name">Lewy biceps</div>
                    <div className="displaymeasurements__containers__container__elements__element-result">{props.measurement.left_biceps} cm</div>
                </div>
                <div className="displaymeasurements__containers__container__elements__element">
                    <div className="displaymeasurements__containers__container__elements__element-name">Prawe przedramię</div>
                    <div className="displaymeasurements__containers__container__elements__element-result">{props.measurement.right_forearm} cm</div>
                </div>
                <div className="displaymeasurements__containers__container__elements__element">
                    <div className="displaymeasurements__containers__container__elements__element-name">Lewe przedramię</div>
                    <div className="displaymeasurements__containers__container__elements__element-result">{props.measurement.left_forearm} cm</div>
                </div>
                <div className="displaymeasurements__containers__container__elements__element">
                    <div className="displaymeasurements__containers__container__elements__element-name">Prawe udo</div>
                    <div className="displaymeasurements__containers__container__elements__element-result">{props.measurement.right_leg} cm</div>
                </div>
                <div className="displaymeasurements__containers__container__elements__element">
                    <div className="displaymeasurements__containers__container__elements__element-name">Lewe udo</div>
                    <div className="displaymeasurements__containers__container__elements__element-result">{props.measurement.left_leg} cm</div>
                </div>
            </div>
        </div>
    );
};
const mapDispatchToProps = () => dispatch => {
    return {
        deleteMeasurement: (x) => dispatch(deleteMeasurement(x)),
        getMeasurements: () => dispatch(getMeasurements()),
    };
};
export default connect(null, mapDispatchToProps)(DisplayMeasurementsItem);