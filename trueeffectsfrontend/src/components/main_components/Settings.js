import React, {useState} from 'react';
import {SettingsPasswordItems} from "../settings_components/SettingsPasswordItems";
import SettingsDimensionItems from "../settings_components/SettingsDimensionItems";
import "../../new_sass/app_settings.scss";
import {faBars, faLock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWeight} from "@fortawesome/fontawesome-free-solid";


const Settings = () => {
    const [activeState, setActiveState] = useState('DIMENSIONS')
    return (
        <div className="settings">
            <h1 className="title settings__title">Ustawienia</h1>
            <div className="settings__container">
                <div className="settings__container__menu">
                    <div className="settings__container__menu-dimensions settings__container__menu__element" onClick={()=>setActiveState("DIMENSIONS")}><FontAwesomeIcon size="2x" icon={faWeight}/></div>
                    <div className="settings__container__menu-password settings__container__menu__element" onClick={()=>setActiveState("PASSWORD")}><FontAwesomeIcon size="2x" icon={faLock}/></div>
                </div>
                <div className="settings__container__options">
                    {activeState === 'DIMENSIONS' && <SettingsDimensionItems />}
                    {activeState === 'PASSWORD' && <SettingsPasswordItems />}

                </div>
            </div>
        </div>

    );
};

export default Settings;
