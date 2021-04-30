import React, { useState, useRef } from 'react';
import DatePicker from "react-datepicker";
import { postGoals, getGoals } from '../redux/actions/trainingActions';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import '../sass/addgoals.css';
import "react-datepicker/dist/react-datepicker.css";
const AddGoals = (props) => {
    const history = useHistory()
    const [startDate, setStartDate] = useState("");
    const [actualDate, setActualDate] = useState("");
    const inputdescription = useRef("");
    const handleDate = (date) => {
        let day = date.getDay()
        let month = date.getMonth()
        let year = date.getFullYear()
        let fulldate = year + "-" + month + "-" + day
        setActualDate(fulldate)
        setStartDate(date)
    }
    const handleSendGoals = async () => {
        let data = {
            "date": actualDate,
            "description": inputdescription.current.value
        }
        await props.postGoals(data)
        await props.getGoals()
        history.push("/")

    }
    return (
        <div className="addgoals">
            <div className="addgoals-title">Dodaj Cel do zrealizowania</div>
            <div className="addgoals__container">
                <div className="addgoals__container__data-input">
                    <DatePicker locale='pl' placeholderText={"Wybierz date"} dateFormat='dd/MM/yyyy' selected={startDate} onChange={date => handleDate(date)} />
                </div>
                <div className="addgoals__container__description">
                    <input id="description" ref={inputdescription} placeholder="Podaj cel do zrealizowania" />
                </div>
                <div className="addgoals__container__button">
                    <button onClick={handleSendGoals}>Zaakceptuj nowy cel</button>
                </div>
            </div>
        </div>
    );
};

export default connect(null, { postGoals, getGoals })(AddGoals);