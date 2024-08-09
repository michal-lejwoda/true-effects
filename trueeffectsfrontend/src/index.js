import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import {CookiesProvider} from "react-cookie";
import DefaultContainer from './components/DefaultContainer';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './store';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './new_sass/main.scss';
import Login from "./components/auth_components/Login";
import Register from "./components/auth_components/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import ResetPassword from "./components/auth_components/ResetPassword";
import PasswordChange from "./components/auth_components/PasswordChange";
import {LanguageProvider} from "./components/context/LanguageContext";
import "./i18n"

ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <StrictMode>
                <BrowserRouter>
                    {/*<LanguageProvider>*/}
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/reset_password" component={ResetPassword}/>
                        <Route path="/reset_password/:token" component={PasswordChange}/>
                        <Route component={DefaultContainer}/>
                    </Switch>
                    {/*</LanguageProvider>*/}
                </BrowserRouter>
            </StrictMode>
        </Provider>
    </CookiesProvider>,
    document.getElementById('root')
);

