import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ALL_COURSES, getEnrolledCourses, getStorageKey } from './Courses';

function getLastWatched() {
    try { return JSON.parse(localStorage.getItem(getStorageKey('lastWatched')) || '{}'); }
    catch { return {}; }
}

function getCompletedVideos(courseId) {
    try {
        return JSON.parse(
            localStorage.getItem(getStorageKey(`completed_${courseId}`)) || '{}'
        );
    } catch { return {}; }
}

export default function MyLearning() {
    const navigate        = useNavigate();
    const enrolledIds     = getEnrolledCourses();
    const lastWatched     = getLastWatched();
    const enrolledCourses = ALL_COURSES.filter(c => enrolledIds.includes(c.id));

    if (enrolledCourses.length === 0) {
        return (
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '0.3rem' }}>My Learning</h1>
                <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    0 courses enrolled
                </p>
                <div style={{ background: '#fff', borderRadius: '16px', padding: '3rem',
                    textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                    <h3 style={{ marginBottom: '0.5rem', color: '#1a3c5e' }}>No courses yet</h3>
                    <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        Browse our courses and start learning today.
                    </p>
                    <button className="btn btn-primary" onClick={() => navigate('/courses')}>
                        Browse Courses
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '0.3rem' }}>My Learning</h1>
            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                {enrolledCourses.length} course{enrolledCourses.length !== 1 ? 's' : ''} enrolled
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {enrolledCourses.map(course => {
                    const saved          = lastWatched[course.id];
                    const completedMap   = getCompletedVideos(course.id);
                    const totalVideos    = course.modules.reduce((a, m) => a + m.videos.length, 0);
                    const completedCount = Object.keys(completedMap).length;
                    const progress       = Math.round((completedCount / totalVideos) * 100);

                    return (
                        <div key={course.id} style={{ background: '#fff', borderRadius: '14px',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                            overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}>

                            <div style={{ width: '200px', flexShrink: 0, minHeight: '140px' }}
                                 className="course-thumb">
                                <img src={course.thumbnail} alt={course.title}
                                     style={{ width: '100%', height: '100%',
                                         objectFit: 'cover', display: 'block' }} />
                            </div>

                            <div style={{ flex: 1, padding: '1.3rem 1.5rem',
                                display: 'flex', flexDirection: 'column',
                                justifyContent: 'space-between', minWidth: '220px' }}>
                                <div>
                                    <div style={{ display: 'flex', gap: '6px',
                                        marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                                        <span className="badge">{course.category}</span>
                                        <span className="badge" style={{
                                            background: progress === 100 ? '#eafaf1' :
                                                progress > 0    ? '#fef9e7' : '#eef2f7',
                                            color:      progress === 100 ? '#27ae60' :
                                                progress > 0    ? '#f39c12' : '#888' }}>
                      {progress === 100 ? 'Completed' :
                          progress > 0    ? 'In Progress' : 'Not Started'}
                    </span>
                                    </div>

                                    <h3 style={{ fontSize: '1rem', color: '#1a3c5e', marginBottom: '0.3rem' }}>
                                        {course.title}
                                    </h3>

                                    <p style={{ fontSize: '0.8rem', color: saved ? '#888' : '#aaa',
                                        marginBottom: '0.8rem' }}>
                                        {saved
                                            ? `Last watched: ${saved.title}`
                                            : 'You have not started this course yet'}
                                    </p>

                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between',
                                            marginBottom: '4px' }}>
                                            <span style={{ fontSize: '0.75rem', color: '#888' }}>Progress</span>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 700,
                                                color: progress === 100 ? '#27ae60' : '#1a3c5e' }}>
                        {progress}% · {completedCount}/{totalVideos} lessons
                      </span>
                                        </div>
                                        <div style={{ height: '8px', borderRadius: '8px',
                                            background: '#e8ecf0', overflow: 'hidden' }}>
                                            <div style={{
                                                height: '100%', borderRadius: '8px',
                                                background: progress === 100 ? '#27ae60' :
                                                    progress > 0    ? '#1a3c5e' : '#ccc',
                                                width: `${progress}%`, transition: 'width 0.4s',
                                            }} />
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: '1.2rem' }}>
                                    <button className="btn btn-primary"
                                            style={{ padding: '9px 24px', fontSize: '0.88rem' }}
                                            onClick={() => navigate(`/courses/${course.id}`)}>
                                        {progress === 0   ? 'Start Course'  :
                                            progress === 100 ? 'Review Course' : 'Resume Course'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button
                    style={{ background: 'none', border: '2px dashed #ccc',
                        borderRadius: '12px', padding: '1rem 2rem',
                        color: '#888', cursor: 'pointer', fontSize: '0.9rem' }}
                    onClick={() => navigate('/courses')}>
                    Enroll in more courses
                </button>
            </div>
        </div>
    );
}