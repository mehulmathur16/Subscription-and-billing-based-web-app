import React from 'react'
import axios from '../axios';
import { useNavigate } from "react-router-dom";
import "../styles/Loginscreen.scss";

const Register = () => {
    const navigate = useNavigate();

    const axiosPostRequest = () => {
        axios.post("/register", {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then((res) => {
            navigate('/');
        })
    }

    return (
        <div className='login-screen'>
            <div className='login-screen__container'>
                <div className='login-screen__heading'>
                    Create Account
                </div>

                <div className='login-screen__field-container'>
                    <label className='login-screen__field-label'>
                        Name
                    </label>
                    <input type="text" className='login-screen__field-input' id='name' />
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
                    axiosPostRequest();
                }}>Sign Up</button>

                <div className='login-screen__login-option'>
                    Already have an account? <span style={{ color: '#0073cf', cursor: 'pointer' }} onClick={() => {
                        navigate('/');
                    }}> Login </span>
                </div>
            </div>
        </div>
    )
}

export default Register;