import React, { useState, useEffect } from 'react';
import '../sass/displaymeasurements.css';
import { connect } from 'react-redux';
import DisplayMeasurementsItem from './DisplayMeasurementsItem';
const DisplayMeasurements = (props) => {
    const [measurements, setMeasurements] = useState(props.measurements)
    useEffect(() => {
        setMeasurements(() => {
            let meas
            if (props.measurements.length > 8) {
                meas = props.measurements.slice(8)
                meas.slice(0).reverse()
                return meas
            } else {
                meas = props.measurements.slice(0).reverse()
            }
            return meas
        })
    }, [])
    useEffect(() => {
        setMeasurements(() => {
            let meas
            if (props.measurements.length > 8) {
                meas = props.measurements.slice(8)
                meas.slice(0).reverse()
                return meas
            } else {
                meas = props.measurements.slice(0).reverse()
            }
            return meas
        })
    }, [props.measurements])
    return (
        <div className="displaymeasurements">
            <div className="displaymeasurements-title">Twoje ostatnie 9 pomiarów</div>
            <div className="displaymeasurements__containers">
                {measurements.map((measurement) => <DisplayMeasurementsItem measurement={measurement} />)}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        trainings: state.training.trainings.data,
        loadedtrainings: state.training.loadedtrainings,
        measurements: state.training.measurements.data,
        goals: state.training.goals.data
    }
}
export default connect(mapStateToProps)(DisplayMeasurements);
