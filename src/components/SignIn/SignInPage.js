import React, { useState } from 'react';
import Login from './SignIn';
import Header from '../Header/Header';
import './SignIn.css';
import '../../common.css';

const LoginPage = () => {

    return (
        <div>
            <Header />
            <Login />
        </div>
    );
}


export default LoginPage;
