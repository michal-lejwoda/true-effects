import React from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import {connect} from 'react-redux';
import 'moment/locale/pl';
import 'moment/locale/de';
import "../../new_sass/scheduler.scss"
import {getSingleTraining, getTrainings} from "../../redux/actions/trainingActions";
import {useHistory} from "react-router-dom";
import {BoxLoading} from "react-loadingg";
import {handleMoveToModifyTraining} from "../helpers/history_helpers";
import {useTranslation} from "react-i18next";
import i18n from "i18next";

const Scheduler = (props) => {
    const {t} = useTranslation();
    const history = useHistory()
    const localizer = momentLocalizer(moment)
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
    const handleSelect = async (e) => {
        await handleMoveToModifyTraining(history, e.id)
    }
    return props.trainingsLoaded ? (
        <div className="scheduler">
            <div className="scheduler__title">
                {t("Training Calendar")}
            </div>
            <div className="schedule">
                <Calendar
                    culture={i18n.language}
                    views={['month']}
                    selectable={true}
                    events={events}
                    onSelectEvent={handleSelect}
                    localizer={localizer}
                    style={{height: 900, width: '100%'}}
                />
            </div>
        </div>
    ) : (
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
