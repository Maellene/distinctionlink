const BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

function getHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
}

async function handleResponse(res) {
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Something went wrong');
    }
    return res.json();
}

export async function register(name, email, password, role) {
    const res = await fetch(`${BASE}/auth/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ name, email, password, role }),
    });
    return handleResponse(res);
}

export async function login(email, password) {
    const res = await fetch(`${BASE}/auth/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password }),
    });
    return handleResponse(res);
}

export async function getCourses() {
    const res = await fetch(`${BASE}/courses`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function searchCourses(keyword) {
    const res = await fetch(`${BASE}/courses/search?keyword=${keyword}`,
        { headers: getHeaders() });
    return handleResponse(res);
}

export async function createCourse(course) {
    const res = await fetch(`${BASE}/courses`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(course),
    });
    return handleResponse(res);
}

export async function enrollInCourse(studentId, courseId) {
    const res = await fetch(`${BASE}/enrollments`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ studentId, courseId }),
    });
    return handleResponse(res);
}

export async function getMyEnrollments(studentId) {
    const res = await fetch(`${BASE}/enrollments/student/${studentId}`,
        { headers: getHeaders() });
    return handleResponse(res);
}

export async function updateProgress(enrollmentId, progress) {
    const res = await fetch(`${BASE}/enrollments/${enrollmentId}/progress`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ progress }),
    });
    return handleResponse(res);
}

export async function getMentors() {
    const res = await fetch(`${BASE}/mentorship/mentors`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function bookSession(studentId, mentorId, topic, scheduledAt) {
    const res = await fetch(`${BASE}/mentorship/sessions`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ studentId, mentorId, topic, scheduledAt }),
    });
    return handleResponse(res);
}

export async function getMyMentorshipSessions(studentId) {
    const res = await fetch(`${BASE}/mentorship/sessions/student/${studentId}`,
        { headers: getHeaders() });
    return handleResponse(res);
}

export async function getNotifications(userId) {
    const res = await fetch(`${BASE}/users/${userId}/notifications`,
        { headers: getHeaders() });
    return handleResponse(res);
}