import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || 'Login successful!');
        localStorage.setItem('userEmail', data.email);
        if (onLoginSuccess) onLoginSuccess();
        navigate('/');
      } else {
        setError(data.message || 'Login failed. Please check credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Could not connect to server.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Login to FinSight</h2>

      {error && <p className="text-red-600 mb-3 text-center">{error}</p>}
      {success && <p className="text-green-600 mb-3 text-center">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          required
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded text-gray-900 bg-white"

          autoComplete="off"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          required
          onChange={handleChange}
        className="w-full px-4 py-2 border rounded text-gray-900 bg-white"

          autoComplete="new-password"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      <p className="text-center text-gray-700 mt-6">
        Don’t have an account?{' '}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign Up here
        </Link>
      </p>
    </div>
  );
}

export default Login;
