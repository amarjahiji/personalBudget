import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="main">
      <div className="slogan">
        <h2>NEVER.<br />FALL.<br />SHORT.</h2>
        <p>FIND OUT WHY</p>
      </div>
      <div className="getin">
        <h2 onClick={handleSignupClick}>Sign up</h2>
        <p>Already have an account? <span onClick={handleLoginClick}>Sign in</span></p>
      </div>
    </div>
  );
}

export default Welcome;
