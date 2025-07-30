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


    const handleJoinUpdate = (id, updatedData) => {
        setEvents((prev) =>
            prev.map((ev) => (ev.eventId === id ? { ...ev, ...updatedData } : ev))
        );


        if (!joinedEventIds.includes(id)) {
            setJoinedEventIds((prev) => [...prev, id]);
        }
    };
    const handleLeaveUpdate = (id, updatedData) => {
        setEvents((prev) =>
            prev.map((ev) => (ev.eventId === id ? { ...ev, ...updatedData } : ev))
        );


        setJoinedEventIds((prev) => prev.filter((eid) => eid !== id));
    };




    const userId = parseInt(localStorage.getItem("userId"));
    const token = localStorage.getItem("token");

    useEffect(() => {
        api.get('/events')
            .then(async (res) => {
                console.log('Event verisi:', res.data);

                const events = res.data;


                const eventsWithCounts = await Promise.all(
                    events.map(async (event) => {
                        try {
                            const countRes = await api.get(`/events/${event.eventId}/participantCount`);
                            return { ...event, participantCount: countRes.data };
                        } catch (err) {
                            console.error(`Count alınamadı (eventId=${event.eventId}):`, err);
                            return { ...event, participantCount: 0 };
                        }
                    })
                );

                setEvents(eventsWithCounts);
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

    useEffect(() => {
        if (localStorage.getItem("fromLanding") === "true") {

            setTimeout(() => {
                localStorage.removeItem("fromLanding");
            }, 1000);
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

    const monthImages = {
        0: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        1: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        2: 'https://images.unsplash.com/photo-1547483238-f400e65ccd56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        3: 'https://images.unsplash.com/photo-1596460456678-760115935178?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        4: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        5: 'https://images.unsplash.com/photo-1496989663690-1d3c84c8255f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        6: 'https://images.unsplash.com/photo-1644456654239-3c036c0c28fe?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        7: 'https://images.unsplash.com/photo-1602248349525-be667454a880?q=80&w=2894&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        8: 'https://images.unsplash.com/photo-1596460456678-760115935178?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        9: 'https://images.unsplash.com/photo-1664999407875-b4d94999f9be?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        10: 'https://images.unsplash.com/photo-1590646299178-1b26ab821e34?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        11: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
                        image={monthImages[new Date(event.eventDate).getMonth()]}
                        participantLimit={event.participantLimit}
                        participantCount={event.participantCount}
                        eventDate={event.eventDate}
                        eventId={event.eventId}
                        eventOwnerId={event.userId}
                        currentUserId={userId}
                        isJoined={joinedEventIds.includes(event.eventId)}
                        onEventUpdated={(id, updatedData) => {

                            if (updatedData.action === 'join') {
                                handleJoinUpdate(id, updatedData);
                            } else if (updatedData.action === 'leave') {
                                handleLeaveUpdate(id, updatedData);
                            } else {

                                setEvents((prev) =>
                                    prev.map((ev) => (ev.eventId === id ? { ...ev, ...updatedData } : ev))
                                );
                            }
                        }}
                        onEventDeleted={(id) =>
                            setEvents((prev) => prev.filter((ev) => ev.eventId !== id))
                        }
                    />


                ))}
            </div>
        </main>
    );
}