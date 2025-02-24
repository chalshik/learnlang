import React, { useState } from 'react';
import './App.css';
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = { username, email, password1, password2 };
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errData = await response.json();
        console.error('Validation errors:', errData);
        setError(errData.detail || 'An error occurred.');
      } else {
        alert('Registration successful!');
      }
    } catch (err) {
      console.error('Request error:', err);
      setError('An error occurred while submitting the form');
    }
  };
  
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password1">Password:</label>
          <input
            type="password"
            id="password1"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password2">Confirm Password:</label>
          <input
            type="password"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>

        {error && <div style={{ color: 'red' }}>{error}</div>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
