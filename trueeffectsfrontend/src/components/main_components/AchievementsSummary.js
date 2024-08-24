import React from 'react';
import {connect} from "react-redux";
import '../../new_sass/achievements.scss'
import {useTranslation} from "react-i18next";

const AchievementsSummary = (props) => {
    console.log(props.achievements_summary)
    const {t} = useTranslation();
    return (
        <div className="achievements">
            <div className="achievements__title">
                <h1>{t("Achievements")}</h1>
            </div>
            <ul className="achievements__container">
                {props.achievements_summary.map((el) => (
                    <>
                        <li className={`achievements__list ${el.earned ? "achievements__list--bold" : "achievements__list--normal"}`}
                            style={{fontWeight: el.earned && 'bold'}}
                            key={el.id}>
                            {/*<img src={el.image} alt={el.name}/>*/}
                            <h4>{t(el.name)}</h4>
                            <p>{t(el.description)}</p>
                            <div className="achievements__list__achieved">
                                {el.earned ? (
                                    <div className="achieved">
                                        <p>{t("Achievement achieved")}: {new Date(el.date_earned).toLocaleString(t("language_code"), {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        }).replace(',', '')}</p>
                                    </div>
                                ) : (
                                    <div className="notachieved">
                                        <p>{t("Achievement not achieved")}</p>
                                    </div>
                                )}
                            </div>
                        </li>
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