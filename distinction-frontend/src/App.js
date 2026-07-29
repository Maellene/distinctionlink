import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import MyLearning from './pages/MyLearning';
import Mentorship from './pages/Mentorship';
import Notifications from './pages/Notifications';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';
import './App.css';

function PrivateRoute({ children }) {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
}

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <div className="page-content">{children}</div>
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login"    element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={
                    <PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>
                } />
                <Route path="/my-learning" element={
                    <PrivateRoute><Layout><MyLearning /></Layout></PrivateRoute>
                } />
                <Route path="/courses" element={
                    <PrivateRoute><Layout><Courses /></Layout></PrivateRoute>
                } />
                <Route path="/courses/:courseId" element={
                    <PrivateRoute><Layout><CourseDetail /></Layout></PrivateRoute>
                } />
                <Route path="/mentorship" element={
                    <PrivateRoute><Layout><Mentorship /></Layout></PrivateRoute>
                } />
                <Route path="/notifications" element={
                    <PrivateRoute><Layout><Notifications /></Layout></PrivateRoute>
                } />
                <Route path="/admin" element={
                    <PrivateRoute><Layout><Admin /></Layout></PrivateRoute>
                } />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}