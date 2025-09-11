import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import Settings from './main_components/Settings';
import {
    getUser,
    getUserAchievements,
    loadToken,
    postLogoutAuth
} from '../redux/actions/authenticationActions';
import Scheduler from './main_components/Scheduler';
import Training from './main_components/Training';
import ModifyTraining from './main_components/ModifyTraining';
import Navbar from './navbar_components/Navbar';
import Dimensions from './main_components/Dimensions';
import Goals from './main_components/Goals';
import CreateTraining from './main_components/CreateTraining';
import Dashboard from './main_components/Dashboard';
import { useAuth } from './hooks/auth/useAuth';
import BackToTrainingModal from './default_components/modals/BackToTrainingModal';
import { useCookies } from 'react-cookie';
import { handleMoveToDashboard } from './helpers/history_helpers';
import {
    getCompletedGoals,
    getDimensionConfiguration,
    getDimensionConfigurationForCompare,
    getDimensions,
    getExercises,
    getGoalsToAchieve,
    getLastCompletedTrainings,
    getSingleTraining,
    getTrainings,
    getUpcomingTrainings,
    getUserDimensionsForCreate
} from '../redux/actions/trainingActions';
import AchievementNotificationContainer from "./achievement_modals/AchievementNotificationContainer";
import AchievementsSummary from "./main_components/AchievementsSummary";

const DefaultContainer = (props) => {
    const navigate = useNavigate();
    useAuth(props.token, props.loadToken);
    const [cookies, , removeCookieTraining] = useCookies(['true_effects_training']);
    const [showBackToTrainingModal, setShowBackToTrainingModal] = useState(false);
    const abortControllerRef = useRef(null);
    const isMountedRef = useRef(true);
    const canContinue = useCallback(() => {
        return props.token && isMountedRef.current;
    }, [props.token]);

    const fetchHomepageDataSafe = useCallback(async () => {
        if (!canContinue()) {
            return;
        }

        try {
            const promises = [
                props.getDimensions(),
                props.getUpcomingTrainings(),
                props.getLastCompletedTrainings(),
                props.getUser()
            ];

            await Promise.all(promises);
        } catch (err) {
            if (canContinue()) {
            } else {
            }
        }
    }, [props.token, props.getDimensions, props.getUpcomingTrainings, props.getLastCompletedTrainings, props.getUser, canContinue]);

    const fetchRestDataSafe = useCallback(async () => {

        if (!canContinue()) {
            return;
        }

        try {
            const promises = [
                props.getDimensionConfiguration(),
                props.getUserDimensionsForCreate(),
                props.getDimensionConfigurationForCompare(),
                props.getTrainings(),
                props.getGoalsToAchieve(),
                props.getCompletedGoals(),
                props.getUser(),
                props.getUserAchievements()
            ];

            await Promise.all(promises);
        } catch (err) {
            if (canContinue()) {
            } else {
            }
        }
    }, [props.token, props.getDimensionConfiguration, props.getUserDimensionsForCreate, props.getDimensionConfigurationForCompare, props.getTrainings, props.getGoalsToAchieve, props.getCompletedGoals, props.getUser, props.getUserAchievements, canContinue]);


    useEffect(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        if (!props.token) {
            return;
        }
        abortControllerRef.current = new AbortController();

        const loadDataSafe = async () => {
            if (!canContinue()) {
                return;
            }

            try {
                await fetchHomepageDataSafe();
                if (!canContinue()) {
                    return;
                }
                await fetchRestDataSafe();
            } catch (err) {
                if (canContinue()) {
                } else {
                }
            }
        };
        loadDataSafe();
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
                abortControllerRef.current = null;
            }
        };
    }, [props.token, fetchHomepageDataSafe, fetchRestDataSafe, canContinue]);


    useEffect(() => {
        return () => {
            isMountedRef.current = false;
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    useEffect(() => {
        if (cookies.true_effects_training) {
            setShowBackToTrainingModal(true);
        }
    }, [cookies.true_effects_training]);

    const handleCloseBackToTrainingModal = () => {
        removeCookieTraining('true_effects_training');
        setShowBackToTrainingModal(false);
        handleMoveToDashboard(navigate);
    };
    if (!props.token) {
        return null;
    }

    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/goals" element={<Goals/>}/>
                <Route path="/dimensions" element={<Dimensions/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/scheduler" element={<Scheduler/>}/>
                <Route path="/training/:trainingId" element={<Training/>}/>
                <Route path="/modify_training/:trainingId" element={<ModifyTraining/>}/>
                <Route path="/create_training" element={<CreateTraining/>}/>
                <Route path="/achievements" element={<AchievementsSummary/>}/>
            </Routes>
            <BackToTrainingModal
                handleCloseBackToTrainingModal={handleCloseBackToTrainingModal}
                showBackToTrainingModal={showBackToTrainingModal}
                setShowBackToTrainingModal={setShowBackToTrainingModal}
            />
            <AchievementNotificationContainer/>
        </>
    );
};

const mapStateToProps = (state) => ({
    token: state.authentication.token,
    language_loaded: state.authentication.language_loaded,
});

export default connect(mapStateToProps, {
    getDimensionConfiguration,
    getDimensions,
    getGoalsToAchieve,
    getCompletedGoals,
    getUserDimensionsForCreate,
    getDimensionConfigurationForCompare,
    getSingleTraining,
    getTrainings,
    getExercises,
    postLogoutAuth,
    loadToken,
    getLastCompletedTrainings,
    getUpcomingTrainings,
    getUser,
    getUserAchievements
})(DefaultContainer);