import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnlineLoginForm.css';

const OnlineLoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Here, you can perform authentication logic. For simplicity, we'll use mock data.
        if (username === 'user123' && password === 'password123') {
            // Save login status to local storage
            localStorage.setItem('isLoggedIn', true);
            navigate('/onlinebooking'); // Redirect to the Online Booking form if login is successful
            
        } else {
            alert('Invalid credentials. Please try again.');
        }
    };
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className='login-form-online' onSubmit={handleLogin}>
                <div className='item'>
                    <label className='input-lable' htmlFor="username">Username:</label>
                    <input
                        className='input-item'
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className='item'>
                    <label className='input-lable' htmlFor="password">Password:</label>
                    <input
                        className='input-item'
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className='btns-online' type="submit">Login</button>
            </form>
        </div>
    )
}

export default OnlineLoginForm