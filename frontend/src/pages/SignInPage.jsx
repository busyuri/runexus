import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useUser } from '../context/UserContext';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/auth/login', { email, password });

            const token = response.data.token;
            const user = {
                id: response.data.userId,
                name: response.data.name || '',
                role: response.data.role
            };

            localStorage.setItem("token", token);
            localStorage.setItem("userId", user.id);
            localStorage.setItem("userName", user.name);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("role", user.role);

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(user);
            setErrorMessage('');
            navigate('/events');
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white p-10 rounded-xl shadow">
                <h2 className="text-2xl font-bold text-black-600 text-center mb-6">Sign In</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    {errorMessage && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
                            {errorMessage}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 pr-10 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                onMouseDown={() => setShowPassword(true)}
                                onMouseUp={() => setShowPassword(false)}
                                onMouseLeave={() => setShowPassword(false)}
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-sm text-center mt-4 text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-orange-600 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
