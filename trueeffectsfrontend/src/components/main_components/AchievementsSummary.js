import React from 'react';
import {connect} from "react-redux";
import '../../new_sass/achievements.scss'
import {useTranslation} from "react-i18next";

const AchievementsSummary = (props) => {
    // #TODO BACK HERE
    const {t} = useTranslation();
    // #TODO BACK HERE
    const baseUrl = process.env.NODE_ENV === 'development'
    ? "http://0.0.0.0:80"
    : process.env.REACT_APP_TRUEEFFECTS_URL;
    return (
        <div className="achievements">
            <div className="achievements__title">
                <h1>{t("Achievements")}</h1>
            </div>

            {props.achievements_summary.achievements && props.achievements_summary.earned_achievements_count && props.achievements_summary.total_achievements &&
                <ul className="achievements__container">
                    <p className="achievements__container__result">{t("Achievement achieved")} {props.achievements_summary.earned_achievements_count} / {props.achievements_summary.total_achievements}</p>
                    {props.achievements_summary.achievements.map((el) => (
                        <li className={`achievements__list ${el.earned ? "achievements__list--bold" : "achievements__list--normal"}`}
                            style={{fontWeight: el.earned && 'bold'}}
                            key={el.id}>
                            <div className="list-achievements__container">
                                <img className="list-achievements__image"
                                     src={`${baseUrl}${el.image}`}
                                     alt={el.name}/>
                                <div className="list-achievements__text">
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
                                </div>
                            </div>

                        </li>

                    ))}
                </ul>
            }
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