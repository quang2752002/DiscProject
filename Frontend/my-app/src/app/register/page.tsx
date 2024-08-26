'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import from next/navigation


import "@/assets/css/login.css"

// import "bootstrap-icons/font/bootstrap-icons.css";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const [form, setForm] = useState<RegisterForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Basic validation
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('https://localhost:7090/api/User/Register', form);
      setMessage("Registration successful");
      router.push('/login');
    } catch (error: any) {
      setMessage(error.response?.data || "Registration failed");
    }
  };

  return (
  <div className="wrapper">
    {message && <div className="alert alert-info">{message}</div>}
    <form onSubmit={handleSubmit}>
    <h2>Login</h2>
    <div className="input-field">
      <input type="text"id="firstName" name="firstName" value={form.firstName} onChange={handleChange} required/>
      <label>First Name</label>
    </div>
    <div className="input-field">
      <input type="text" id="lastName" name="lastName" value={form.lastName} onChange={handleChange} required />
      <label>Last Name</label>
    </div>
    <div className="input-field">
      <input type="text" id="email" name="email" value={form.email} onChange={handleChange} required  />
      <label>Email</label>
    </div>
    <div className="input-field">
      <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required />
      <label>Password</label>
    </div>
    <div className="input-field">
      <input type="password" id="confirmPassword" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
      <label>Confirm Password</label>
    </div>
    <div className="forget">
      <label htmlFor="remember">
        <input type="checkbox" id="remember" />
        <p>Remember me</p>
      </label>
      <a href="#">Forgot password?</a>
    </div>
    <button type="submit">Log In</button>
    <div className="register">
      <p>Don't have an account? <a href="#">Register</a></p>
    </div>
  </form>
</div>

  );
};

export default RegisterPage;
