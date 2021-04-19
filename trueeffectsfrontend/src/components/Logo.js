import React from 'react';
import logo from '../images/logo.png' ;
const Logo = () => {
    return (
        <div className="logo">
            <div className="logo__block">
                <div className="logo__block__circle1">
                    <div className="logo__block__circle2"></div>
                    <div className="logo__block__circle3"></div>
                    <div className="logo__block__circle4">
                        <div className="logo__block__circle4-logo">
                            <img src={logo} alt="logo"  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Logo;