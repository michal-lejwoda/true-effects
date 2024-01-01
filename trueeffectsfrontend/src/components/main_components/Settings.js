import React, {useState} from 'react';
import {PasswordItems} from "../settings_components/PasswordItems";
import {DimensionItems} from "../settings_components/DimensionItems";

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
                    {activeState === 'DIMENSIONS' && <DimensionItems />}
                    {activeState === 'PASSWORD' && <PasswordItems />}

                </div>
            </div>
        </div>

    );
};

export default Settings;
