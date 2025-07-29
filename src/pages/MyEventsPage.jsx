import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import api from '../api/api';

export default function MyEventsPage() {
<<<<<<< HEAD
    const [joinedEvents, setJoinedEvents] = useState([]);
    const [participantCounts, setParticipantCounts] = useState({});

    const userId = parseInt(localStorage.getItem("userId"));

    useEffect(() => {
        if (userId) {
            api.get(`/events/myevents?userId=${userId}`)
                .then((res) => {
                    setJoinedEvents(res.data);

                    // Her etkinlik için participantCount'u getir
                    res.data.forEach(event => {
                        api.get(`/events/${event.eventId}/participantCount`)
                            .then(countRes => {
                                setParticipantCounts(prev => ({
                                    ...prev,
                                    [event.eventId]: countRes.data
                                }));
                            })
                            .catch(err => console.error('Katılımcı sayısı alınamadı:', err));
                    });
                })
                .catch((err) => console.error('Katıldığın etkinlikler alınamadı:', err));
        }
    }, [userId]);

    return (
        <main className="bg-gray-100 min-h-screen py-10 px-6">
            <h1 className="text-3xl font-bold mb-6 text-black">My Events</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {joinedEvents.map((event) => (
                    <Card
                        key={event.eventId}
                        title={event.title}
                        description={event.description}
                        image={event.imageUrl || 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e'}
                        participantLimit={event.participantLimit}
                        participantCount={participantCounts[event.eventId] ?? 0}
                        eventDate={event.eventDate}
                        eventId={event.eventId}
                        eventOwnerId={event.userId}
                        currentUserId={userId}
                        isJoined={true} // çünkü bu sayfa zaten joined eventleri gösteriyor
                        onEventUpdated={(id, updatedData) =>
                            setJoinedEvents((prev) =>
                                prev.map((ev) => (ev.eventId === id ? { ...ev, ...updatedData } : ev))
                            )
                        }
                        onEventDeleted={(id) =>
                            setJoinedEvents((prev) => prev.filter((ev) => ev.eventId !== id))
                        }
                    />
                ))}
            </div>
=======
    const [myEvents, setMyEvents] = useState([]);
    const [joinedEventIds, setJoinedEventIds] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        api.get(`/events/myevents?userId=${userId}`)
            .then((res) => {
                setMyEvents(res.data);
                const ids = res.data.map(event => event.eventId);
                setJoinedEventIds(ids); // 👈 bu satırı ekle
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
                            eventId={event.eventId}
                            eventOwnerId={event.userId}
                            currentUserId={parseInt(localStorage.getItem("userId"))}
                            onEventDeleted={(id) =>
                                setMyEvents((prev) => prev.filter((ev) => ev.eventId !== id))
                            }
                            isMyEvent={true}
                            isJoined={joinedEventIds.includes(event.eventId)}
                        />
                    ))}
                </div>
            )}
>>>>>>> ac03ff2292459be05d0e9afe03b22e3ade267ae3
        </main>
    );
}
