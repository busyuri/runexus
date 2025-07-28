import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import api from '../api/api';

export default function EventsPage() {
    const [events, setEvents] = useState([]);
    const [joinedEventIds, setJoinedEventIds] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        participantLimit: '',
        eventDate: '',
    });

    const userId = parseInt(localStorage.getItem("userId"));
    const token = localStorage.getItem("token");

    useEffect(() => {
        api.get('/events')
            .then((res) => {
                console.log('Event verisi:', res.data); // 👈 BAK BU
                setEvents(res.data);
            })
            .catch((err) => console.error('Etkinlikler alınamadı:', err));

        if (userId) {
            api.get(`/events/joined?userId=${userId}`)
                .then((res) => {
                    const ids = res.data.map(event => event.eventId);
                    setJoinedEventIds(ids);
                })
                .catch((err) => console.error('Katıldığın etkinlikler alınamadı:', err));
        }

    }, []);


    const handleChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId || !token) {
            window.location.href = "/signin";
            return;
        }

        try {
            const response = await api.post('/events', {
                ...newEvent,
                participantLimit: parseInt(newEvent.participantLimit),
                userId: parseInt(userId),
            });
            setEvents([response.data, ...events]);
            setNewEvent({ title: '', description: '', participantLimit: '', eventDate: '' });
            setShowForm(false);
        } catch (err) {
            console.error('Etkinlik oluşturulamadı:', err);
        }
    };


    return (
        <main className="bg-gray-100 min-h-screen py-10 px-6">
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-3xl font-bold text-black">Events</h1>
                {userId ? (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded shadow"
                    >
                        {showForm ? 'Cancel' : '+'}
                    </button>
                ) : null}


            </div>

            {showForm && (
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-xl shadow p-6 mb-10 grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={newEvent.title}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        name="participantLimit"
                        placeholder="Participant Limit"
                        value={newEvent.participantLimit}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded"
                    />
                    <input
                        type="date"
                        name="eventDate"
                        value={newEvent.eventDate}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded"
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={newEvent.description}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded md:col-span-2"
                    />
                    <button
                        type="submit"
                        className="bg-orange-600 text-white px-4 py-2 rounded md:col-span-2"
                    >
                        Submit Event
                    </button>
                </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {events.map((event) => (
                    <Card
                        key={event.eventId}
                        title={event.title}
                        description={event.description}
                        image={event.imageUrl || 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e'}
                        participantLimit={event.participantLimit}
                        participantCount={event.participantCount}
                        eventDate={event.eventDate}
                        eventId={event.eventId}
                        eventOwnerId={event.userId}
                        currentUserId={userId}
                        isJoined={joinedEventIds.includes(event.eventId)} // <-- 🔥 Burası eklendi
                        onEventUpdated={(id, updatedData) =>
                            setEvents((prev) =>
                                prev.map((ev) => (ev.eventId === id ? { ...ev, ...updatedData } : ev))
                            )
                        }
                        onEventDeleted={(id) =>
                            setEvents((prev) => prev.filter((ev) => ev.eventId !== id))
                        }
                    />

                ))}
            </div>
        </main>
    );
}
