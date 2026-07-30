import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ALL_COURSES = [
    {
        id: 'python',
        title: 'Python for Beginners',
        category: 'Programming',
        level: 'Beginner',
        duration: '12 hours',
        instructor: 'freeCodeCamp',
        description: 'Learn Python from scratch. Covers variables, loops, functions, OOP and real projects.',
        thumbnail: 'https://img.youtube.com/vi/rfscVS0vtbw/hqdefault.jpg',
        lessons: 6,
        modules: [
            {
                title: 'Module 1 - Python Basics',
                videos: [
                    { title: 'Introduction and Setup',       videoId: 'rfscVS0vtbw', duration: '10:22' },
                    { title: 'Variables and Data Types',     videoId: 'cQT33yu9pY8', duration: '12:05' },
                    { title: 'Conditions and Loops',         videoId: 'Zp5MuPOtsSY', duration: '15:30' },
                ],
            },
            {
                title: 'Module 2 - Functions and OOP',
                videos: [
                    { title: 'Functions in Python',          videoId: 'u-OmVr_fT4s', duration: '18:44' },
                    { title: 'Classes and Objects',          videoId: 'apACNr7DC_s', duration: '20:10' },
                    { title: 'Final Project - Build a Game', videoId: 'rfscVS0vtbw', duration: '35:00' },
                ],
            },
        ],
    },
    {
        id: 'javascript',
        title: 'JavaScript Full Course',
        category: 'Web Development',
        level: 'Beginner',
        duration: '15 hours',
        instructor: 'freeCodeCamp',
        description: 'Master JavaScript from zero. DOM, events, async/await, fetch API and ES6+.',
        thumbnail: 'https://img.youtube.com/vi/PkZNo7MFNFg/hqdefault.jpg',
        lessons: 8,
        modules: [
            {
                title: 'Module 1 - JS Fundamentals',
                videos: [
                    { title: 'Variables, let and const',     videoId: 'PkZNo7MFNFg', duration: '14:00' },
                    { title: 'Arrays and Objects',           videoId: 'oigfaZ5ApsM', duration: '16:20' },
                    { title: 'Functions and Scope',          videoId: 'iLWTnMzWtj4', duration: '18:05' },
                    { title: 'ES6 Arrow Functions',          videoId: 'h33Srr5J9nY', duration: '12:44' },
                ],
            },
            {
                title: 'Module 2 - DOM and Async',
                videos: [
                    { title: 'DOM Manipulation',             videoId: 'y17RuWkWdn8', duration: '22:10' },
                    { title: 'Events and Listeners',         videoId: 'XF1_MlZ5l6M', duration: '20:00' },
                    { title: 'Fetch API and Promises',       videoId: 'cuEtnrL9-H0', duration: '25:30' },
                    { title: 'Async and Await',              videoId: 'V_Kr9OSfDeU', duration: '19:00' },
                ],
            },
        ],
    },
    {
        id: 'react',
        title: 'React JS - Complete Course',
        category: 'Web Development',
        level: 'Intermediate',
        duration: '10 hours',
        instructor: 'freeCodeCamp',
        description: 'Build modern web apps with React. Hooks, state management, routing and projects.',
        thumbnail: 'https://img.youtube.com/vi/bMknfKXIFA8/hqdefault.jpg',
        lessons: 6,
        modules: [
            {
                title: 'Module 1 - React Basics',
                videos: [
                    { title: 'What is React and Setup',      videoId: 'bMknfKXIFA8', duration: '15:00' },
                    { title: 'Components and Props',         videoId: 'Y6aYx_KKM7A', duration: '18:30' },
                    { title: 'useState Hook',                videoId: 'O6P86uwfdR0', duration: '20:00' },
                ],
            },
            {
                title: 'Module 2 - Advanced React',
                videos: [
                    { title: 'useEffect Hook',               videoId: 'UVhIMwHDS9k', duration: '22:00' },
                    { title: 'React Router',                 videoId: 'Law7wfdg2Eg', duration: '25:00' },
                    { title: 'Final Project',                videoId: 'bMknfKXIFA8', duration: '45:00' },
                ],
            },
        ],
    },
    {
        id: 'fullstack',
        title: 'Full Stack Web Development',
        category: 'Web Development',
        level: 'Intermediate',
        duration: '20 hours',
        instructor: 'Traversy Media',
        description: 'Build complete web apps from frontend to backend. HTML, CSS, JS, Node, Express and MongoDB.',
        thumbnail: 'https://img.youtube.com/vi/ysEN5RaKOlA/hqdefault.jpg',
        lessons: 9,
        modules: [
            {
                title: 'Module 1 - Frontend',
                videos: [
                    { title: 'HTML and CSS Crash Course',    videoId: 'UB1O30fR-EE', duration: '60:00' },
                    { title: 'JavaScript for the Web',       videoId: 'hdI2bqOjy3c', duration: '45:00' },
                    { title: 'Responsive Design',            videoId: 'srvUrASNj0s', duration: '30:00' },
                ],
            },
            {
                title: 'Module 2 - Backend',
                videos: [
                    { title: 'Node.js Introduction',         videoId: 'fBNz5xF-Kx4', duration: '40:00' },
                    { title: 'Express.js REST API',          videoId: 'L72fhGm1tfE', duration: '50:00' },
                    { title: 'MongoDB and Mongoose',         videoId: '-56x56UppqQ', duration: '35:00' },
                ],
            },
            {
                title: 'Module 3 - Full Project',
                videos: [
                    { title: 'Connect Frontend to Backend',  videoId: 'ysEN5RaKOlA', duration: '55:00' },
                    { title: 'Authentication with JWT',      videoId: 'mbsmsi7l3r4', duration: '45:00' },
                    { title: 'Deploy to the Web',            videoId: 'l134cBAJCuc', duration: '30:00' },
                ],
            },
        ],
    },
    {
        id: 'sql',
        title: 'SQL and Database Design',
        category: 'Data Science',
        level: 'Beginner',
        duration: '8 hours',
        instructor: 'freeCodeCamp',
        description: 'Learn SQL from scratch — queries, joins, indexes, and database design principles.',
        thumbnail: 'https://img.youtube.com/vi/HXV3zeQKqGY/hqdefault.jpg',
        lessons: 4,
        modules: [
            {
                title: 'Module 1 - SQL Basics',
                videos: [
                    { title: 'What is SQL and Setup',        videoId: 'HXV3zeQKqGY', duration: '20:00' },
                    { title: 'SELECT, WHERE, ORDER BY',      videoId: 'p3qvj9hO_Bo', duration: '25:00' },
                ],
            },
            {
                title: 'Module 2 - Advanced SQL',
                videos: [
                    { title: 'Joins and Relationships',      videoId: '9yeOJ0ZMUYw', duration: '30:00' },
                    { title: 'Database Design',              videoId: 'ztHopE5Wnpc', duration: '28:00' },
                ],
            },
        ],
    },
    {
        id: 'datascience',
        title: 'Data Science and Machine Learning',
        category: 'Data Science',
        level: 'Beginner',
        duration: '14 hours',
        instructor: 'freeCodeCamp',
        description: 'Python for data analysis, pandas, numpy, matplotlib and intro to machine learning.',
        thumbnail: 'https://img.youtube.com/vi/ua-CiDNNj30/hqdefault.jpg',
        lessons: 6,
        modules: [
            {
                title: 'Module 1 - Data Analysis',
                videos: [
                    { title: 'Python and Pandas Intro',      videoId: 'ua-CiDNNj30', duration: '30:00' },
                    { title: 'Data Cleaning',                videoId: 'bDhvCp3_lYw', duration: '25:00' },
                    { title: 'Data Visualization',           videoId: 'a9UrKTVEeZA', duration: '28:00' },
                ],
            },
            {
                title: 'Module 2 - Machine Learning',
                videos: [
                    { title: 'Intro to Machine Learning',    videoId: 'i_LwzRVP7bg', duration: '35:00' },
                    { title: 'Supervised Learning',          videoId: 'Gv9_4yMHFhI', duration: '40:00' },
                    { title: 'Build Your First ML Model',    videoId: 'M9Itm95nc9I', duration: '45:00' },
                ],
            },
        ],
    },
    {
        id: 'git',
        title: 'Git and GitHub - Version Control',
        category: 'Programming',
        level: 'Beginner',
        duration: '3 hours',
        instructor: 'Traversy Media',
        description: 'Learn Git and GitHub to manage your code, collaborate with teams and land jobs.',
        thumbnail: 'https://img.youtube.com/vi/RGOj5yH7evk/hqdefault.jpg',
        lessons: 4,
        modules: [
            {
                title: 'Module 1 - Git Basics',
                videos: [
                    { title: 'What is Git and Install',      videoId: 'RGOj5yH7evk', duration: '20:00' },
                    { title: 'Commits and Branches',         videoId: 'DVRQoVRzMIY', duration: '25:00' },
                ],
            },
            {
                title: 'Module 2 - GitHub',
                videos: [
                    { title: 'Push to GitHub',               videoId: 'i_23KUAEtUM', duration: '18:00' },
                    { title: 'Pull Requests and Merge',      videoId: 'dO9BtPDIHJ8', duration: '22:00' },
                ],
            },
        ],
    },
    {
        id: 'career',
        title: 'Career Development for Tech Jobs',
        category: 'Career Development',
        level: 'Beginner',
        duration: '5 hours',
        instructor: 'Google Career Certificates',
        description: 'Build your CV, ace tech interviews, use LinkedIn effectively and land your first job.',
        thumbnail: 'https://img.youtube.com/vi/Wy_sGTMBcgw/hqdefault.jpg',
        lessons: 5,
        modules: [
            {
                title: 'Module 1 - Job Search',
                videos: [
                    { title: 'Building a Tech CV',           videoId: 'Wy_sGTMBcgw', duration: '22:00' },
                    { title: 'LinkedIn for Developers',      videoId: 'SG5Sb5WTV_g', duration: '18:00' },
                    { title: 'Finding Jobs Online',          videoId: '_YBZV_L8YOs', duration: '15:00' },
                ],
            },
            {
                title: 'Module 2 - Interviews',
                videos: [
                    { title: 'How to Ace Tech Interviews',   videoId: 'aClxtDcdpsQ', duration: '30:00' },
                    { title: 'Coding Interview Tips',        videoId: 'qli-JCrSwuk', duration: '25:00' },
                ],
            },
        ],
    },
];

