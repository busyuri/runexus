import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { BellIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import logoIcon from '../assets/star.png';
import logoText from '../assets/runexus-text.png';

export default function Navbar() {
    const [messages, setMessages] = useState([
        { id: 1, user: "Alice", text: "Do you run on Sonday?", read: false },
        { id: 2, user: "Bob", text: "Congratz!", read: true },
        { id: 3, user: "Charlie", text: "When do you come?", read: false }
    ]);

    const location = useLocation();
    const path = location.pathname;
    const isLandingPage = path === '/';
    const isAuthPage = path === '/signin' || path === '/signup';
    const navigate = useNavigate();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [msgOpen, setMsgOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [replyText, setReplyText] = useState("");

    const profileRef = useRef();
    const msgRef = useRef();
    const notifRef = useRef();
    const user = {
        name: "James",
        surname: "Bond",
        profilePicture: ""
    };


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) setDropdownOpen(false);
            if (msgRef.current && !msgRef.current.contains(e.target)) setMsgOpen(false);
            if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <nav className="bg-white shadow p-4 flex justify-between items-center">
                <div className="flex items-center space-x-6">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logoIcon} alt="Runexus Icon" className="w-8 h-8" />
                        <img src={logoText} alt="Runexus Text" className="h-6" />
                    </Link>

                    {!isAuthPage && !isLandingPage && (
                        <>
                            <Link
                                to="/events"
                                className={`font-medium ${path === "/events" ? "text-black" : "text-gray-700"}`}
                            >
                                Events
                            </Link>

                            <Link
                                to="/forum"
                                className={`font-medium ${path === "/forum" ? "text-black" : "text-gray-700 hover:text-blue-500"}`}
                            >
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
                                <Link to="/signup" className=" bg-orange-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-orange-700 transition duration-300">
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <>
                                {/* Messages Icon */}
                                <div ref={msgRef} className="relative">
                                    <EnvelopeIcon
                                        onClick={() => {
                                            setMsgOpen(!msgOpen);
                                            setNotifOpen(false);
                                            setDropdownOpen(false);
                                        }}
                                        className={`w-6 h-6 cursor-pointer ${msgOpen ? "text-black" : "text-gray-600 hover:text-black"}`}
                                    />
                                    {msgOpen && (
                                        <div className="absolute right-0 top-8 bg-white shadow rounded-md w-64 p-2 z-50">
                                            <p className="font-semibold px-2 pb-2 border-b">Messages</p>
                                            {messages.map((msg) => (
                                                <div
                                                    key={msg.id}
                                                    onClick={() => {
                                                        setMsgOpen(false);
                                                        setMessages((prev) =>
                                                            prev.map((m) => m.id === msg.id ? { ...m, read: true } : m)
                                                        );
                                                        setSelectedMessage(msg);
                                                    }}
                                                    className={`p-2 text-sm rounded cursor-pointer hover:bg-gray-100 ${msg.read ? 'text-gray-500' : 'font-semibold'}`}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <p>{msg.user}</p>
                                                        {!msg.read && <span className="w-2 h-2 bg-red-500 rounded-full inline-block" />}
                                                    </div>
                                                    <p className="text-xs">{msg.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Notifications Icon */}
                                <div ref={notifRef} className="relative">
                                    <BellIcon
                                        onClick={() => {
                                            setNotifOpen(!notifOpen);
                                            setMsgOpen(false);
                                            setDropdownOpen(false);
                                        }}
                                        className={`w-6 h-6 cursor-pointer ${notifOpen ? "text-black" : "text-gray-600 hover:text-black"}`}

                                    />
                                    {notifOpen && (
                                        <div className="absolute right-0 top-8 bg-white shadow rounded-md w-64 p-2 z-50">
                                            <p className="font-semibold px-2 pb-2 border-b">Notifications</p>
                                            {[1, 2].map((i) => (
                                                <div key={i} className="p-2 text-sm hover:bg-gray-100 rounded">
                                                    <p className="font-medium">Event Reminder</p>
                                                    <p className="text-gray-500 text-xs">The running event starts tomorrow at 10:00 am.</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Profile Dropdown */}
                                <div ref={profileRef} className="relative">
                                    <div
                                        onClick={() => {
                                            setDropdownOpen(!dropdownOpen);
                                            setMsgOpen(false);
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
                                                to="/profile"
                                                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                Profile
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setDropdownOpen(false);
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

                {/* Mesaj Detay Modalı */}
            {selectedMessage && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
                        <button
                            onClick={() => setSelectedMessage(null)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
                        >
                            ✕
                        </button>
                        <h2 className="text-orange-600 font-semibold text-lg mb-2">Message from {selectedMessage.user}</h2>
                        <p className="text-gray-700 mb-4">{selectedMessage.text}</p>
                        <textarea
                            rows="3"
                            className="w-full border border-gray-300 rounded-md p-2 text-sm mb-2"
                            placeholder="Write your reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                        />
                        <button
                            onClick={() => {
                                console.log("Yanıt gönderildi:", replyText);
                                setReplyText("");
                                alert("Yanıt gönderildi!");
                            }}
                            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 text-sm"
                        >
                            Send Reply
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
