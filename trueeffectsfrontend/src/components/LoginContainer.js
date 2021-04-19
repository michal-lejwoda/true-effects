import { BrowserRouter, Route,Redirect } from 'react-router-dom';
import React, {useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import '../sass/defaultcontainer.scss';

const LoginContainer = () => {
  useEffect(()=>{
    document.title = "TrueEffects"
  },[])
  return(
    <div className="containerlogin">
      {/* <Route exact path="/" render={() => <Redirect to="/login" />} /> */}
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </div>
)}
export default LoginContainer