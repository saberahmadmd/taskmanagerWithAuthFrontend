import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Task Manager</Link>
      </div>
      <div className="navbar-menu">
        {user ? (
          <>
            <span className="welcome-message">Welcome, {user.name}</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <div className="auth-links">
            <Link to="/login" className='link-'>Login</Link>
            <Link to="/register" className='link-'>Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;