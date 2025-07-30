import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { BellIcon } from '@heroicons/react/24/outline';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
import logoIcon from '../assets/star.png';
import logoText from '../assets/runexus-text.png';
import axios from 'axios';
import api from '../api/api';

export default function Navbar() {
    const location = useLocation();
    const path = location.pathname;
    const isLandingPage = path === '/';
    const isAuthPage = path === '/signin' || path === '/signup';
    const navigate = useNavigate();

    const profileRef = useRef();
    const notifRef = useRef();
    const messageRef = useRef();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [messagesOpen, setMessagesOpen] = useState(false);

    const [notifications, setNotifications] = useState([]);
    const [messages, setMessages] = useState([]);
    const userId = localStorage.getItem("userId");

    const fromLanding = location.state?.fromLanding || localStorage.getItem("fromLanding") === "true";

    const [user, setUser] = useState(() => ({
        id: localStorage.getItem("userId"),
        name: localStorage.getItem("name") || "",
        surname: localStorage.getItem("surname") || "",
        profilePicture: localStorage.getItem("profilePicture") || ""
    }));



    const fetchNotifications = async () => {
        try {
            const res = await fetch(`/api/notifications/${user.id}`);
            const data = await res.json();
            setNotifications(data);
        } catch (err) {
            console.error("Failed to fetch notifications:", err);
        }
    };

    const fetchMessages = async () => {
        try {
            const res = await axios.get(`/api/messages/user/${user.id}`);
            setMessages(res.data);
        } catch (err) {
            console.error("Failed to fetch messages:", err);
        }
    };

    useEffect(() => {
        if (!isAuthPage && !isLandingPage && user.id && !fromLanding) {
            fetchNotifications();
            fetchMessages();
        }
    }, [user.id, isAuthPage, isLandingPage]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isAuthPage && !isLandingPage && user.id) {
                fetchMessages();
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [user.id, isAuthPage, isLandingPage]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) setDropdownOpen(false);
            if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
            if (messageRef.current && !messageRef.current.contains(e.target)) setMessagesOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const markMessageAsRead = async (id) => {
        try {
            await axios.put(`/api/messages/${id}/read`);
            setMessages((prev) =>
                prev.map((m) => m.id === id ? { ...m, read: true } : m)
            );
        } catch (err) {
            console.error("Failed to mark message as read:", err);
        }
    };

    const markNotificationAsRead = async (id) => {
        try {
            await axios.put(`/api/notifications/${id}/read`);
            setNotifications((prev) =>
                prev.map((n) => n.id === id ? { ...n, read: true } : n)
            );
        } catch (err) {
            console.error("Failed to mark notification as read:", err);
        }
    };

    useEffect(() => {
        if (!userId) return;

        const fetchUser = async () => {
            try {
                const res = await api.get(`/users/${userId}`);
                setUser(res.data);
            } catch (err) {
                console.error("Failed to fetch user:", err);
            }
        };

        fetchUser();
    }, [userId]);

    return (
        <nav className="bg-white shadow p-4 flex justify-between items-center">
            <div className="flex items-center space-x-6">
                <div
                    onClick={() => {
                        if (user.id) {
                            navigate('/events');
                        } else {
                            navigate('/');
                        }
                    }}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <img src={logoIcon} alt="Runexus Icon" className="w-8 h-8" />
                    <img src={logoText} alt="Runexus Text" className="h-6" />
                </div>

                {!isAuthPage && !isLandingPage && !fromLanding && (
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
                    {!user.id && (isLandingPage || fromLanding) ? (
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
                                                    onClick={() => markNotificationAsRead(n.id)}
                                                    className={`p-2 text-sm hover:bg-gray-100 rounded cursor-pointer ${!n.read ? "bg-orange-50" : ""}`}
                                                >
                                                    <p className="font-medium">{n.title}</p>
                                                    <p className="text-gray-500 text-xs">{n.message}</p>
                                                    {!n.read && <span className="text-[10px] text-blue-600">Unread</span>}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Messages */}
                            <div ref={messageRef} className="relative">
                                <ChatBubbleLeftEllipsisIcon
                                    onClick={() => {
                                        setMessagesOpen(!messagesOpen);
                                        setDropdownOpen(false);
                                        setNotifOpen(false);
                                    }}
                                    className={`w-6 h-6 cursor-pointer ${messagesOpen ? "text-black" : "text-gray-600 hover:text-black"}`}
                                />
                                {messages.some(m => !m.read) && (
                                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                                )}

                                {messagesOpen && (
                                    <div className="absolute right-0 top-8 bg-white shadow rounded-md w-64 p-2 z-50">
                                        <p className="font-semibold px-2 pb-2 border-b">Messages</p>
                                        {messages.length === 0 ? (
                                            <p className="text-sm px-2 py-2 text-gray-500">No messages yet.</p>
                                        ) : (
                                            messages.slice(0, 5).map((m) => (
                                                <div
                                                    key={m.id}
                                                    onClick={() => {
                                                        markMessageAsRead(m.id);
                                                        const targetId = m.senderId === Number(user.id) ? m.receiverId : m.senderId;
                                                        navigate(`/messages/${targetId}`);
                                                    }}
                                                    className={`p-2 text-sm hover:bg-gray-100 rounded cursor-pointer ${!m.read ? "bg-orange-50" : ""}`}
                                                >
                                                    <p className="font-medium">{m.senderName}</p>
                                                    <p className="text-gray-500 text-xs truncate">{m.content}</p>
                                                    {!m.read && <span className="text-[10px] text-blue-600">Unread</span>}
                                                </div>
                                            ))
                                        )}
                                        <Link to="/messages" className="text-xs text-blue-600 px-2 py-1 hover:underline">See all</Link>
                                    </div>
                                )}
                            </div>

                            {/* Profile */}
                            <div ref={profileRef} className="relative">
                                <div
                                    onClick={() => {
                                        setDropdownOpen(!dropdownOpen);
                                        setNotifOpen(false);
                                    }}
                                    className="w-8 h-8 flex items-center justify-center rounded-full border cursor-pointer bg-[rgba(230,80,20,0.59)] text-sm font-semibold uppercase text-white overflow-hidden"
                                >
                                    {user.profilePicture || user.name ? (
                                        <img src={user.profilePicture} className="w-8 h-8 rounded-full" />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center">
                                            {user.name.charAt(0)}{user.surname.charAt(0)}
                                        </div>
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
