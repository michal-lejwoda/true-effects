import React from 'react';
import {connect} from "react-redux";

const AchievementsSummary = (props) => {
    console.log(props.achievements_summary)
    return (
        <div>
            <h1>Achievements</h1>
            <ul>
                {props.achievements_summary.map((el) => (
                    <>
                        <li style={{ fontWeight: el.earned && 'bold' }} key={el.id}>{el.name}</li>
                    </>
                ))}
            </ul>
        </div>
    );
};
const mapStateToProps = (state) => ({
    token: state.authentication.token,
    language_loaded: state.authentication.language_loaded,
    achievements_summary: state.authentication.achievements_summary,
    achievements_summary_loaded: state.authentication.loaded
});
export default connect(mapStateToProps)(AchievementsSummary);