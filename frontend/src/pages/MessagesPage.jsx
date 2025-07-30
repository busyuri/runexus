import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function MessagesPage() {
    const [users, setUsers] = useState([]);
    const currentUserId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("/api/users");

                const filtered = res.data.filter(u => u.id != currentUserId);
                setUsers(filtered);
            } catch (err) {
                console.error("Failed to fetch users:", err);
            }
        };

        fetchUsers();
    }, [currentUserId]);

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-xl font-bold mb-4">Users You Can Message</h2>
            {users.length === 0 ? (
                <p className="text-gray-500">No other users yet.</p>
            ) : (
                <ul className="space-y-4">
                    {users.map(user => {
                        console.log("User data:", user);

                        return (
                            <li key={user.userId} className="flex items-center justify-between border p-3 rounded shadow-sm">
                                <div className="flex items-center gap-3">
                                    {user.profilePicture ? (
                                        <img src={user.profilePicture} alt="Profile" className="w-10 h-10 rounded-full" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-white">
                                            {user.name?.charAt(0)}{user.surname?.charAt(0)}
                                        </div>
                                    )}
                                    <span className="font-medium">{user.name} {user.surname}</span>
                                </div>
                                <Link
                                    to={`/messages/${user.userId}`}
                                    className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
                                >
                                    Send Message
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
