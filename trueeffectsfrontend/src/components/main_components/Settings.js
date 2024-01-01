import React, {useState} from 'react';
import {SettingsPasswordItems} from "../settings_components/SettingsPasswordItems";
import SettingsDimensionItems from "../settings_components/SettingsDimensionItems";


const Settings = () => {
    const [activeState, setActiveState] = useState('DIMENSIONS')
    return (
        <div className="settings">
            <div className="settings__container">
                <div className="settings__container__menu">
                    <div className="settings__container__menu-dimensions" onClick={()=>setActiveState("DIMENSIONS")}>Pomiary</div>
                    <div className="settings__container__menu-password" onClick={()=>setActiveState("PASSWORD")}>Hasło</div>
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
