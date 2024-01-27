import React, {useState} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import {connect} from 'react-redux';
import 'moment/locale/pl';
import "../../new_sass/scheduler.scss"
import {getSingleTraining, getTrainings} from "../../redux/actions/trainingActions";
import DisplayTrainingOnSchedulerModal from "../scheduler_components/DisplayTrainingOnSchedulerModal";
import {useHistory} from "react-router-dom";
import {BoxLoading} from "react-loadingg";

require('moment/locale/pl.js')

const Scheduler = (props) => {
    const history = useHistory()
    const localizer = momentLocalizer(moment)
    const [showModal, setShowModal] = useState(false)
    let events = []
    if (props.trainings !== undefined) {
        props.trainings.map(el => {
            events.push({
                'id': el.id,
                'title': el.name,
                'date': el.date,
                'start': moment(Date.parse(el.date)).toDate(),
                'end': moment(Date.parse(el.date)).toDate()
            })
            return events
        })
    }
    const handleCloseModal = () => {
        setShowModal(true)
    }
    const handleSelect = async (e) => {
        await props.getSingleTraining(e.id)
        await setShowModal(true)
    }
    return props.trainingsLoaded ? (
        <div className="scheduler">
          <div className="scheduler__title">
            Kalendarz treningu
          </div>
          <div className="schedule">
            <Calendar
              culture='pl-PL'
              views={['month']}
              selectable={true}
              events={events}
              onSelectEvent={handleSelect}
              localizer={localizer}
              style={{ height: 900, width: '100%' }}
            />
            {props.trainingForModal && (
              <DisplayTrainingOnSchedulerModal
                history={history}
                trainingForModal={props.trainingForModal}
                show={showModal}
                handleClose={handleCloseModal}
                getSingleTraining={getSingleTraining}
              />
            )}
          </div>
        </div>
    ): props.trainingsLoading && (
        <div className="box-loading">
            <BoxLoading/>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        trainings: state.training.trainings.data,
        trainingsLoading: state.training.trainingsLoading,
        trainingsLoaded: state.training.trainingsLoaded,
        trainingForModal: state.training.trainingForModal
    }
}
export default connect(mapStateToProps, {getTrainings, getSingleTraining})(Scheduler);
