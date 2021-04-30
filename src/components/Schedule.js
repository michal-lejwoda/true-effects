import React from 'react';
import {Calendar , momentLocalizer} from 'react-big-calendar' 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import {connect} from 'react-redux';
import {getMeasurements,getTrainings,getGoals} from '../redux/actions/trainingActions';
import ModalDisplayTraining from './ModalDisplayTraining';
import 'moment/locale/pl';
require('moment/locale/pl.js')

export class Schedule extends React.Component {
    state = {
      modalopen:false,
      training:null,
      test:false,
      date: null,
      time: null,
      description: '',
      title: ''
    }
    handleSelectEvent = (e) =>{
      this.setState({
        modalopen:true,
        training:e.data,
        test: !this.state.test,
        date : e.date,
        time: e.time,
        description: e.description,
        title: e.title,
        alldata: e.all
      })
    }
    handleBacktoSchedule = () => {
      this.setState({
        modalopen:false
      })
    }
    
    render() {
      const {modalopen,training} = this.state
      let events = []
      this.props.trainings.map((e)=>{
        events.push({
          'title': e.name,
          'start': Date.parse(e.date),
          'end': Date.parse(e.date),
          'data': e.training,
          'date': e.date,
          'time': e.time,
          'description': e.description,
          'all': e
        })
        })
        const localizer = momentLocalizer(moment)
      return(
        <>
      <div className="schedule">
        <Calendar culture='pl-PL' views={['month']} selectable={true} 
        //onSelectSlot={(slot) => {console.log("slot select: ", slot);
          events={events} onSelectEvent={this.handleSelectEvent} localizer={localizer} style={{ height: 500,width: '95%' }}/>
        {modalopen && <ModalDisplayTraining back ={this.handleBacktoSchedule} allprops={this.props} open={this.state.modalopen} training={this.state.training} date={this.state.date} time={this.state.time} description={this.state.description} title={this.state.title} alldata={this.state.alldata}/>}

      </div>
      
      </>
      )
    }
  }
const mapStateToProps = (state) => {
    return{

        trainings: state.training.trainings.data,
        loadedtrainings: state.training.loadedtrainings,
    }
}
export default connect(mapStateToProps,{getMeasurements,getTrainings,getGoals})(Schedule);     
