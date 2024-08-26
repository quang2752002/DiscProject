"use client"; // Mark this component as a Client Component

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation
import { LoginService } from '@/services/LoginService';
import { ToastContainer, toast } from 'react-toastify';

import "@/assets/css/login.css"

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await LoginService.login(username, password);
            
            if (response.token) {
                // Store the JWT token, e.g., in localStorage
                localStorage.setItem('token', response.token);
                // Redirect to a protected route or home page
                router.push('/');
            }
        } catch (err) {
            // Show a toast notification for the error
            toast.error("Thông tin ko chính xác");
        }
    };

    return (
       <div className="wrapper">
  <form onSubmit={handleLogin}>
    <h2>Login</h2>
    <div className="input-field">
      <input type="text"  value={username} 
             onChange={(e) => setUsername(e.target.value)}
                            required />
      <label>Username</label>
    </div>
   
   
    <div className="input-field">
      <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
      <label> Password</label>
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
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  </form>
</div>

    );
};

export default Login;
