import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';
import admin from '../../Images/admin.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://wedmegood-backend.onrender.com/api/v1/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token); // Store token
      toast.success('Login successfully !');

      setTimeout(() => {
        navigate('/dashboard'); // Redirect to dashboard after toast
      }, 2000);

    } catch (err) {
      toast.error(err.message || 'Something went wrong!');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <div className="container-fluid">
      <ToastContainer position="top-right" />
      <div className="row main-content22 text-center">
        <div className="col-md-4 text-center company__info">
          <span className="company__logo">
            <h2><span className="fa fa-android"></span></h2>
          </span>
          <h4 className="company_title"><img src={admin} alt="Admin Logo" /></h4>
        </div>
        <div className="col-md-8 col-xs-12 col-sm-12 login_form">
          <div className="container-fluid">
            <div className="row">
              <h2 className='pt-6'>Log In</h2>
            </div>
            <div className="row">
              <div className="form-group">
                <div className="row">
                  <input
                    type="email"
                    name="email"
                    className="form__inputss"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}  // Handle Enter key
                    required
                  />
                </div>
                <div className="row">
                  <input
                    type="password"
                    name="password"
                    className="form__inputss"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}  // Handle Enter key
                    required
                  />
                </div>
                <div className="row pb-6 m-auto justify-content-center">
                  <button className="dfvdfvdf p-2" onClick={handleLogin}>Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
