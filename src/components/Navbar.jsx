import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#f8f9fa', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/logo.png" alt="Logo" style={{ width: '30px', marginRight: '10px' }} />
        <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Note Taking</span>
      </div>
      <div>
        <Link to="/" style={{ margin: '0 15px', textDecoration: 'none', color: '#007bff' }}>Contact Us</Link>
        {loggedInUser ? (
          <button
            onClick={handleLogout}
            style={{ margin: '0 15px', background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" style={{ margin: '0 15px', textDecoration: 'none', color: '#007bff' }}>Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;