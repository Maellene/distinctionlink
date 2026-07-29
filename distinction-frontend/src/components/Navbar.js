import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getNotifications } from '../services/api';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const name     = localStorage.getItem('userName') || 'User';
    const role     = localStorage.getItem('userRole');
    const userId   = localStorage.getItem('userId');

    const [menuOpen,    setMenuOpen]    = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        async function loadCount() {
            try {
                const data = await getNotifications(userId);
                setUnreadCount(data.filter(n => !n.read).length);
            } catch (err) {
                console.error(err);
            }
        }
        if (userId) loadCount();
    }, [userId, location.pathname]);

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        navigate('/login');
    }

    function isActive(path) {
        return location.pathname === path;
    }

    const linkStyle = (path) => ({
        color: isActive(path) ? '#fff' : '#a8c4e0',
        textDecoration: 'none',
        fontSize: '0.9rem',
        fontWeight: isActive(path) ? 700 : 400,
        borderBottom: isActive(path) ? '2px solid #fff' : '2px solid transparent',
        paddingBottom: '2px',
    });

    return (
        <>
            <nav style={{
                background: '#1a3c5e', color: '#fff',
                padding: '0 1.5rem', height: '60px',
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky', top: 0, zIndex: 100,
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem' }}>
            Distinction Link
          </span>
                </Link>

                {/* Desktop links */}
                <div style={{ display: 'flex', gap: '1.8rem', alignItems: 'center' }}
                     className="nav-desktop">
                    <Link to="/" style={linkStyle('/')}>Dashboard</Link>
                    {role === 'STUDENT' && (
                        <Link to="/my-learning" style={linkStyle('/my-learning')}>My Learning</Link>
                    )}
                    {role !== 'ADMIN' && (
                        <Link to="/courses" style={linkStyle('/courses')}>Courses</Link>
                    )}
                    {role === 'STUDENT' && (
                        <Link to="/mentorship" style={linkStyle('/mentorship')}>Mentorship</Link>
                    )}
                    {role === 'ADMIN' && (
                        <Link to="/admin" style={linkStyle('/admin')}>Admin Panel</Link>
                    )}
                </div>

                {/* Right side */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                     className="nav-desktop">

                    {/* Notification bell — links to notifications page */}
                    <Link to="/notifications"
                          style={{ position: 'relative', color: '#fff',
                              textDecoration: 'none', lineHeight: 1, padding: '4px' }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                        {unreadCount > 0 && (
                            <span style={{
                                position: 'absolute', top: '-4px', right: '-4px',
                                background: '#e74c3c', color: '#fff', borderRadius: '50%',
                                width: '18px', height: '18px', fontSize: '0.62rem',
                                fontWeight: 700, display: 'flex', alignItems: 'center',
                                justifyContent: 'center', lineHeight: 1,
                            }}>
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
                        )}
                    </Link>

                    <span style={{ fontSize: '0.82rem', color: '#a8c4e0' }}>
            Hi, {name.split(' ')[0]}
          </span>
                    <span style={{
                        background: role === 'ADMIN'  ? '#e67e22' :
                            role === 'MENTOR' ? '#27ae60' : '#2c5282',
                        color: '#fff', padding: '2px 10px', borderRadius: '20px',
                        fontSize: '0.72rem', fontWeight: 700,
                    }}>
            {role}
          </span>
                    <button onClick={handleLogout} style={{
                        background: '#e74c3c', border: 'none', color: '#fff',
                        padding: '6px 14px', borderRadius: '6px', cursor: 'pointer',
                        fontSize: '0.82rem', fontWeight: 600,
                    }}>
                        Logout
                    </button>
                </div>

                {/* Hamburger */}
                <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}
                        style={{ display: 'none', background: 'none', border: 'none',
                            color: '#fff', fontSize: '1.3rem', cursor: 'pointer' }}>
                    {menuOpen ? 'X' : 'Menu'}
                </button>
            </nav>

            {/* Mobile menu */}
            {menuOpen && (
                <div style={{ background: '#1a3c5e', padding: '1rem 1.5rem',
                    display: 'flex', flexDirection: 'column', gap: '1rem',
                    borderTop: '1px solid #2c5282' }} className="nav-mobile">
                    <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}
                          onClick={() => setMenuOpen(false)}>Dashboard</Link>
                    {role === 'STUDENT' && (
                        <Link to="/my-learning" style={{ color: '#a8c4e0', textDecoration: 'none' }}
                              onClick={() => setMenuOpen(false)}>My Learning</Link>
                    )}
                    {role !== 'ADMIN' && (
                        <Link to="/courses" style={{ color: '#a8c4e0', textDecoration: 'none' }}
                              onClick={() => setMenuOpen(false)}>Courses</Link>
                    )}
                    {role === 'STUDENT' && (
                        <Link to="/mentorship" style={{ color: '#a8c4e0', textDecoration: 'none' }}
                              onClick={() => setMenuOpen(false)}>Mentorship</Link>
                    )}
                    {role === 'ADMIN' && (
                        <Link to="/admin" style={{ color: '#a8c4e0', textDecoration: 'none' }}
                              onClick={() => setMenuOpen(false)}>Admin Panel</Link>
                    )}
                    <Link to="/notifications" style={{ color: '#a8c4e0', textDecoration: 'none' }}
                          onClick={() => setMenuOpen(false)}>
                        Notifications {unreadCount > 0 && `(${unreadCount})`}
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem',
                        paddingTop: '0.5rem', borderTop: '1px solid #2c5282' }}>
            <span style={{ color: '#a8c4e0', fontSize: '0.85rem' }}>
              {name} · {role}
            </span>
                        <button onClick={handleLogout} style={{
                            background: '#e74c3c', border: 'none', color: '#fff',
                            padding: '6px 14px', borderRadius: '6px',
                            cursor: 'pointer', fontSize: '0.82rem' }}>
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}