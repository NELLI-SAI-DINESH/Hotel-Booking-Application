import React, { useState } from 'react';
import '../css/style.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  UserProvider } from "./Context"; // Assuming UserContext is imported

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // const { setUserLoggedIn } = useContext(UserContext); // Assuming UserContext has setUserLoggedIn method

    const navigate = useNavigate();

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Step 1: Fetch the user by email
            const response = await axios.get(`http://localhost:4001/users?email=${email}`);
    
            if (response.status === 200) {
                if (Array.isArray(response.data) && response.data.length === 0) {
                    setError("Login Failed, Email not found.");
                    sessionStorage.setItem('isLoggedIn', false);
                    <UserProvider value={false}></UserProvider>
                } else {
                    const user = response.data[0]; // Assuming only one user will match the email
    
                    // Step 2: Validate the password
                    if (user.password === password) {
                        sessionStorage.setItem('isLoggedIn', true);
                        sessionStorage.setItem('email', email);
                        <UserProvider value={true}></UserProvider>
                        navigate("/dashboardPage");
                    } else {
                        setError("Login Failed, Incorrect password.");
                        sessionStorage.setItem('isLoggedIn', false);
                        <UserProvider value={false}></UserProvider>
                    }
                }
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };
    

    return (
        <div className="registration-container">
            <form className="registration-form" onSubmit={handleSubmit}>
                <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>welcome</span>

                <label htmlFor='email'>Email Id:</label>
                <input
                    type='text'
                    id="email"
                    name="email"
                    placeholder="Email Id"
                    value={email}
                    onChange={emailChangeHandler}
                    pattern='^([a-zA-Z0-9_\-\.]+)@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,})$'
                    title='for Eg: ABC@gmail.com'
                    autoComplete="off"
                    required
                />

                <label htmlFor='password'>Password:</label>
                <input
                    type='password'
                    id="password"
                    name="password"
                    placeholder="password:"
                    autoComplete='off'
                    value={password}
                    onChange={passwordChangeHandler}
                    required
                />

                <button type="submit">Login</button>
                <p>{error}</p>
            </form>
        </div>
    );
}

export default LoginPage;
