<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> ac03ff2292459be05d0e9afe03b22e3ade267ae3
import api from '../api/api';

export default function Card({
                                 title,
                                 description,
                                 image,
                                 participantLimit,
                                 participantCount,
                                 eventDate,
                                 eventId,
                                 eventOwnerId,
                                 currentUserId,
                                 onEventUpdated,
                                 onEventDeleted,
<<<<<<< HEAD
                                 isMyEvent,
                                 isJoined
                             }) {
    const [showDetails, setShowDetails] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

=======
                                 onEventJoined,
                                 isMyEvent,
                                 isJoined // 🔥 bunu ekle
                             }) {
    const [showDetails, setShowDetails] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
>>>>>>> ac03ff2292459be05d0e9afe03b22e3ade267ae3
    const [editedEvent, setEditedEvent] = useState({
        title,
        description,
        participantLimit,
        eventDate: eventDate?.split('T')[0] || ''
    });

    const isOwner = currentUserId === eventOwnerId;

<<<<<<< HEAD

=======
>>>>>>> ac03ff2292459be05d0e9afe03b22e3ade267ae3
    const handleJoin = async () => {
        if (!currentUserId) {
            window.location.href = "/signin";
            return;
        }

        try {
            await api.post(`/events/${eventId}/join?userId=${currentUserId}`);
<<<<<<< HEAD
            const countRes = await api.get(`/events/${eventId}/participantCount`);


            onEventUpdated(eventId, {
                participantCount: countRes.data,
                action: 'join'
            });
=======
            alert('You joined the event! 🎉');

            if (onEventJoined) {
                onEventJoined(eventId); // 👉 EventsPage tarafındaki joinedEventIds'e ekler
            }
>>>>>>> ac03ff2292459be05d0e9afe03b22e3ade267ae3

        } catch (err) {
            console.error('Katılım başarısız:', err);
        }
    };

<<<<<<< HEAD
    const handleLeave = async () => {
        try {
            await api.post(`/events/${eventId}/leave?userId=${currentUserId}`);
            const countRes = await api.get(`/events/${eventId}/participantCount`);

            onEventUpdated(eventId, {
                participantCount: countRes.data,
                action: 'leave'
            });


=======



    const handleLeave = async () => {
        try {
            await api.post(`/events/${eventId}/leave?userId=${currentUserId}`);
            alert('You left the event.');
            if (onEventDeleted) onEventDeleted(eventId);
>>>>>>> ac03ff2292459be05d0e9afe03b22e3ade267ae3
        } catch (err) {
            console.error('Etkinlikten çıkılamadı:', err);
        }
    };

    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/300x200/000000/FFFFFF?text=Runexus';
    };

    const handleInputChange = (e) => {
        setEditedEvent({ ...editedEvent, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const response = await api.put(`/events/${eventId}`, {
                ...editedEvent,
                participantLimit: parseInt(editedEvent.participantLimit),
                userId: currentUserId
            });
            onEventUpdated(eventId, response.data);
            setIsEditing(false);
            setShowDetails(false);
        } catch (err) {
            console.error('Etkinlik güncellenemedi:', err);
        }
    };

    const handleDelete = async () => {
        try {
<<<<<<< HEAD
            await api.delete(`/events/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

=======
            await api.delete(`/events/${eventId}`);
>>>>>>> ac03ff2292459be05d0e9afe03b22e3ade267ae3
            onEventDeleted(eventId);
            setShowDetails(false);
        } catch (err) {
            console.error('Etkinlik silinemedi:', err);
        }
    };

    const formattedDate = eventDate
        ? new Date(eventDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
        : 'Unknown Date';

    return (
        <>
            {/* Kart */}
            <div className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden flex flex-col">
                <div className="h-40 w-full bg-black">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                    />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                        <h2 className="font-semibold text-lg mb-1">{title}</h2>
                        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
                    </div>
                    <div className="mt-4 flex justify-between gap-2">
                        <button
                            className={`bg-orange-600 text-white text-sm px-4 py-2 rounded-full hover:bg-orange-700 ${
                                isJoined ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            onClick={handleJoin}
                            disabled={isJoined}
                        >
                            {isJoined ? 'Already Joined' : 'Join Event'}
                        </button>
<<<<<<< HEAD
=======


>>>>>>> ac03ff2292459be05d0e9afe03b22e3ade267ae3
                        <button
                            className="bg-orange-600 text-white text-sm px-4 py-2 rounded-full hover:bg-orange-700"
                            onClick={() => setShowDetails(true)}
                        >
                            View Details
                        </button>
                    </div>
                </div>
            </div>

            {/* Detaylı Açılır Modal */}
            {showDetails && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
                    <div className="bg-white max-w-xl w-full rounded-xl shadow-lg overflow-hidden relative">
<<<<<<< HEAD
                        <button
                            onClick={() => setShowDetails(false)}
                            className="absolute top-2 right-2 bg-gray-300 text-gray-800 text-xs px-2 py-1 rounded hover:bg-gray-400"
                        >
                            ✕
                        </button>
=======
                        {/* Sağ üst Edit butonu */}
                        {isOwner && !isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="absolute top-2 right-2 bg-gray-300 text-black text-xs px-2 py-1 rounded hover:bg-gray-400"
                            >
                                Edit
                            </button>
                        )}
>>>>>>> ac03ff2292459be05d0e9afe03b22e3ade267ae3

                        <img
                            src={image}
                            alt={title}
                            className="w-full h-64 object-cover"
                            onError={handleImageError}
                        />

                        <div className="p-6">
                            {isEditing ? (
                                <>
                                    <input
                                        name="title"
                                        value={editedEvent.title}
                                        onChange={handleInputChange}
                                        className="border p-2 rounded mb-2 w-full"
                                    />
                                    <textarea
                                        name="description"
                                        value={editedEvent.description}
                                        onChange={handleInputChange}
                                        className="border p-2 rounded mb-2 w-full"
                                    />
                                    <input
                                        type="number"
                                        name="participantLimit"
                                        value={editedEvent.participantLimit}
                                        onChange={handleInputChange}
                                        className="border p-2 rounded mb-2 w-full"
                                    />
                                    <input
                                        type="date"
                                        name="eventDate"
                                        value={editedEvent.eventDate}
                                        onChange={handleInputChange}
                                        className="border p-2 rounded mb-4 w-full"
                                    />
                                    <div className="flex justify-between gap-2">
                                        <button
                                            onClick={handleUpdate}
                                            className="bg-black text-white px-4 py-2 rounded w-full"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="bg-gray-400 text-white px-4 py-2 rounded w-full"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-bold text-orange-700 mb-2">{title}</h2>
                                    <p className="text-gray-700 mb-4">{description}</p>
                                    <p className="text-sm text-gray-500 mb-1">🗓️ {formattedDate}</p>
                                    <p className="text-sm text-gray-600 mb-4">
<<<<<<< HEAD
                                        👥 Participants: {typeof participantCount === 'number' ? participantCount : 0}/{participantLimit}
                                    </p>


                                    <div className="flex justify-between mt-6">
                                        {isOwner && (
                                            <>
                                                <button
                                                    onClick={() => setIsEditing(true)}
                                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={handleDelete}
                                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                                                >
                                                    Delete Event
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    {!isOwner && (
                                        <div className="mt-4">
                                            {isJoined ? (
                                                <button
                                                    onClick={handleLeave}
                                                    className="bg-red-600 text-white px-4 py-2 rounded w-full hover:bg-red-700"
                                                >
                                                    Leave Event
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={handleJoin}
                                                    className="bg-orange-600 text-white px-4 py-2 rounded w-full hover:bg-orange-700"
                                                >
                                                    Join Event
                                                </button>
                                            )}
                                        </div>
                                    )}
=======
                                        👥 Participants: {participantCount}/{participantLimit}
                                    </p>
                                    <div className="flex justify-between mt-6">
                                        <button
                                            onClick={() => setShowDetails(false)}
                                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                                        >
                                            Close
                                        </button>
                                        {isOwner && (
                                            <button
                                                onClick={handleDelete}
                                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                                            >
                                                Delete Event
                                            </button>
                                        )}
                                    </div>

>>>>>>> ac03ff2292459be05d0e9afe03b22e3ade267ae3
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
