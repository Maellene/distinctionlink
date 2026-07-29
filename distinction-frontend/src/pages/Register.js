import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/api';

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '', email: '', password: '', role: 'STUDENT'
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error,   setError]   = useState('');
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        if (form.password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        setLoading(true);
        try {
            const data = await register(form.name, form.email, form.password, form.role);
            localStorage.setItem('token',    data.token);
            localStorage.setItem('userId',   data.userId);
            localStorage.setItem('userName', data.name);
            localStorage.setItem('userRole', data.role);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Registration failed. Try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-box">
                <h2> Create Account</h2>
                <p style={{ textAlign: 'center', color: '#888',
                    fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                    Join Distinction Link and start learning today
                </p>

                {error && (
                    <div style={{ background: '#fdecea', color: '#e74c3c',
                        padding: '10px 14px', borderRadius: '6px',
                        marginBottom: '1rem', fontSize: '0.88rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@email.com"
                            required
                        />
                    </div>

                    {/* Password with show/hide */}
                    <div className="form-group">
                        <label>Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={form.password}
                                onChange={handleChange}
                                placeholder="At least 6 characters"
                                required
                                style={{ paddingRight: '80px' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute', right: '10px', top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none', border: 'none',
                                    color: '#1a3c5e', cursor: 'pointer',
                                    fontSize: '0.8rem', fontWeight: 600,
                                }}
                            >
                                {showPassword ? ' Hide' : ' Show'}
                            </button>
                        </div>
                        {/* Password strength indicator */}
                        {form.password.length > 0 && (
                            <div style={{ marginTop: '6px' }}>
                                <div style={{ height: '4px', borderRadius: '4px',
                                    background: '#eee', overflow: 'hidden' }}>
                                    <div style={{
                                        height: '100%', borderRadius: '4px',
                                        transition: 'width 0.3s, background 0.3s',
                                        width: form.password.length < 6  ? '33%' :
                                            form.password.length < 10 ? '66%' : '100%',
                                        background: form.password.length < 6  ? '#e74c3c' :
                                            form.password.length < 10 ? '#f39c12' : '#27ae60',
                                    }} />
                                </div>
                                <p style={{ fontSize: '0.75rem', marginTop: '3px',
                                    color: form.password.length < 6  ? '#e74c3c' :
                                        form.password.length < 10 ? '#f39c12' : '#27ae60' }}>
                                    {form.password.length < 6  ? 'Too short' :
                                        form.password.length < 10 ? 'Good' : 'Strong ✓'}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Role — Student or Mentor only */}
                    <div className="form-group">
                        <label>I am registering as a…</label>
                        <select name="role" value={form.role} onChange={handleChange}>
                            <option value="STUDENT">Student</option>
                            <option value="MENTOR">Mentor</option>
                        </select>

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-full"
                        disabled={loading}
                        style={{ marginTop: '0.5rem' }}
                    >
                        {loading ? 'Creating your account…' : 'Create Account'}
                    </button>
                </form>

                <p className="auth-link" style={{ marginTop: '1.2rem' }}>
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
}