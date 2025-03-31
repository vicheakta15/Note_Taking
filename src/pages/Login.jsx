import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      setError('');
      setForgotPasswordMessage('');
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleForgotPassword = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (user) {
      setForgotPasswordMessage(`Your password is: ${user.password}`);
      setError('');
    } else {
      setForgotPasswordMessage('No account found with this email.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
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
            {forgotPasswordMessage && <p style={{ color: 'blue' }}>{forgotPasswordMessage}</p>}
            <button type="submit" className="email-login">
              Log in
            </button>
          </form>
          <p>
            <button
              onClick={handleForgotPassword}
              style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', padding: 0 }}
            >
              Forgot Password?
            </button>
          </p>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;