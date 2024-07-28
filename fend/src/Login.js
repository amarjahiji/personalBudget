import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        if (loggedInStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', {
                username,
                password
            });
            if (response.data.message === 'Login successful') {
                setIsLoggedIn(true);
                localStorage.setItem('isLoggedIn', 'true');
                setError('');
            } else {
                setError('Username or password is incorrect');
            }
        } catch (err) {
            setError('Username or password is incorrect');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    };

    return (
        <div className="wrapper">
            <div className="sloganlogin">
                <h2>NEVER.<br />FALL.<br />SHORT.</h2>
                <p>FIND OUT WHY</p>
            </div>

            <div className="login">
                <h2>Welcome Back!</h2>
                {isLoggedIn ? (
                    <div>
                        <p>You are logged in!</p>
                        <button onClick={handleLogout}>Log Out</button>
                    </div>
                ) : (
                    <div>
                        <p>Fill out the form to log in</p>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p className="error">{error}</p>}
                            <button type="submit">Log In</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
