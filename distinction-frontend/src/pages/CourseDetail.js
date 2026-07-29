import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ALL_COURSES, getStorageKey } from './Courses';

export default function CourseDetail() {
    const { courseId } = useParams();
    const navigate     = useNavigate();
    const course       = ALL_COURSES.find(c => c.id === courseId);

    const [activeVideo,   setActiveVideo]   = useState(
        course ? course.modules[0].videos[0] : null
    );
    const [openModules,   setOpenModules]   = useState({ 0: true });
    const [completedVids, setCompletedVids] = useState(() => {
        try {
            return JSON.parse(
                localStorage.getItem(getStorageKey(`completed_${courseId}`)) || '{}'
            );
        } catch { return {}; }
    });

    if (!course) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
                <h2>Course not found</h2>
                <button className="btn btn-primary" style={{ marginTop: '1rem' }}
                        onClick={() => navigate('/courses')}>
                    Back to Courses
                </button>
            </div>
        );
    }

    const totalVideos     = course.modules.reduce((a, m) => a + m.videos.length, 0);
    const completedCount  = Object.keys(completedVids).length;
    const progressPercent = Math.round((completedCount / totalVideos) * 100);
    const allVideos       = course.modules.flatMap(m => m.videos);
    const currentIndex    = allVideos.findIndex(
        v => v.videoId === activeVideo.videoId && v.title === activeVideo.title
    );

    function toggleModule(idx) {
        setOpenModules(prev => ({ ...prev, [idx]: !prev[idx] }));
    }

    function markComplete(video) {
        const key     = `${video.videoId}_${video.title}`;
        const updated = { ...completedVids, [key]: true };
        setCompletedVids(updated);
        localStorage.setItem(
            getStorageKey(`completed_${courseId}`),
            JSON.stringify(updated)
        );

        const lwKey      = getStorageKey('lastWatched');
        const lastWatched = JSON.parse(localStorage.getItem(lwKey) || '{}');
        lastWatched[courseId] = { title: video.title, videoId: video.videoId };
        localStorage.setItem(lwKey, JSON.stringify(lastWatched));
    }

    function isCompleted(video) {
        return !!completedVids[`${video.videoId}_${video.title}`];
    }

    function isActive(video) {
        return activeVideo.videoId === video.videoId && activeVideo.title === video.title;
    }

    function goToNext() {
        if (currentIndex < allVideos.length - 1) {
            setActiveVideo(allVideos[currentIndex + 1]);
        }
    }

    function goToPrev() {
        if (currentIndex > 0) {
            setActiveVideo(allVideos[currentIndex - 1]);
        }
    }

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

            <button onClick={() => navigate('/my-learning')}
                    style={{ background: 'none', border: 'none', color: '#1a3c5e',
                        cursor: 'pointer', fontSize: '0.9rem', marginBottom: '1rem',
                        padding: 0, fontWeight: 600 }}>
                Back to My Learning
            </button>

            <h1 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', marginBottom: '0.3rem' }}>
                {course.title}
            </h1>
            <p style={{ color: '#888', marginBottom: '1.2rem', fontSize: '0.85rem' }}>
                {course.instructor} · {course.duration} · {course.level} · {totalVideos} lessons
            </p>

            <div style={{ background: '#fff', borderRadius: '10px', padding: '1rem',
                marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>Your Progress</span>
                    <span style={{ fontWeight: 700, color: '#1a3c5e', fontSize: '0.88rem' }}>
            {completedCount}/{totalVideos} lessons — {progressPercent}%
          </span>
                </div>
                <div className="progress-bar-bg">
                    <div className="progress-bar-fill"
                         style={{ width: `${progressPercent}%`,
                             background: progressPercent === 100 ? '#27ae60' : '#1a3c5e',
                             transition: 'width 0.4s ease' }} />
                </div>
                {progressPercent === 100 && (
                    <p style={{ color: '#27ae60', fontWeight: 700, marginTop: '0.5rem',
                        textAlign: 'center', fontSize: '0.9rem' }}>
                        Congratulations! You completed this course!
                    </p>
                )}
            </div>

            <div className="course-layout"
                 style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem' }}>

                <div>
                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0,
                        borderRadius: '10px', overflow: 'hidden',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.15)', marginBottom: '1rem' }}>
                        <iframe
                            key={`${activeVideo.videoId}_${activeVideo.title}`}
                            src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1`}
                            title={activeVideo.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ position: 'absolute', top: 0, left: 0,
                                width: '100%', height: '100%', border: 'none' }}
                        />
                    </div>

                    <div style={{ background: '#fff', borderRadius: '10px', padding: '1.2rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
                        <h2 style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>
                            {activeVideo.title}
                        </h2>
                        <p style={{ color: '#888', fontSize: '0.82rem', marginBottom: '1rem' }}>
                            Duration: {activeVideo.duration}
                            {isCompleted(activeVideo) && (
                                <span style={{ color: '#27ae60', marginLeft: '1rem', fontWeight: 600 }}>
                  Completed
                </span>
                            )}
                        </p>

                        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                            <button className="btn"
                                    style={{ background: '#eef2f7', color: '#1a3c5e' }}
                                    onClick={goToPrev}
                                    disabled={currentIndex === 0}>
                                Previous
                            </button>

                            {!isCompleted(activeVideo) ? (
                                <button className="btn btn-success"
                                        onClick={() => markComplete(activeVideo)}>
                                    Mark as Complete
                                </button>
                            ) : (
                                <span style={{ color: '#27ae60', fontWeight: 600,
                                    display: 'flex', alignItems: 'center', fontSize: '0.9rem' }}>
                  Lesson completed
                </span>
                            )}

                            <button className="btn btn-primary"
                                    onClick={goToNext}
                                    disabled={currentIndex === allVideos.length - 1}>
                                Next Lesson
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{ background: '#fff', borderRadius: '10px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                    height: 'fit-content', overflow: 'hidden' }}>
                    <div style={{ padding: '1rem 1.2rem', background: '#1a3c5e', color: '#fff' }}>
                        <h3 style={{ fontSize: '0.95rem', margin: 0 }}>Course Content</h3>
                        <p style={{ fontSize: '0.75rem', color: '#a8c4e0', margin: '4px 0 0' }}>
                            {course.modules.length} modules · {totalVideos} lessons
                        </p>
                    </div>

                    <div style={{ maxHeight: '520px', overflowY: 'auto' }}>
                        {course.modules.map((mod, modIdx) => (
                            <div key={modIdx}>
                                <div onClick={() => toggleModule(modIdx)}
                                     style={{ padding: '0.9rem 1.2rem', background: '#f8f9fa',
                                         borderBottom: '1px solid #eee', cursor: 'pointer',
                                         display: 'flex', justifyContent: 'space-between',
                                         alignItems: 'center' }}>
                                    <div>
                                        <p style={{ fontWeight: 700, fontSize: '0.83rem',
                                            color: '#1a3c5e', margin: 0 }}>{mod.title}</p>
                                        <p style={{ fontSize: '0.73rem', color: '#888', margin: '2px 0 0' }}>
                                            {mod.videos.length} lessons
                                        </p>
                                    </div>
                                    <span style={{ color: '#888', fontSize: '0.75rem' }}>
                    {openModules[modIdx] ? 'Hide' : 'Show'}
                  </span>
                                </div>

                                {openModules[modIdx] && mod.videos.map((video, vidIdx) => {
                                    const active = isActive(video);
                                    const done   = isCompleted(video);
                                    return (
                                        <div key={vidIdx} onClick={() => setActiveVideo(video)}
                                             style={{ padding: '0.75rem 1.2rem 0.75rem 1.5rem',
                                                 borderBottom: '1px solid #f0f0f0', cursor: 'pointer',
                                                 background: active ? '#eef2f7' : '#fff',
                                                 borderLeft: active ? '3px solid #1a3c5e' : '3px solid transparent',
                                                 display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <span style={{ fontSize: '0.75rem', flexShrink: 0, fontWeight: 600,
                          color: done ? '#27ae60' : active ? '#1a3c5e' : '#ccc' }}>
                        {done ? 'Done' : active ? 'Playing' : 'Play'}
                      </span>
                                            <div style={{ flex: 1 }}>
                                                <p style={{ fontSize: '0.82rem', margin: 0,
                                                    fontWeight: active ? 600 : 400,
                                                    color: active ? '#1a3c5e' : '#333' }}>
                                                    {video.title}
                                                </p>
                                                <p style={{ fontSize: '0.72rem', color: '#aaa', margin: '2px 0 0' }}>
                                                    {video.duration}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}