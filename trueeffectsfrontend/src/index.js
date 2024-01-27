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
ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <StrictMode>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route component={DefaultContainer}/>
                    </Switch>
                </BrowserRouter>
            </StrictMode>
        </Provider>
    </CookiesProvider>,
    document.getElementById('root')
);

