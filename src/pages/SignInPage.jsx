import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useUser } from '../context/UserContext';


export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { setUser } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/auth/login', {
                email,
                password
            });

            const token = response.data.token;
            const user = {
                id: response.data.userId,
<<<<<<< HEAD
                name: response.data.name || '' ,
=======
                name: response.data.name,
>>>>>>> ac03ff2292459be05d0e9afe03b22e3ade267ae3
                role: response.data.role
            };

            localStorage.setItem("token", token);
            localStorage.setItem("userId", user.id);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("role", user.role);

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setUser(user);

<<<<<<< HEAD
            console.log("API yanıtı:", response.data);
            console.log("userId:", response.data.userId);

            navigate('/events');


=======
            navigate('/events');
>>>>>>> ac03ff2292459be05d0e9afe03b22e3ade267ae3
        } catch (error) {
            console.error('Giriş başarısız:', error);
            alert("Giriş başarısız: " + (error.response?.data?.message || error.message));
        }
    };



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white p-10 rounded-xl shadow">
                <h2 className="text-2xl font-bold text-black-600 text-center mb-6">Sign In </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        <input
                            type="password"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition"
                    >
                        Sign In
                    </button>
                    <div className="my-4 flex items-center justify-center">
                        <div className="w-full h-px bg-gray-300" />
                        <span className="px-2 text-sm text-gray-500">or</span>
                        <div className="w-full h-px bg-gray-300" />
                    </div>

                    <div className="flex justify-center space-x-4 mt-6">
                        {/* Facebook */}
                        <button className="flex items-center space-x-2 bg-[#3b5998] text-white px-4 py-2 rounded">
                            <i className="fab fa-facebook-f"></i>
                            <span>Facebook</span>
                        </button>

                        {/* Twitter */}
                        <button className="flex items-center space-x-2 bg-[#1DA1F2] text-white px-4 py-2 rounded">
                            <i className="fab fa-twitter"></i>
                            <span>Twitter</span>
                        </button>

                        {/* Google */}
                        <button className="flex items-center space-x-2 bg-[#DB4437] text-white px-4 py-2 rounded">
                            <i className="fab fa-google"></i>
                            <span>Google</span>
                        </button>
                    </div>

                </form>
                <p className="text-sm text-center mt-4 text-gray-600">
                    Don't have an account? <Link to="/signup" className="text-orange-600 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
<<<<<<< HEAD
}
=======
}
>>>>>>> ac03ff2292459be05d0e9afe03b22e3ade267ae3
