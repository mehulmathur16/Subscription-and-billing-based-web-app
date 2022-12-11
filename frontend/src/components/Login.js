import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from "react-router-dom";
import { NotificationManager } from 'react-notifications';
import Loader from './Loader';

import "../styles/Loginscreen.scss";

const Login = ({ setLoggedInUser }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const axiosLoginCall = () => {
        setLoading(true);
        document.getElementsByClassName('login-screen')[0].style.opacity = '0.3';

        axios.post("/login", {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then((res) => {
            if (res.data.success) {
                NotificationManager.success('Have a great experience!', 'Logged In!', 1500);
                setTimeout(() => {
                    document.getElementsByClassName('login-screen')[0].style.opacity = '1';
                    setLoading(false);
                    setLoggedInUser(res.data.email);
                    navigate('/monthly-plans');
                }, 1500);
            }
            else {
                NotificationManager.warning('Please try again.', 'Wrong Credentials!', 3000);
                document.getElementsByClassName('login-screen')[0].style.opacity = '1';
                setLoading(false);
            }
        })
    }

    return (
        <>
            {(loading) ? <Loader /> : null}
            <div className='login-screen'>
                <div className='login-screen__container'>
                    <div className='login-screen__heading'>
                        Login to your account
                    </div>

                    <div className='login-screen__field-container'>
                        <label className='login-screen__field-label'>
                            Email
                        </label>
                        <input type="email" className='login-screen__field-input' id='email' />
                    </div>

                    <div className='login-screen__field-container'>
                        <label className='login-screen__field-label'>
                            Password
                        </label>
                        <input type="password" className='login-screen__field-input' id='password' />
                    </div>

                    <div className='login-screen__checkbox-container'>
                        <input type='checkbox' /> <span style={{ fontSize: '0.7rem', fontWeight: '500' }}>Remember Me</span>
                    </div>

                    <button className='login-screen__signup-button' onClick={(e) => {
                        e.preventDefault();
                        axiosLoginCall();
                    }}>Login</button>

                    <div className='login-screen__login-option'>
                        New to MyApp? <span style={{ color: '#0073cf', cursor: 'pointer' }} onClick={() => {
                            navigate('/register');
                        }}>Sign Up</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;