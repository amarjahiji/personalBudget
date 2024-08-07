import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  };
  return(
  <header>
    <h1 onClick={handleHomeClick}>RESOURSE<span>Z</span></h1>
  </header>
  );
}
export default Header