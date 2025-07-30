import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../api/api';

export default function MessageDetailPage() {
  const { userId } = useParams();
  const [currentUserId, setCurrentUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [userName, setUserName] = useState('');


  useEffect(() => {
    let id = localStorage.getItem("userId");

    if (!id) {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const userObj = JSON.parse(userStr);
          id = userObj?.id?.toString();
        } catch (e) {
          console.error("Error parsing user:", e);
        }
      }
    }

    if (id) setCurrentUserId(id);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${userId}`);
        const fullName = `${res.data.name} ${res.data.surname}`;
        setUserName(fullName);
      } catch (err) {
        console.error("Failed to fetch user name:", err);
      }
    };

    fetchUser();
  }, [userId]);

  const fetchMessages = async () => {
    if (!currentUserId || !userId) return;
    try {
      const res = await axios.get(`/api/messages/${currentUserId}/${userId}`);
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const res = await axios.post("/api/messages", {
        senderId: Number(currentUserId),
        receiverId: Number(userId),
        content: newMessage
      });

      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    if (currentUserId) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [currentUserId, userId]);

  return (
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Messages with {userName || `User ${userId}`}</h2>

        <div className="bg-gray-100 rounded-lg p-4 h-[400px] overflow-y-auto mb-4">
          {messages.map((msg) => (
              <div key={msg.id} className={`mb-2 ${msg.senderId == currentUserId ? "text-right" : "text-left"}`}>
                <div className={`inline-block px-4 py-2 rounded-lg ${msg.senderId == currentUserId ? "bg-blue-500 text-white" : "bg-white border"}`}>
                  {msg.content}
                </div>
              </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        <div className="flex gap-2">
          <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded px-3 py-2"
          />
          <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
  );
}
