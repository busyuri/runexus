import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { BellIcon } from '@heroicons/react/24/outline';
import logoIcon from '../assets/star.png';
import logoText from '../assets/runexus-text.png';
import axios from 'axios';

export default function Navbar() {
    const location = useLocation();
    const path = location.pathname;
    const isLandingPage = path === '/';
    const isAuthPage = path === '/signin' || path === '/signup';
    const navigate = useNavigate();

    const profileRef = useRef();
    const notifRef = useRef();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const user = {
        id: localStorage.getItem("userId"),
        name: localStorage.getItem("name") || "User",
        surname: localStorage.getItem("surname") || "",
        profilePicture: localStorage.getItem("profilePicture") || ""
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await fetch(`/api/notifications/${user.id}`);
                const data = await res.json();
                setNotifications(data);
            } catch (err) {
                console.error("Bildirimler alınamadı:", err);
            }
        };

        if (!isAuthPage && !isLandingPage && user.id) {
            fetchNotifications();
        }
    }, [user.id, isAuthPage, isLandingPage]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) setDropdownOpen(false);
            if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const markAsRead = async (id) => {
        try {
            await axios.put(`/api/notifications/${id}/read`);
            setNotifications((prev) =>
                prev.map((n) => n.id === id ? { ...n, read: true } : n)
            );
        } catch (err) {
            console.error("Okundu işaretlenemedi:", err);
        }
    };


    console.log("Bildirimler:", notifications);
    console.log("Okunmamış var mı?:", notifications.some(n => !n.read));


    return (
        <nav className="bg-white shadow p-4 flex justify-between items-center">
            <div className="flex items-center space-x-6">
                <Link to="/" className="flex items-center gap-2">
                    <img src={logoIcon} alt="Runexus Icon" className="w-8 h-8" />
                    <img src={logoText} alt="Runexus Text" className="h-6" />
                </Link>

                {!isAuthPage && !isLandingPage && (
                    <>
                        <Link to="/events" className={`font-medium ${path === "/events" ? "text-black" : "text-gray-700"}`}>
                            Events
                        </Link>
                        <Link to="/forum" className={`font-medium ${path === "/forum" ? "text-black" : "text-gray-700 hover:text-blue-500"}`}>
                            Forum
                        </Link>
                    </>
                )}
            </div>

            {!isAuthPage && (
                <div className="relative flex items-center space-x-4">
                    {isLandingPage ? (
                        <>
                            <Link to="/signin" className="text-black font-medium px-4 py-2">Sign In</Link>
                            <Link to="/signup" className="bg-orange-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-orange-700 transition duration-300">
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <>
                            {/* Notifications */}
                            <div ref={notifRef} className="relative">
                                <BellIcon
                                    onClick={() => {
                                        setNotifOpen(!notifOpen);
                                        setDropdownOpen(false);
                                    }}
                                    className={`w-6 h-6 cursor-pointer ${notifOpen ? "text-black" : "text-gray-600 hover:text-black"}`}
                                />
                                {notifications.some(n => !n.read) && (
                                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                                )}

                                {notifOpen && (
                                    <div className="absolute right-0 top-8 bg-white shadow rounded-md w-64 p-2 z-50">
                                        <p className="font-semibold px-2 pb-2 border-b">Notifications</p>
                                        {notifications.length === 0 ? (
                                            <p className="text-sm px-2 py-2 text-gray-500">No notifications yet.</p>
                                        ) : (
                                            notifications.map((n) => (
                                                <div
                                                    key={n.id}
                                                    onClick={() => markAsRead(n.id)}
                                                    className={`p-2 text-sm hover:bg-gray-100 rounded cursor-pointer ${!n.read ? "bg-orange-50" : ""}`}
                                                >
                                                    <p className="font-medium">{n.title}</p>
                                                    <p className="text-gray-500 text-xs">{n.message}</p>
                                                    {!n.read && <span className="text-[10px] text-blue-600">Okunmadı</span>}
                                                </div>
                                            ))

                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Profile Dropdown */}
                            <div ref={profileRef} className="relative">
                                <div
                                    onClick={() => {
                                        setDropdownOpen(!dropdownOpen);
                                        setNotifOpen(false);
                                    }}
                                    className="w-8 h-8 flex items-center justify-center rounded-full border cursor-pointer bg-[rgba(230,80,20,0.59)] text-sm font-semibold uppercase text-white overflow-hidden"
                                >
                                    {user.profilePicture ? (
                                        <img
                                            src={user.profilePicture}
                                            alt="Profile"
                                            className="w-8 h-8 object-cover rounded-full"
                                        />
                                    ) : (
                                        <>
                                            {user.name.charAt(0)}
                                            {user.surname.charAt(0)}
                                        </>
                                    )}
                                </div>

                                {dropdownOpen && (
                                    <div className="absolute right-0 top-12 bg-white shadow-md rounded-md w-40 z-50">
                                        <Link
                                            to="/myevents"
                                            className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            My Events
                                        </Link>
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setDropdownOpen(false);
                                                localStorage.clear();
                                                navigate('/signin');
                                            }}
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                                        >
                                            Log out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
