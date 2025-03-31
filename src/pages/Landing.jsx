import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/Landing.css';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div>
      <Navbar />
      <div className="landing-container">
        <h1>The easiest way to take notes</h1>
        <Link to="/signup">
          <button className="signup-button">Sign Up Now</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;