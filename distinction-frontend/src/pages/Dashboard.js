import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const userName = localStorage.getItem('userName');
    const role     = localStorage.getItem('userRole');
    const navigate = useNavigate();

    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    };

    const studentCards = [
        {
            title: 'My Learning',
            description: 'View your enrolled courses and resume where you left off.',
            action: () => navigate('/my-learning'),
            label: 'Go to My Learning',
        },
        {
            title: 'Browse Courses',
            description: 'Explore our full library of free tech courses.',
            action: () => navigate('/courses'),
            label: 'Browse Courses',
        },
        {
            title: 'Mentorship',
            description: 'Book a session with a mentor and get personalized guidance.',
            action: () => navigate('/mentorship'),
            label: 'Find a Mentor',
        },
      
    ];

    const mentorCards = [
        {
            title: 'My Sessions',
            description: 'View and manage sessions students have booked with you.',
            action: () => navigate('/mentorship'),
            label: 'View Sessions',
        },
        {
            title: 'Courses',
            description: 'Browse the course library available on the platform.',
            action: () => navigate('/courses'),
            label: 'Browse Courses',
        },
        {
            title: 'Notifications',
            description: 'Stay updated with new session requests and announcements.',
            action: () => navigate('/notifications'),
            label: 'View Notifications',
        },
    ];

    const adminCards = [
        {
            title: 'Admin Panel',
            description: 'Manage courses, view all registered users and monitor the platform.',
            action: () => navigate('/admin'),
            label: 'Open Admin Panel',
        },
        {
            title: 'Notifications',
            description: 'View platform notifications and announcements.',
            action: () => navigate('/notifications'),
            label: 'View Notifications',
        },
    ];

    const cards = role === 'STUDENT' ? studentCards :
        role === 'MENTOR'  ? mentorCards  : adminCards;

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2.5rem' }}>
                <p style={{ color: '#888', fontSize: '0.95rem', marginBottom: '0.3rem' }}>
                    {greeting()},
                </p>
                <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.4rem)',
                    marginBottom: '0.5rem', color: '#1a3c5e' }}>
                    {userName?.split(' ')[0]}
                </h1>
                <p style={{ color: '#888', fontSize: '0.95rem' }}>
                    {role === 'STUDENT' && 'What would you like to do today?'}
                    {role === 'MENTOR'  && 'Your guidance is making a difference.'}
                    {role === 'ADMIN'   && 'Manage and monitor the platform.'}
                </p>
            </div>

            <div style={{ display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '1.2rem' }}>
                {cards.map((card, i) => (
                    <div key={i} onClick={card.action}
                         onMouseEnter={e =>
                             e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.12)'}
                         onMouseLeave={e =>
                             e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.07)'}
                         style={{
                             background: '#fff',
                             borderRadius: '14px',
                             padding: '1.5rem',
                             cursor: 'pointer',
                             boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
                             transition: 'box-shadow 0.2s',
                         }}>
                        <h3 style={{ fontSize: '1rem', color: '#1a3c5e',
                            marginBottom: '0.6rem' }}>
                            {card.title}
                        </h3>
                        <p style={{ fontSize: '0.85rem', color: '#666',
                            marginBottom: '1.2rem', lineHeight: 1.5 }}>
                            {card.description}
                        </p>
                        <span style={{
                            display: 'inline-block',
                            background: '#1a3c5e', color: '#fff',
                            padding: '7px 18px', borderRadius: '8px',
                            fontSize: '0.82rem', fontWeight: 600,
                        }}>
              {card.label}
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
}