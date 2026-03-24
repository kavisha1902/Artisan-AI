import { useEffect, useState } from 'react';
import { Calendar, MapPin, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Event {
    id: number;
    title: string;
    location: string;
    eventDate: string;
}

export default function Events() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
    const [eventTypeFilter, setEventTypeFilter] = useState('all');
    const [lastUpdated, setLastUpdated] = useState(Date.now());

    const eventTypes = ['all', 'Exhibition', 'Trade Fair', 'Workshop', 'Networking'];

    // ✅ Fetch all events
    const fetchEvents = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/events');
            if (!res.ok) throw new Error('Failed to fetch events');
            const data = await res.json();
            setEvents(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Initial + Auto Refresh (polling every 10s)
    useEffect(() => {
        fetchEvents();
        const interval = setInterval(() => {
            fetchEvents();
            setLastUpdated(Date.now());
        }, 10000); // refresh every 10 seconds
        return () => clearInterval(interval);
    }, []);

    // ✅ Reminder Button
    const handleSetReminder = (event: Event) => {
        const eventTime = new Date(event.eventDate).getTime();
        const now = Date.now();
        const delay = eventTime - now - 10 * 60 * 1000; // 10 min before

        if (delay > 0) {
            setTimeout(() => {
                alert(`🔔 Reminder: ${event.title} at ${event.location} starts soon!`);
            }, delay);
            alert(`✅ Reminder set for "${event.title}"`);
        } else {
            alert('Event is too close or already passed.');
        }
    };

    // ✅ Share Button
    const handleShare = (event: Event) => {
        const message = `📅 ${event.title} at ${event.location} on ${new Date(event.eventDate).toLocaleString()}`;
        if (navigator.share) {
            navigator.share({
                title: event.title,
                text: message,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(message);
            alert('📋 Event details copied to clipboard!');
        }
    };

    if (loading) {
        return <p className="text-center text-gray-500 mt-10">Loading events...</p>;
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-heading font-bold text-text mb-2">Events & Workshops</h1>
                <p className="text-gray-600">Stay updated with exhibitions, fairs, and training sessions</p>
                <p className="text-xs text-gray-400 mt-1">Last synced: {new Date(lastUpdated).toLocaleTimeString()}</p>
            </div>

            {/* View toggle + filters */}
            <div className="flex items-center justify-between">
                <div className="flex gap-2">
                    <button
                        onClick={() => setViewMode('list')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            viewMode === 'list'
                                ? 'bg-green-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        List View
                    </button>
                    <button
                        onClick={() => setViewMode('calendar')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            viewMode === 'calendar'
                                ? 'bg-green-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        Calendar View
                    </button>
                </div>

                <div className="flex gap-2">
                    {eventTypes.map((type) => (
                        <button
                            key={type}
                            onClick={() => setEventTypeFilter(type)}
                            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                                eventTypeFilter === type
                                    ? 'bg-green-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Event Cards */}
            {viewMode === 'list' ? (
                <div className="space-y-4">
                    {events.length === 0 ? (
                        <p className="text-gray-500 text-center mt-10">No events found</p>
                    ) : (
                        events.map((event) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-heading font-bold text-text mb-2">
                                            {event.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar className="w-5 h-5" />
                                            <span>{new Date(event.eventDate).toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <MapPin className="w-5 h-5" />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => handleSetReminder(event)}
                                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                                        >
                                            Set Reminder
                                        </button>
                                        <button
                                            onClick={() => handleShare(event)}
                                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold flex items-center justify-center gap-2"
                                        >
                                            <Share2 className="w-4 h-4" />
                                            Share
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-xl p-6 shadow-sm"
                >
                    <div className="text-center text-gray-500 py-12">
                        <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <p className="text-lg font-semibold mb-2">Calendar View</p>
                        <p className="text-sm">Full calendar implementation coming soon</p>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
