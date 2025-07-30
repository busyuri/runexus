import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import api from '../api/api';

export default function MyEventsPage() {
    const [joinedEvents, setJoinedEvents] = useState([]);
    const [participantCounts, setParticipantCounts] = useState({});
    const userId = parseInt(localStorage.getItem("userId"));

    useEffect(() => {
        fetchMyEvents();
    }, [userId]);

    const fetchMyEvents = () => {
        if (userId) {
            api.get(`/events/myevents?userId=${userId}`)
                .then((res) => {
                    setJoinedEvents(res.data);
                    res.data.forEach(event => {
                        fetchParticipantCount(event.eventId);
                    });
                })
                .catch((err) => console.error('Failed to fetch joined events:', err));
        }
    };

    const fetchParticipantCount = (eventId) => {
        api.get(`/events/${eventId}/participantCount`)
            .then(countRes => {
                setParticipantCounts(prev => ({
                    ...prev,
                    [eventId]: countRes.data
                }));
            })
            .catch(err => console.error('Failed to fetch participant count:', err));
    };

    const handleJoinUpdate = (id, updatedData) => {
        setJoinedEvents(prev =>
            prev.map((ev) => (ev.eventId === id ? { ...ev, ...updatedData } : ev))
        );
    };

    const handleLeaveUpdate = (id, updatedData) => {
        setJoinedEvents(prev =>
            prev.filter((ev) => ev.eventId !== id)
        );
        setParticipantCounts(prev => {
            const updated = { ...prev };
            delete updated[id];
            return updated;
        });
    };

    const handleEventUpdated = (id, updatedData) => {
        if (updatedData.action === 'leave') {
            handleLeaveUpdate(id, updatedData);
        } else {
            handleJoinUpdate(id, updatedData);
            fetchParticipantCount(id);
        }
    };

    const handleEventDeleted = (id) => {
        setJoinedEvents(prev => prev.filter((ev) => ev.eventId !== id));
        setParticipantCounts(prev => {
            const updated = { ...prev };
            delete updated[id];
            return updated;
        });
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
            <h1 className="text-3xl font-bold mb-6 text-black">My Events</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {joinedEvents.map((event) => (
                    <Card
                        key={event.eventId}
                        title={event.title}
                        description={event.description}
                        image={event.imageUrl || monthImages[new Date(event.eventDate).getMonth()]}
                        participantLimit={event.participantLimit}
                        participantCount={participantCounts[event.eventId] ?? 0}
                        eventDate={event.eventDate}
                        eventId={event.eventId}
                        eventOwnerId={event.userId}
                        currentUserId={userId}
                        isJoined={true}
                        onEventUpdated={handleEventUpdated}
                        onEventDeleted={handleEventDeleted}
                    />
                ))}
            </div>
        </main>
    );
}