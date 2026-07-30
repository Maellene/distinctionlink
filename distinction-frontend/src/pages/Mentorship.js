import React, { useEffect, useState } from 'react';
import { getMentors, bookSession, getMyMentorshipSessions } from '../services/api';

export default function Mentorship() {
    const userId = localStorage.getItem('userId');
    const role   = localStorage.getItem('userRole');
    const token  = localStorage.getItem('token');

    const [mentors,        setMentors]        = useState([]);
    const [sessions,       setSessions]       = useState([]);
    const [selectedMentor, setSelectedMentor] = useState('');
    const [topic,          setTopic]          = useState('');
    const [scheduledAt,    setScheduledAt]    = useState('');
    const [message,        setMessage]        = useState('');
    const [messageType,    setMessageType]    = useState('success');
    const [loading,        setLoading]        = useState(true);
    const [newSlot,        setNewSlot]        = useState('');
    const [slotMsg,        setSlotMsg]        = useState('');

    useEffect(() => {
        async function load() {
            try {
                if (role === 'STUDENT') {
                    const [mentorData, sessionData] = await Promise.all([
                        getMentors(),
                        getMyMentorshipSessions(userId),
                    ]);
                    setMentors(mentorData);
                    setSessions(sessionData);
                }
                if (role === 'MENTOR') {
                    const res = await fetch(
                        `http://localhost:8080/api/mentorship/sessions/mentor/${userId}`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    setSessions(await res.json());
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [userId, role, token]);

    async function handleBook(e) {
        e.preventDefault();
        if (!selectedMentor || !topic.trim() || !scheduledAt) {
            setMessage('Please fill in all fields.');
            setMessageType('error');
            return;
        }
        try {
            const isoDate = new Date(scheduledAt).toISOString().slice(0, 19);
            await bookSession(Number(userId), Number(selectedMentor), topic, isoDate);
            setMessage('Session booked successfully!');
            setMessageType('success');
            setTopic('');
            setScheduledAt('');
            setSelectedMentor('');
            const sessionData = await getMyMentorshipSessions(userId);
            setSessions(sessionData);
        } catch (err) {
            setMessage(err.message || 'Booking failed. Please try again.');
            setMessageType('error');
        }
        setTimeout(() => setMessage(''), 4000);
    }

    async function addSlot(e) {
        e.preventDefault();
        if (!newSlot) return;
        try {
            await fetch('http://localhost:8080/api/mentorship/availability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ mentorId: Number(userId), dateTime: newSlot }),
            });
            setSlotMsg('Slot added successfully.');
            setNewSlot('');
        } catch (err) {
            setSlotMsg('Failed to add slot.');
        }
        setTimeout(() => setSlotMsg(''), 3000);
    }

    if (loading) return (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
            <p style={{ color: '#888' }}>Loading mentorship data...</p>
        </div>
    );

    if (role === 'MENTOR') {
        return (
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '0.3rem' }}>Mentorship</h1>
                <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '2rem' }}>
                    Manage your sessions and availability.
                </p>

                <div style={{ display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem', alignItems: 'start' }}>

                    <div>
                        <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                            Your Sessions ({sessions.length})
                        </h2>
                        {sessions.length === 0 ? (
                            <div style={{ background: '#fff', borderRadius: '12px', padding: '2rem',
                                textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
                                <p style={{ color: '#888', fontSize: '0.9rem' }}>
                                    No sessions booked yet. Students will appear here once they book you.
                                </p>
                            </div>
                        ) : sessions.map(s => (
                            <div key={s.id} style={{ background: '#fff', borderRadius: '12px',
                                padding: '1.2rem 1.4rem', marginBottom: '8px',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
                                borderLeft: '4px solid #27ae60' }}>
                                <p style={{ fontWeight: 700, fontSize: '0.92rem',
                                    color: '#1a3c5e', marginBottom: '4px' }}>{s.topic}</p>
                                <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '2px' }}>
                                    Student: {s.student?.name} · {s.student?.email}
                                </p>
                                <p style={{ fontSize: '0.8rem', color: '#666' }}>
                                    {new Date(s.scheduledAt).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Add Available Slot</h2>
                        <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
                            {slotMsg && (
                                <div style={{ padding: '10px', borderRadius: '8px',
                                    marginBottom: '1rem', fontSize: '0.88rem', fontWeight: 600,
                                    background: '#eafaf1', color: '#27ae60' }}>
                                    {slotMsg}
                                </div>
                            )}
                            <form onSubmit={addSlot}>
                                <div className="form-group">
                                    <label>Pick a date and time</label>
                                    <input type="datetime-local" value={newSlot}
                                           onChange={e => setNewSlot(e.target.value)}
                                           min={new Date().toISOString().slice(0, 16)}
                                           required />
                                </div>
                                <button type="submit" className="btn btn-primary"
                                        style={{ width: '100%', marginTop: '0.5rem' }}>
                                    Add Slot
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '0.3rem' }}>Mentorship</h1>
            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '2rem' }}>
                Book a session with one of our mentors and get personalized guidance.
            </p>

            <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Book a Session</h2>
            <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.07)', marginBottom: '2rem' }}>

                {message && (
                    <div style={{ padding: '10px 14px', borderRadius: '8px',
                        marginBottom: '1rem', fontSize: '0.88rem', fontWeight: 600,
                        background: messageType === 'success' ? '#eafaf1' : '#fdecea',
                        color:      messageType === 'success' ? '#27ae60' : '#e74c3c' }}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleBook}>
                    <div className="form-group">
                        <label>Choose a Mentor</label>
                        {mentors.length === 0 ? (
                            <p style={{ color: '#e74c3c', fontSize: '0.85rem',
                                padding: '10px', background: '#fdecea', borderRadius: '6px' }}>
                                No mentors available yet.
                            </p>
                        ) : (
                            <select value={selectedMentor}
                                    onChange={e => setSelectedMentor(e.target.value)} required>
                                <option value=""> </option>
                                {mentors.map(m => (
                                    <option key={m.id} value={m.id}>{m.name}</option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Topic</label>
                        <input value={topic} onChange={e => setTopic(e.target.value)}
                               placeholder=""
                               required />
                    </div>

                    <div className="form-group">
                        <label>Date and Time</label>
                        <input type="datetime-local" value={scheduledAt}
                               onChange={e => setScheduledAt(e.target.value)}
                               min={new Date().toISOString().slice(0, 16)}
                               required />
                    </div>

                    <button type="submit" className="btn btn-primary"
                            style={{ width: '100%', marginTop: '0.5rem' }}
                            disabled={mentors.length === 0}>
                        Book Session
                    </button>
                </form>
            </div>

            <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                My Sessions ({sessions.length})
            </h2>
            {sessions.length === 0 ? (
                <div style={{ background: '#fff', borderRadius: '12px', padding: '2rem',
                    textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
                    <p style={{ color: '#888', fontSize: '0.9rem' }}>
                        No sessions yet. Book your first one above.
                    </p>
                </div>
            ) : (
                <div style={{ display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                    {sessions.map(s => (
                        <div key={s.id} style={{ background: '#fff', borderRadius: '12px',
                            padding: '1.2rem 1.4rem', boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
                            borderLeft: '4px solid #27ae60' }}>
                            <p style={{ fontWeight: 700, fontSize: '0.92rem',
                                color: '#1a3c5e', marginBottom: '4px' }}>{s.topic}</p>
                            <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '4px' }}>
                                Mentor: {s.mentor?.name}
                            </p>
                            <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '8px' }}>
                                {new Date(s.scheduledAt).toLocaleString()}
                            </p>
                            <span style={{ display: 'inline-block', padding: '3px 12px',
                                borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700,
                                background: '#eafaf1', color: '#27ae60' }}>
                {s.status}
              </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}