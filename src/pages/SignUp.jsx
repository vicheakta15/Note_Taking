import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/SignUp.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Sign-up form submitted with:', { email, password });

    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Current users in localStorage:', users);

    // Check if email already exists (case-insensitive)
    const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      console.log('Email already exists:', email);
      setError('Email already exists. Please use a different email.');
      return;
    }

    // Add new user to the list (store email in lowercase)
    const newUser = { email: email.toLowerCase(), password };
    users.push(newUser);
    console.log('Adding new user:', newUser);
    try {
      localStorage.setItem('users', JSON.stringify(users));
      console.log('Users saved to localStorage:', JSON.parse(localStorage.getItem('users')));
    } catch (err) {
      console.error('Error saving to localStorage:', err);
      setError('Failed to save user data. Please try again.');
      return;
    }

    // Automatically log in the new user
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    console.log('Logged in user:', newUser);

    setError('');
    // Redirect to dashboard
    console.log('Navigating to /dashboard');
    navigate('/dashboard');
  };

  return (
    <div>
      <Navbar />
      <div className="signup-container">
        <div className="signup-box">
          <h2>Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '5px', margin: '5px 0' }}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '5px', margin: '5px 0' }}
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;