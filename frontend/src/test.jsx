import React, { useState } from 'react';

const Test = () => {
    const [isFollowed, setIsFollowed] = useState(false);

    const toggleFollow = () => {
        setIsFollowed((prev) => !prev);
    };

    const jobs = [
        {
            id: 1,
            companyLogo: 'https://via.placeholder.com/150',
            jobTitle: 'Frontend Developer',
        },
        {
            id: 2,
            companyLogo: 'https://via.placeholder.com/150',
            jobTitle: 'Backend Developer',
        },
        {
            id: 3,
            companyLogo: 'https://via.placeholder.com/150',
            jobTitle: 'UI/UX Designer',
        },
        {
            id: 4,
            companyLogo: 'https://via.placeholder.com/150',
            jobTitle: 'Data Scientist',
        },
    ];

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <img
                    src="https://via.placeholder.com/100"
                    alt="Profile"
                    style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '10px' }}
                />
                <h2>Company Name</h2>
                <p>Find your dream job here!</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
                    <button
                        onClick={toggleFollow}
                        style={{
                            width: '120px',
                            height: '40px',
                            backgroundColor: isFollowed ? '#555' : '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        {isFollowed ? 'Unfollow' : 'Follow'}
                    </button>
                    <button
                        style={{
                            width: '120px',
                            height: '40px',
                            backgroundColor: '#555',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Message
                    </button>
                </div>
            </div>
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
                <div
                    style={{
                        width: '80%',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '20px',
                    }}
                >
                    {jobs.map((job) => (
                        <div
                            key={job.id}
                            style={{
                                backgroundColor: '#222',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                textAlign: 'center',
                                padding: '15px',
                            }}
                        >
                            <img
                                src={job.companyLogo}
                                alt={job.jobTitle}
                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                            />
                            <p style={{ marginTop: '15px', color: '#fff', fontSize: '16px' }}>{job.jobTitle}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Test;