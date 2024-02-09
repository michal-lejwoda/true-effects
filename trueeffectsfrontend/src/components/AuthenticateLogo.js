import React from 'react';
import '../new_sass/authenticate-logo.scss';
import logo from '../images/logo.png';

const AuthenticateLogo = () => {
    return (
        <div className="block authenticate-logo__block">
            <div className="block__circle1">
                <div className="block__circle2"></div>
                <div className="block__circle3"></div>
                <div className="block__circle4">
                    <div className="block__circle4--logo">
                        <img src={logo} alt="logo"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthenticateLogo;