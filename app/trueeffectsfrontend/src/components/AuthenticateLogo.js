import React from 'react';
import '../sass/authenticatelogo.scss';
import logo from '../images/logo.png' ;
const AuthenticateLogo = () => {
    return (
        <div className="authenticatelogo">
            <div className="authenticatelogo__block">
                <div className="authenticatelogo__block__circle1">
                    <div className="authenticatelogo__block__circle2"></div>
                    <div className="authenticatelogo__block__circle3"></div>
                    <div className="authenticatelogo__block__circle4">
                        <div className="authenticatelogo__block__circle4-logo">
                            <img src={logo} alt="logo"  />
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default AuthenticateLogo;