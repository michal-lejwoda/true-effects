import React, { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from "react-cookie";
import DefaultContainer from './components/DefaultContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './new_sass/main.scss';
import Login from "./components/auth_components/Login";
import Register from "./components/auth_components/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import ResetPassword from "./components/auth_components/ResetPassword";
import PasswordChange from "./components/auth_components/PasswordChange";
import "./i18n"
import { ClipLoader } from "react-spinners";
import {createRoot} from "react-dom/client";
const root = createRoot(document.getElementById("root"));
root.render(
    <CookiesProvider>
        <Provider store={store}>
            <StrictMode>
                <BrowserRouter>
                    <Suspense fallback={<ClipLoader />}>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/reset_password" element={<ResetPassword />} />
                            <Route path="/reset_password/:token" element={<PasswordChange />} />
                            <Route path="/*" element={<DefaultContainer />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </StrictMode>
        </Provider>
    </CookiesProvider>
);