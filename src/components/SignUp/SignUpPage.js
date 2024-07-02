import React, { useState } from 'react';
import SignUp from './SignUp';
import Header from '../Header/Header';
import './SignUp.css';
import '../../common.css';

const SignUpPage = () => {

    return (
        <div>
            <Header />
            <SignUp />
        </div>
    );
}


export default SignUpPage;
