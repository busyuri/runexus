import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function SignUpPage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Kayıt formu:', form);
        // Buraya kayıt API'si eklenebilir
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white p-10 rounded-xl shadow">
                <h2 className="text-2xl font-bold text-black-600 text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            name="name"
                            type="text"
                            required
                            value={form.name}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            name="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            value={form.password}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition"
                    >
                        Sign Up
                    </button>
                </form>


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


                <p className="text-sm text-center mt-4 text-gray-600">
                    Already have an account? <Link to="/signin" className="text-orange-600 hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
