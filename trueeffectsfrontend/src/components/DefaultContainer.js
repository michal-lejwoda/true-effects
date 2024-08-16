import {Route, useHistory} from 'react-router-dom';
import React, {Suspense, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Settings from './main_components/Settings';
import {getUser, loadToken, postLogoutAuth} from '../redux/actions/authenticationActions';
import Scheduler from './main_components/Scheduler';
import Training from './main_components/Training';
import ModifyTraining from './main_components/ModifyTraining';
import Navbar from './navbar_components/Navbar';
import Dimensions from './main_components/Dimensions';
import Goals from './main_components/Goals';
import CreateTraining from './main_components/CreateTraining';
import Dashboard from './main_components/Dashboard';
import {BoxLoading} from 'react-loadingg';
import {useAuth} from './hooks/auth/useAuth';
import BackToTrainingModal from './default_components/modals/BackToTrainingModal';
import {useCookies} from 'react-cookie';
import {handleMoveToDashboard} from './helpers/history_helpers';
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


const DefaultContainer = (props) => {
    useAuth(props.token, props.loadToken, props.postLogoutAuth, props.history);
    const [cookies, , removeCookieTraining] = useCookies(['true_effects_training']);
    const [showBackToTrainingModal, setShowBackToTrainingModal] = useState(false);
    const history = useHistory();

    async function fetchAllData() {
        try {
            const promises = [
                props.getDimensionConfiguration(),
                props.getDimensions(),
                props.getUserDimensionsForCreate(),
                props.getDimensionConfigurationForCompare(),
                props.getTrainings(),
                props.getGoalsToAchieve(),
                props.getCompletedGoals(),
                props.getUpcomingTrainings(),
                props.getLastCompletedTrainings(),
                props.getUser()
            ];
            await Promise.all(promises);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        if (props.token) {
            fetchAllData();
        }
    }, [props.token]);

    const handleCloseBackToTrainingModal = () => {
        removeCookieTraining('true_effects_training');
        setShowBackToTrainingModal(false);
        handleMoveToDashboard(history);
    };

    useEffect(() => {
        if (cookies.true_effects_training !== undefined) {
            setShowBackToTrainingModal(true);
        }
    }, [cookies]);

    return (
        <>


            {props.token && (
                <>
                    {/*<Suspense fallback={<BoxLoading/>}>*/}
                         <Navbar/>
                        <Route exact path="/" component={Dashboard}/>
                        <Route path="/goals" component={Goals}/>
                        <Route path="/dimensions" component={Dimensions}/>
                        <Route path="/settings" component={Settings}/>
                        <Route path="/scheduler" component={Scheduler}/>
                        <Route path="/training/:trainingId" component={Training}/>
                        <Route path="/modify_training/:trainingId" component={ModifyTraining}/>
                        <Route path="/create_training" component={CreateTraining}/>
                        <BackToTrainingModal
                            handleCloseBackToTrainingModal={handleCloseBackToTrainingModal}
                            showBackToTrainingModal={showBackToTrainingModal}
                            setShowBackToTrainingModal={setShowBackToTrainingModal}
                            history={history}
                        />
                        <AchievementNotificationContainer>
                        </AchievementNotificationContainer>
                    {/*</Suspense>*/}
                </>
            )
            }
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
    getUser
})(DefaultContainer);
