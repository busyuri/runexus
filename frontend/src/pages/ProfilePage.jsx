import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import api from '../api/api';

export default function ProfilePage() {
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState("profile");

    if (!user) return <div className="p-6">Loading...</div>;

    const [formData, setFormData] = useState({
        name: user.name || '',
        surname: user.surname || '',
        gender: user.gender || '',
        birthday: user.birthday || '',
        pace: user.pace || 0,
        email: user.email || '',
    });

    const [age, setAge] = useState(user.age || 0);

    useEffect(() => {
        if (formData.birthday) {
            const today = new Date();
            const birthDate = new Date(formData.birthday);
            let calculatedAge = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                calculatedAge--;
            }
            setAge(calculatedAge);
        }
    }, [formData.birthday]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleProfileUpdate = async () => {
        try {
            const userId = user?.userId || parseInt(localStorage.getItem("userId"));
            if (!userId) return;

            await api.put(`/users/${userId}`, {
                ...formData,
                age,
                role: user.role,
                userId: userId,
            });
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Settings</h2>
                <ul className="space-y-3 text-gray-700">
                    <li
                        onClick={() => setActiveTab("profile")}
                        className={`cursor-pointer ${activeTab === "profile" ? "text-orange-600 font-semibold" : "hover:text-orange-600"}`}
                    >
                        Profile
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-10">
                {activeTab === "profile" && (
                    <>
                        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Settings</h1>

                        {/* Profile Initials */}
                        <div className="mb-8">
                            <div className="w-32 h-32 rounded-full bg-gray-300 text-white flex items-center justify-center text-3xl font-bold shadow-md">
                                {formData.name?.charAt(0)}{formData.surname?.charAt(0)}
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-gray-700">First Name</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="text-gray-700">Last Name</label>
                                <input
                                    name="surname"
                                    value={formData.surname}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="text-gray-700">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                >
                                    <option value="">Select</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-gray-700">Birthday</label>
                                <input
                                    type="date"
                                    name="birthday"
                                    value={formData.birthday}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="text-gray-700">Pace (min/km)</label>
                                <input
                                    type="number"
                                    name="pace"
                                    step="0.1"
                                    value={formData.pace}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    readOnly
                                    className="w-full border bg-gray-100 text-gray-600 px-3 py-2 rounded-md"
                                />
                            </div>

                            <div>
                                <label className="text-gray-700">Age</label>
                                <input
                                    value={age}
                                    readOnly
                                    className="w-full border bg-gray-100 text-gray-600 px-3 py-2 rounded-md"
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleProfileUpdate}
                            className="mt-8 bg-orange-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-orange-700 transition"
                        >
                            Save Changes
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}