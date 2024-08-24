"use client"; // Mark this component as a Client Component

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation
import { LoginService } from '@/services/LoginService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.css';

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
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <form onSubmit={handleLogin} className="p-4 border rounded bg-light">
                    <div className="mb-3">
                        <input
                            type="text" placeholder="Username"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password" placeholder="Password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mr-2">Login</button>
                    <a type="submit" href="/register" className="btn btn-primary">Register</a>

                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
