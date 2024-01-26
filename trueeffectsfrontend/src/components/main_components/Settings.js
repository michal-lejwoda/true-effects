import React, {useState} from 'react';
import {SettingsPasswordItems} from "../settings_components/SettingsPasswordItems";
import SettingsDimensionItems from "../settings_components/SettingsDimensionItems";
import "../../new_sass/app_settings.scss";
import {faLock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWeight} from "@fortawesome/fontawesome-free-solid";
import {connect} from "react-redux";
import {changePassword, postLogoutAuth} from "../../redux/actions/authenticationActions";


const Settings = (props) => {
    const [activeState, setActiveState] = useState('DIMENSIONS')
    return (
        <div className="settings">
            <h1 className="title settings__title">Ustawienia</h1>
            <div className="menu settings__menu">
                <div className="menu__elements">
                    <div className="choices menu__choices">
                        <div className="choices__element"
                             onClick={() => setActiveState("DIMENSIONS")}><FontAwesomeIcon size="2x" icon={faWeight}/>
                        </div>
                        <div className="choices__element"
                             onClick={() => setActiveState("PASSWORD")}><FontAwesomeIcon size="2x" icon={faLock}/></div>
                    </div>
                    <div className="menu__options">
                        {(activeState === 'DIMENSIONS' && props.userDimensionConfigurationLoaded ) && <SettingsDimensionItems/>}
                        {activeState === 'PASSWORD' && <SettingsPasswordItems changePassword={props.changePassword}
                                                                              postLogoutAuth={props.postLogoutAuth}/>}
                    </div>
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        userDimensionConfiguration: state.training.userDimensionConfiguration,
        userDimensionConfigurationLoading: state.training.userDimensionConfigurationLoading,
        userDimensionConfigurationLoaded: state.training.userDimensionConfigurationLoaded,
    }
}
export default connect(mapStateToProps, {changePassword, postLogoutAuth})(Settings);
