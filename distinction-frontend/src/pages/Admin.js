import React, { useEffect, useState } from 'react';
import { getCourses, createCourse } from '../services/api';

export default function Admin() {
    const role = localStorage.getItem('userRole');
    const [courses, setCourses] = useState([]);
    const [users,   setUsers]   = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        title: '', description: '', instructor: '',
        category: '', duration: ''
    });

    //  useEffect must always be called — no conditionals before it
    useEffect(() => {
        if (role !== 'ADMIN') return; // skip loading if not admin

        async function load() {
            try {
                const courseData = await getCourses();
                setCourses(courseData);

                const res = await fetch('http://localhost:8080/api/users/all', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                if (res.ok) {
                    const userData = await res.json();
                    setUsers(userData);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [role]);

    // ✅ Role check AFTER hooks
    if (role !== 'ADMIN') {
        return (
            <div style={{ padding: '3rem', textAlign: 'center' }}>
                <h2>Access Denied</h2>
                <p>You must be an admin to view this page.</p>
            </div>
        );
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleCreateCourse(e) {
        e.preventDefault();
        try {
            await createCourse({ ...form, duration: parseInt(form.duration) });
            setMessage(' Course created successfully!');
            setForm({ title: '', description: '', instructor: '', category: '', duration: '' });
            const courseData = await getCourses();
            setCourses(courseData);
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage(' Failed: ' + err.message);
        }
    }

    const students = users.filter(u => u.role === 'STUDENT');
    const mentors  = users.filter(u => u.role === 'MENTOR');

    if (loading) return <p className="info-msg">Loading admin panel…</p>;

    return (
        <div>
            <h1> Admin Panel</h1>

            {/* ── Stats ── */}
            <div className="stats-row">
                <div className="stat-box">
                    <div className="stat-number">{courses.length}</div>
                    <div className="stat-label">Total Courses</div>
                </div>
                <div className="stat-box">
                    <div className="stat-number">{students.length}</div>
                    <div className="stat-label">Students</div>
                </div>
                <div className="stat-box">
                    <div className="stat-number">{mentors.length}</div>
                    <div className="stat-label">Mentors</div>
                </div>
                <div className="stat-box">
                    <div className="stat-number">{users.length}</div>
                    <div className="stat-label">Total Users</div>
                </div>
            </div>

            {/* ── Add New Course ── */}
            <div className="section">
                <h2> Add New Course</h2>
                <div className="card" style={{ maxWidth: '600px' }}>
                    {message && (
                        <p style={{ marginBottom: '1rem',
                            color: message.startsWith('') ? '#27ae60' : '#e74c3c',
                            fontWeight: 600 }}>
                            {message}
                        </p>
                    )}
                    <form onSubmit={handleCreateCourse}>
                        <div className="form-group">
                            <label>Course Title</label>
                            <input name="title" value={form.title} onChange={handleChange}
                                   placeholder="e.g. Introduction to Python" required />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea name="description" value={form.description}
                                      onChange={handleChange}
                                      placeholder="What will students learn?"
                                      style={{ width: '100%', padding: '10px', borderRadius: '6px',
                                          border: '1px solid #ccc', fontSize: '0.95rem', minHeight: '80px' }}
                                      required />
                        </div>
                        <div className="form-group">
                            <label>Instructor Name</label>
                            <input name="instructor" value={form.instructor} onChange={handleChange}
                                   placeholder="e.g. Amara Diallo" required />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select name="category" value={form.category}
                                    onChange={handleChange} required>
                                <option value="">-- Select category --</option>
                                <option value="Programming">Programming</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Career Development">Career Development</option>
                                <option value="Design">Design</option>
                                <option value="Business">Business</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Duration (hours)</label>
                            <input name="duration" type="number" value={form.duration}
                                   onChange={handleChange} placeholder="e.g. 20" required />
                        </div>
                        <button type="submit" className="btn btn-success">
                            Create Course
                        </button>
                    </form>
                </div>
            </div>

            {/* ── All Courses ── */}
            <div className="section">
                <h2> All Courses ({courses.length})</h2>
                {courses.length === 0 ? (
                    <p className="info-msg">No courses yet. Add one above!</p>
                ) : (
                    <div className="card-grid">
                        {courses.map(c => (
                            <div className="card" key={c.id}>
                                <span className="badge">{c.category}</span>
                                <h3>{c.title}</h3>
                                <p>{c.description?.slice(0, 80)}…</p>
                                <p><strong>Instructor:</strong> {c.instructor}</p>
                                <p><strong>Duration:</strong> {c.duration}h</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── All Users ── */}
            <div className="section">
                <h2> Registered Users ({users.length})</h2>
                {users.length === 0 ? (
                    <p className="info-msg">No users yet.</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse',
                        background: '#fff', borderRadius: '8px', overflow: 'hidden',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                        <thead>
                        <tr style={{ background: '#1a3c5e', color: '#fff' }}>
                            <th style={th}>ID</th>
                            <th style={th}>Name</th>
                            <th style={th}>Email</th>
                            <th style={th}>Role</th>
                            <th style={th}>Joined</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((u, i) => (
                            <tr key={u.id} style={{ background: i % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                                <td style={td}>{u.id}</td>
                                <td style={td}>{u.name}</td>
                                <td style={td}>{u.email}</td>
                                <td style={td}>
                    <span className="badge" style={{
                        background: u.role === 'MENTOR' ? '#eafaf1' :
                            u.role === 'ADMIN'  ? '#fef3e2' : '#eef2f7',
                        color:      u.role === 'MENTOR' ? '#27ae60' :
                            u.role === 'ADMIN'  ? '#e67e22' : '#1a3c5e',
                    }}>{u.role}</span>
                                </td>
                                <td style={td}>
                                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

const th = { padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '0.88rem' };
const td = { padding: '10px 16px', fontSize: '0.88rem', borderBottom: '1px solid #eee' };