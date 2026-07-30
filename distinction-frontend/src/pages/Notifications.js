import React, { useEffect, useState } from 'react';
import { getNotifications } from '../services/api';

export default function Notifications() {
    const userId = localStorage.getItem('userId');
    const token  = localStorage.getItem('token');

    const [notifs,  setNotifs]  = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const data = await getNotifications(userId);
                setNotifs(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [userId]);

    async function markAllRead() {
        try {
            await Promise.all(
                notifs.filter(n => !n.read).map(n =>
                    fetch(`http://localhost:8080/api/users/${userId}/notifications/${n.id}/read`, {
                        method: 'PATCH',
                        headers: { Authorization: `Bearer ${token}` },
                    })
                )
            );
            const data = await getNotifications(userId);
            setNotifs(data);
        } catch (err) {
            console.error(err);
        }
    }

    const unread = notifs.filter(n => !n.read).length;

    if (loading) return (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
            <p style={{ color: '#888' }}>Loading notifications...</p>
        </div>
    );

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: '0.5rem' }}>
                <h1 style={{ margin: 0 }}>Notifications</h1>
                {unread > 0 && (
                    <button onClick={markAllRead}
                            style={{ background: 'none', border: '1px solid #1a3c5e',
                                color: '#1a3c5e', padding: '6px 16px', borderRadius: '8px',
                                cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}>
                        Mark all as read
                    </button>
                )}
            </div>

            {/* Badge */}
            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.8rem' }}>
                {unread > 0 ? (
                    <span>
            You have{' '}
                        <span style={{
                            background: '#e74c3c', color: '#fff', borderRadius: '20px',
                            padding: '2px 10px', fontSize: '0.8rem', fontWeight: 700,
                        }}>
              {unread} unread
            </span>
                        {' '}notification{unread !== 1 ? 's' : ''}
          </span>
                ) : (
                    'All caught up, no unread notifications.'
                )}
            </p>

            {/* List */}
            {notifs.length === 0 ? (
                <div style={{ background: '#fff', borderRadius: '14px',
                    padding: '3rem', textAlign: 'center',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                    <p style={{ color: '#888', fontSize: '0.95rem' }}>
                        No notifications yet. They will appear here when you enroll in courses,
                        book mentorship sessions or receive announcements.
                    </p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {notifs.map(n => (
                        <div key={n.id} style={{
                            background: '#fff', borderRadius: '12px',
                            padding: '1.1rem 1.4rem',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                            borderLeft: n.read ? '4px solid #eee' : '4px solid #1a3c5e',
                            display: 'flex', justifyContent: 'space-between',
                            alignItems: 'flex-start', gap: '1rem',
                        }}>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: '0.88rem',
                                    color: n.read ? '#777' : '#222',
                                    fontWeight: n.read ? 400 : 600,
                                    marginBottom: '0.3rem', lineHeight: 1.5 }}>
                                    {n.message}
                                </p>
                                <p style={{ fontSize: '0.75rem', color: '#aaa' }}>
                                    {new Date(n.createdAt).toLocaleString()}
                                </p>
                            </div>
                            {!n.read && (
                                <span style={{
                                    background: '#1a3c5e', width: '8px', height: '8px',
                                    borderRadius: '50%', flexShrink: 0, marginTop: '6px',
                                }} />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}