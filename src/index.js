import React from 'react';
import ReactDOM from 'react-dom';
import LoginContainer from './components/LoginContainer';
import DefaultContainer from './components/DefaultContainer';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route,Switch } from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './store';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './sass/index.scss';
ReactDOM.render(
  
  <Provider store={store}>
  <BrowserRouter>
  <Switch>
    <Route exact path="/(login)" component={LoginContainer}/>
    <Route exact path="/(register)" component={LoginContainer}/>
    <Route component={DefaultContainer} />
  </Switch>
</BrowserRouter>
</Provider>,
  document.getElementById('root')
);

reportWebVitals();