const CATEGORIES = ['All', 'Programming', 'Web Development', 'Data Science', 'Career Development'];
const LEVELS     = ['All', 'Beginner', 'Intermediate'];

export function getStorageKey(base) {
    const userId = localStorage.getItem('userId') || 'guest';
    return `${base}_${userId}`;
}

export function getEnrolledCourses() {
    try { return JSON.parse(localStorage.getItem(getStorageKey('enrolledCourses')) || '[]'); }
    catch { return []; }
}

export function enrollLocally(courseId) {
    const enrolled = getEnrolledCourses();
    if (!enrolled.includes(courseId)) {
        enrolled.push(courseId);
        localStorage.setItem(getStorageKey('enrolledCourses'), JSON.stringify(enrolled));
    }
}

export default function Courses() {
    const navigate = useNavigate();
    const [search,         setSearch]         = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeLevel,    setActiveLevel]    = useState('All');
    const [enrolled,       setEnrolled]       = useState(getEnrolledCourses);

    const filtered = ALL_COURSES.filter(c => {
        const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.description.toLowerCase().includes(search.toLowerCase()) ||
            c.category.toLowerCase().includes(search.toLowerCase());
        const matchCat   = activeCategory === 'All' || c.category === activeCategory;
        const matchLevel = activeLevel    === 'All' || c.level    === activeLevel;
        return matchSearch && matchCat && matchLevel;
    });

    function handleEnroll(courseId) {
        enrollLocally(courseId);
        setEnrolled(getEnrolledCourses());
        navigate(`/courses/${courseId}`);
    }

    return (
        <div>
            <h1>Browse Courses</h1>

            <div style={{ marginBottom: '1.5rem' }}>
                <input
                    style={{ width: '100%', padding: '12px 16px', fontSize: '1rem',
                        border: '2px solid #1a3c5e', borderRadius: '8px', outline: 'none',
                        fontFamily: 'inherit' }}
                    placeholder="Search for courses"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap',
                marginBottom: '1.5rem', alignItems: 'center' }}>
                <div>
          <span style={{ fontSize: '0.82rem', fontWeight: 700,
              color: '#555', marginRight: '0.5rem' }}>Category:</span>
                    {CATEGORIES.map(cat => (
                        <button key={cat} onClick={() => setActiveCategory(cat)}
                                style={{ marginRight: '0.4rem', marginBottom: '0.4rem',
                                    padding: '5px 12px', fontSize: '0.82rem', border: 'none',
                                    borderRadius: '20px', cursor: 'pointer',
                                    background: activeCategory === cat ? '#1a3c5e' : '#eef2f7',
                                    color:      activeCategory === cat ? '#fff'    : '#1a3c5e' }}>
                            {cat}
                        </button>
                    ))}
                </div>
                <div>
          <span style={{ fontSize: '0.82rem', fontWeight: 700,
              color: '#555', marginRight: '0.5rem' }}>Level:</span>
                    {LEVELS.map(lvl => (
                        <button key={lvl} onClick={() => setActiveLevel(lvl)}
                                style={{ marginRight: '0.4rem', padding: '5px 12px',
                                    fontSize: '0.82rem', border: 'none', borderRadius: '20px',
                                    cursor: 'pointer',
                                    background: activeLevel === lvl ? '#27ae60' : '#eef2f7',
                                    color:      activeLevel === lvl ? '#fff'    : '#555' }}>
                            {lvl}
                        </button>
                    ))}
                </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '1.2rem' }}>
                Showing {filtered.length} course{filtered.length !== 1 ? 's' : ''}
            </p>

            {filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <p style={{ fontSize: '1rem', color: '#888' }}>No courses found for "{search}"</p>
                    <button className="btn btn-primary" style={{ marginTop: '1rem' }}
                            onClick={() => { setSearch(''); setActiveCategory('All'); setActiveLevel('All'); }}>
                        Clear search
                    </button>
                </div>
            ) : (
                <div className="card-grid">
                    {filtered.map(course => {
                        const isEnrolled = enrolled.includes(course.id);
                        return (
                            <div className="card" key={course.id}
                                 style={{ display: 'flex', flexDirection: 'column',
                                     justifyContent: 'space-between' }}>
                                <img src={course.thumbnail} alt={course.title}
                                     style={{ width: '100%', height: '150px', objectFit: 'cover',
                                         borderRadius: '6px', marginBottom: '0.8rem' }} />
                                <div style={{ display: 'flex', gap: '6px',
                                    marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                                    <span className="badge">{course.category}</span>
                                    <span className="badge" style={{
                                        background: course.level === 'Beginner' ? '#eafaf1' : '#fef9e7',
                                        color:      course.level === 'Beginner' ? '#27ae60' : '#f39c12' }}>
                    {course.level}
                  </span>
                                </div>
                                <h3 style={{ fontSize: '0.95rem', marginBottom: '0.4rem' }}>
                                    {course.title}
                                </h3>
                                <p style={{ fontSize: '0.83rem', color: '#666', marginBottom: '0.5rem' }}>
                                    {course.description}
                                </p>
                                <p style={{ fontSize: '0.8rem', color: '#999', marginBottom: '0.8rem' }}>
                                    {course.instructor} · {course.duration} · {course.lessons} lessons
                                </p>
                                <button className="btn btn-primary"
                                        style={{ width: '100%', padding: '10px' }}
                                        onClick={() => handleEnroll(course.id)}>
                                    {isEnrolled ? 'Continue Learning' : 'Enroll and Start Learning'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}