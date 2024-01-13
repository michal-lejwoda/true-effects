import React, {useState} from 'react';
import {Calendar, momentLocalizer, Views} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import {connect} from 'react-redux';
// import { getMeasurements, getTrainings, getGoals } from '../redux/actions/trainingActions';
// import ModalDisplayTraining from './ModalDisplayTraining';
import 'moment/locale/pl';
import "../../new_sass/scheduler.scss"
import {getGoals, getMeasurements, getSingleTraining, getTrainings} from "../../redux/actions/trainingActions";
import DisplayTrainingOnSchedulerModal from "../scheduler_components/DisplayTrainingOnSchedulerModal";
import {useHistory} from "react-router-dom";

require('moment/locale/pl.js')
// const allViews = Object.keys(Views).map(k => Views[k])
// console.log("allViews")
// console.log(allViews)
const Scheduler = (props) => {
    const history = useHistory()
    const localizer = momentLocalizer(moment)
    const [showModal, setShowModal] = useState(false)
    console.log(props.trainings)
    let events = []
    props.trainings.map(el => {
        events.push({
            'id': el.id,
            'title': el.name,
            'date': el.date,
            'start': moment(Date.parse(el.date)).toDate(),
            'end': moment(Date.parse(el.date)).toDate()
        })
    })
    const handleCloseModal = () => {
        setShowModal(true)
    }
    const handleSelect = async (e) => {
        await props.getSingleTraining(e.id)
        await setShowModal(true)
    }
    return (
        <div className="scheduler">
            <div className="scheduler__title">
                Kalendarz treningu
            </div>
            <div className="schedule">
                <Calendar culture='pl-PL' views={['month']} selectable={true}
                          events={events}
                          onSelectEvent={handleSelect}
                          localizer={localizer} style={{height: 900, width: '100%'}}/>
                {props.trainingForModal &&
                    <DisplayTrainingOnSchedulerModal history={history} trainingForModal={props.trainingForModal}
                                                     show={showModal} handleClose={handleCloseModal}
                                                     getSingleTraining={getSingleTraining}
                                                     trainingForModal={props.trainingForModal}/>}
                {/*{modalopen && <ModalDisplayTraining back={this.handleBacktoSchedule} allprops={this.props} open={this.state.modalopen} training={this.state.training} date={this.state.date} time={this.state.time} description={this.state.description} title={this.state.title} alldata={this.state.alldata} />}*/}

            </div>

        </div>
    )
}


// export class Schedule extends React.Component {
//   state = {
//     modalopen: false,
//     training: null,
//     test: false,
//     date: null,
//     time: null,
//     description: '',
//     title: ''
//   }
//   handleSelectEvent = (e) => {
//     this.setState({
//       modalopen: true,
//       training: e.data,
//       test: !this.state.test,
//       date: e.date,
//       time: e.time,
//       description: e.description,
//       title: e.title,
//       alldata: e.all
//     })
//   }
//   handleBacktoSchedule = () => {
//     this.setState({
//       modalopen: false
//     })
//   }
//
//   render() {
//     const { modalopen } = this.state
//     let events = []
//     // this.props.trainings.map((e) => {
//     //   events.push({
//     //     'title': e.name,
//     //     'start': moment(Date.parse(e.date)).toDate(),
//     //     'end': moment(Date.parse(e.date)).toDate(),
//     //     'data': e.training,
//     //     'date': e.date,
//     //     'time': e.time,
//     //     'description': e.description,
//     //     'all': e
//     //   })
//     //   return events
//     // })
//     const localizer = momentLocalizer(moment)
//     return (
//       <>
//         <div className="schedule">
//           <Calendar culture='pl-PL' views={allViews} selectable={true}
//             events={events}
//             onSelectEvent={this.handleSelectEvent}
//             localizer={localizer} style={{ height: 900, width: '95%' }} />
//           {/*{modalopen && <ModalDisplayTraining back={this.handleBacktoSchedule} allprops={this.props} open={this.state.modalopen} training={this.state.training} date={this.state.date} time={this.state.time} description={this.state.description} title={this.state.title} alldata={this.state.alldata} />}*/}
//
//         </div>
//
//       </>
//     )
//   }
// }
const mapStateToProps = (state) => {
    return {
        trainings: state.training.trainings.data,
        loadedtrainings: state.training.loadedtrainings,
        trainingForModal: state.training.trainingForModal
    }
}
export default connect(mapStateToProps, {getMeasurements, getTrainings, getGoals, getSingleTraining})(Scheduler);
