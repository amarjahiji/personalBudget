import React, { useState } from 'react';

const Signup = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstname, lastname, username, password }),
        });
        const data = await response.json();
        if (data.error) {
            setError(data.error);
        } else {
            setError('');
        }
    };

    return (
        <div className="wrapper">
            <div className="sloganlogin">
                <h2>NEVER.<br />FALL.<br />SHORT.</h2>
                <p>FIND OUT WHY</p>
            </div>

            <div className="login">
                <h2>Welcome!</h2>
                <p>Tell us who you are!</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstname">First Name:</label>
                        <input
                            type="text"
                            id="firstname"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastname">Last Name:</label>
                        <input
                            type="text"
                            id="lastname"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            required
                        />
                    </div>

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
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit">Sign up</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
