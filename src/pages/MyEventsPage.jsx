import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import api from '../api/api';

export default function MyEventsPage() {
    const [myEvents, setMyEvents] = useState([]);

    useEffect(() => {
        api.get('/events/myevents')
            .then((res) => {
                setMyEvents(res.data);
            })
            .catch((err) => {
                console.error('Katıldığınız etkinlikler alınamadı:', err);
            });
    }, []);

    return (
        <main className="bg-gray-100 min-h-screen py-10 px-6">
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-3xl font-bold text-black">My Events</h1>
            </div>

            {myEvents.length === 0 ? (
                <p className="text-gray-600">You haven't joined any events yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {myEvents.map((event) => (
                        <Card
                            key={event.eventId}
                            title={event.title}
                            description={event.description}
                            image={event.imageUrl || 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e'}
                            participantLimit={event.participantLimit}
                            participantCount={event.participantCount}
                            eventDate={event.eventDate}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}
