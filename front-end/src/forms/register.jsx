import "./register.css";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    salary: '',
    password: '',
    roleName: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      setMessage(`Registration successful: ${response.data.message}`);
    } catch (error) {
      setMessage(`Error: ${error.response?.data.message || error.message}`);
    }
  };

  return (
    <div className="registration-card">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="salary">Salary:</label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="roleName">Role Name:</label>
          <input
            type="text"
            id="roleName"
            name="roleName"
            value={formData.roleName}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
        <div className="link">
            <Link to="/login">Login</Link>
          </div>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default RegistrationForm;
