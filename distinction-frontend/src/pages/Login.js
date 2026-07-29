import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api';

export default function Login() {
    const navigate = useNavigate();
    const [email,        setEmail]        = useState('');
    const [password,     setPassword]     = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error,        setError]        = useState('');
    const [loading,      setLoading]      = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await login(email, password);
            localStorage.setItem('token',    data.token);
            localStorage.setItem('userId',   data.userId);
            localStorage.setItem('userName', data.name);
            localStorage.setItem('userRole', data.role);
            navigate('/');
        } catch (err) {
            setError('Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-box">
                <h2>Distinction Link</h2>
                <p style={{ textAlign: 'center', color: '#888',
                    fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                    Welcome back! Log in to continue learning
                </p>

                {error && (
                    <div style={{ background: '#fdecea', color: '#e74c3c',
                        padding: '10px 14px', borderRadius: '6px',
                        marginBottom: '1rem', fontSize: '0.88rem' }}>
                         {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="you@email.com"
                            required
                        />
                    </div>

                    {/* Password with show/hide */}
                    <div className="form-group">
                        <label>Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Your password"
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
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-full"
                        disabled={loading}
                        style={{ marginTop: '0.5rem' }}
                    >
                        {loading ? 'Logging in…' : 'Log In'}
                    </button>
                </form>

                <p className="auth-link" style={{ marginTop: '1.2rem' }}>
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
}