import React, { useState } from 'react';

export default function Card({ title, description, image, participantLimit, participantCount, eventDate}) {
    const [showDetails, setShowDetails] = useState(false);

    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/300x200/000000/FFFFFF?text=Runexus';
    };

    const formattedDate = eventDate ? new Date(eventDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }) : 'Unknown Date';

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
                    <div className="mt-4 flex gap-2">
                        <button
                            className="bg-orange-600 text-white text-sm px-4 py-2 rounded-full hover:bg-orange-700"
                            onClick={() => alert('You joined the event! 🎉')}
                        >
                            Join Event
                        </button>
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
                    <div className="bg-white max-w-xl w-full rounded-xl shadow-lg overflow-hidden">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-64 object-cover"
                            onError={handleImageError}
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-orange-700 mb-2">{title}</h2>
                            <p className="text-gray-700 mb-4">{description}</p>
                            <p className="text-sm text-gray-500 mb-1">🗓️ {formattedDate}</p>
                            <p className="text-sm text-gray-600 mb-4">👥 Participants: {participantCount}/{participantLimit}</p>
                            <button
                                onClick={() => setShowDetails(false)}
                                className="mt-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}
