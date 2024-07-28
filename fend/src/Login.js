import React, { useState } from 'react';
import axios from 'axios';



const Login = () => {
  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
          const response = await axios.post('http://127.0.0.1:5000/login', {
              username,
              password
          });
          console.log(response.data);
      } catch (err) {
          setError('Username or password is incorrect');
      }
  };


    return(
    <div className="wrapper">
      <div className="sloganlogin">
          <h2>NEVER.<br/>FALL.<br/>SHORT.</h2>
          <p>FIND OUT WHY</p>
          </div>
  
          <div className="login">
          <h2>Welcome Back!</h2>
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
        </div>
    );
};

export default Login;