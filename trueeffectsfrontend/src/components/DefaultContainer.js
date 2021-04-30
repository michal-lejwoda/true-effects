import { Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import Training from './Training';
import Schedule from './Schedule';
import Homepage from './Homepage';
import AddGoals from './AddGoals';
import LoginContainer from './LoginContainer';
import { connect } from 'react-redux';
import { getMeasurements, getTrainings, getGoals, getExercises } from '../redux/actions/trainingActions';
import { postLogoutAuth } from '../redux/actions/authenticationActions';
import DisplayMeasurements from './DisplayMeasurements'
import AddMeasurements from './AddMeasurements';
import CreateTraining from './CreateTraining';
import Register from './Register';
import '../sass/defaultcontainer.scss';
import { BoxLoading } from 'react-loadingg';
import AddMeasurementsSummary from './AddMeasurementsSummary';
const DefaultContainer = (props) => {
  useEffect(() => {
    document.title = "TrueEffects"
    if (props.token === "undefined") {
      props.postLogoutAuth()
    } else if (props.token) {
      props.getMeasurements();
      props.getTrainings();
      props.getGoals();
      props.getExercises();
    } else {
      props.history.push('/login')
    }
  }, [])

  useEffect(() => {
    if (props.token === null) {
      props.history.push('/login')
    }
  }, [props.token])
  return (
    <div className="containerdefault">
      {props.loadedtrainings && props.loadedgoals && props.loadedmeasurements && props.loadedexercises ? <>
        <Navbar />
        <Navbar2 />
        <Route exact path="/" component={Homepage} />
        <Route path="/training" component={Training} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/addmeasurements" component={AddMeasurements} />
        <Route path="/displaymeasurements" component={DisplayMeasurements} />
        <Route path="/createtraining" component={CreateTraining} />
        <Route path="/measurementsummary" component={AddMeasurementsSummary} />
        <Route path="/addgoals" component={AddGoals} />
        <Route exact path="/login" component={LoginContainer} />
        <Route exact path="/register" component={Register} />
      </>
        : <BoxLoading />}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    token: state.authentication.token,
    loadedtrainings: state.training.loadedtrainings,
    loadedmeasurements: state.training.loadedmeasurements,
    loadedgoals: state.training.loadedgoals,
    loadedexercises: state.training.loadedexercises
  }
}

export default connect(mapStateToProps, { getMeasurements, getTrainings, getGoals, getExercises, postLogoutAuth })(DefaultContainer);