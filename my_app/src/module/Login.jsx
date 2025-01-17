import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signin.css';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signin', formData);
      console.log('Signin successful:', response.data);
      
    
      const { userId, token, role } = response.data; 

      
      localStorage.setItem('userId', userId); 
      localStorage.setItem('authToken', token); 
      localStorage.setItem('role', role); 

     
      if (role === 'admin') {
        navigate("/admindashboard");
      } else if (role === 'user') {
        navigate("/userdashboard"); 
      }
    } catch (error) {
      console.error('Signin failed:', error.response?.data || error.message);
      
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="form-input"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
        className="form-input"
      />
      <button type="submit" className="form-button">Signin</button>
    </form>
  );
};

export default Signin;
