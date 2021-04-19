import React from 'react';
import { Redirect } from 'react-router-dom';

const HomepageTrainingItem = (props) => {
    const movetoTraining =(training)=>{
        props.allprops.history.push({pathname: '/training',training:training});
    }
    return (    
        <div className="homepage__lasttrainingscontainer__container__element">
        <div className="homepage__lasttrainingscontainer__container__element__top">
            <div className="homepage__lasttrainingscontainer__container__element__top-title">{props.training.name}</div>
            <div className="homepage__lasttrainingscontainer__container__element__top-databutton">
            <div className="homepage__lasttrainingscontainer__container__element__top-data">{props.training.date}</div>
            <div className="homepage__lasttrainingscontainer__container__element__top-button"><button onClick={()=>movetoTraining(props.training)}>Powtórz trening</button></div>
        </div>
        </div>
        <div className="homepage__lasttrainingscontainer__container__element__bottom">
            {props.training.name}
        </div>
        </div>      
    );
};
export default HomepageTrainingItem;