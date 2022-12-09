import React from 'react';
import axios from '../axios';
import { useNavigate } from "react-router-dom";
import "../styles/Loginscreen.scss";

const Login = () => {
    const navigate = useNavigate();

    const axiosLoginCall = () => {
        axios.post("/login", {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then((res) => {
            if (res.data === "User Logged In.") {
                navigate('/monthly-plans');
            }
        })
    }

    return (
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
    )
}

export default Login;