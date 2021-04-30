import React from 'react';
import Logo from './Logo';
import '../sass/addmeasurementssummary.scss';
import { connect } from 'react-redux';
import { getMeasurements } from '../redux/actions/trainingActions';
import { useHistory } from "react-router-dom";
const AddMeasurementsSummary = (props) => {
    const history = useHistory()
    const handlemovetohomepage = () => {
        history.push('/')
    }
    return (
        <div className="addmeasurementssummary">
            <Logo />
            <div className="addmeasurementssummary-title">Właśnie zaaktualizowałeś swoje pomiary</div>
            <div className="addmeasurementssummary-secondtitle">Zmiany:</div>
            {props.olddata !== undefined ?
                <div className="addmeasurementssummary__elements">
                    <div className="addmeasurementssummary__elements__element" style={{ color: props.olddata.weight >= props.newdata.weight ? 'red' : 'green' }}>Waga <span>{props.olddata.weight}{'=>'}{props.newdata.weight}</span></div>
                    <div className="addmeasurementssummary__elements__element" style={{ color: props.olddata.growth >= props.newdata.growth ? 'red' : 'green' }}>Wzrost <span>{props.olddata.growth}{'=>'}{props.newdata.growth}</span></div>
                    <div className="addmeasurementssummary__elements__element" style={{ color: props.olddata.left_biceps >= props.newdata.left_biceps ? 'red' : 'green' }}>Lewy biceps <span>{props.olddata.left_biceps}{'=>'}{props.newdata.left_biceps}</span></div>
                    <div className="addmeasurementssummary__elements__element" style={{ color: props.olddata.right_biceps >= props.newdata.right_biceps ? 'red' : 'green' }}>Prawy biceps <span>{props.olddata.right_biceps}{'=>'}{props.newdata.right_biceps}</span></div>
                    <div className="addmeasurementssummary__elements__element" style={{ color: props.olddata.left_forearm >= props.newdata.left_forearm ? 'red' : 'green' }}>Lewe przedramię <span>{props.olddata.left_forearm}{'=>'}{props.newdata.left_forearm}</span></div>
                    <div className="addmeasurementssummary__elements__element" style={{ color: props.olddata.right_forearm >= props.newdata.right_forearm ? 'red' : 'green' }}>Prawe przedramię <span>{props.olddata.right_forearm}{'=>'}{props.newdata.right_forearm}</span></div>
                    <div className="addmeasurementssummary__elements__element" style={{ color: props.olddata.left_leg >= props.newdata.left_leg ? 'red' : 'green' }}>Lewa noga <span>{props.olddata.left_leg}{'=>'}{props.newdata.left_leg}</span></div>
                    <div className="addmeasurementssummary__elements__element" style={{ color: props.olddata.right_leg >= props.newdata.right_leg ? 'red' : 'green' }}>Prawa noga <span>{props.olddata.right_leg}{'=>'}{props.newdata.right_leg}</span></div>
                    <div className="addmeasurementssummary__elements__element"></div>
                </div>
                : <div className="addmeasurementssummary__elements">
                    <div className="addmeasurementssummary__elements__element" >Waga <span>{props.newdata.weight}</span></div>
                    <div className="addmeasurementssummary__elements__element" >Wzrost <span>{props.newdata.growth}</span></div>
                    <div className="addmeasurementssummary__elements__element" >Lewy biceps <span>{props.newdata.left_biceps}</span></div>
                    <div className="addmeasurementssummary__elements__element" >Prawy biceps <span>{props.newdata.right_biceps}</span></div>
                    <div className="addmeasurementssummary__elements__element" >Lewe przedramię <span>{props.newdata.left_forearm}</span></div>
                    <div className="addmeasurementssummary__elements__element" >Prawe przedramię <span>{props.newdata.right_forearm}</span></div>
                    <div className="addmeasurementssummary__elements__element" >Lewa noga <span>{props.newdata.left_leg}</span></div>
                    <div className="addmeasurementssummary__elements__element" >Prawa noga <span>{props.newdata.right_leg}</span></div>
                    <div className="addmeasurementssummary__elements__element"></div>
                </div>}
            <div className="addmeasurementssummary__button">
                <button onClick={handlemovetohomepage}>Dalej</button>
            </div>


        </div>
    );
};
const mapStateToProps = (state) => {
    return {

        measurements: state.training.measurements.data,

    }
}
export default connect(mapStateToProps, { getMeasurements })(AddMeasurementsSummary);