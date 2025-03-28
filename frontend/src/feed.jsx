import React, { useState } from 'react';

const Feed = () => {
    const [isFollowed, setIsFollowed] = useState(false);
    const [selectedExperience, setSelectedExperience] = useState(null);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    const toggleFollow = () => {
        setIsFollowed((prev) => !prev);
    };

    const experiences = [
        {
            id: 1,
            position: 'Frontend Developer',
            startDate: 'Jan 2020',
            endDate: 'Dec 2021',
            description: 'Developed and maintained user-facing features for web applications.',
            media: [
                '',
                '',
            ],
        },
        {
            id: 2,
            position: 'Backend Developer',
            startDate: 'Feb 2019',
            endDate: 'Dec 2020',
            description: 'Built and optimized server-side logic and database systems.',
            media: [
                '',
                '',
            ],
        },
        {
            id: 3,
            position: 'UI/UX Designer',
            startDate: 'Mar 2018',
            endDate: 'Jan 2020',
            description: 'Designed user interfaces and improved user experience for mobile apps.',
            media: [
                '',
                '',
            ],
        },
        {
            id: 4,
            position: 'Data Scientist',
            startDate: 'Apr 2017',
            endDate: 'Feb 2019',
            description: 'Analyzed data and built predictive models to support business decisions.',
            media: [
                '',
                '',
            ],
        },
    ];

    const openCarousel = (experience) => {
        setSelectedExperience(experience);
        setCurrentMediaIndex(0);
    };

    const closeCarousel = () => {
        setSelectedExperience(null);
        setCurrentMediaIndex(0);
    };

    const showPreviousMedia = () => {
        setCurrentMediaIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : selectedExperience.media.length - 1
        );
    };

    const showNextMedia = () => {
        setCurrentMediaIndex((prevIndex) =>
            prevIndex < selectedExperience.media.length - 1 ? prevIndex + 1 : 0
        );
    };

    return (
        <div className="font-sans bg-black text-white min-h-screen">
            <div className={`p-5 flex justify-center ${selectedExperience ? 'blur-sm' : ''}`}>
                <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {experiences.map((experience) => (
                        <div
                            key={experience.id}
                            className="bg-gray-800 rounded-lg overflow-hidden text-center p-4 cursor-pointer"
                            onClick={() => openCarousel(experience)}
                        >
                            <p className="text-white text-lg font-bold">{experience.position}</p>
                            <p className="text-gray-400 text-sm mt-2">
                                {experience.startDate} - {experience.endDate}
                            </p>
                            <p className="text-gray-300 text-sm mt-3">{experience.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {selectedExperience && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-gray-900 rounded-lg p-5 w-4/5 max-w-3xl relative h-[600px] flex flex-col justify-center items-center">
                        <button
                            className="text-white text-lg absolute top-5 right-5"
                            onClick={closeCarousel}
                        >
                            ✕
                        </button>
                        <div className="flex justify-center items-center w-full h-full">
                            <button
                                className="text-white text-2xl absolute left-5"
                                onClick={showPreviousMedia}
                            >
                                ‹
                            </button>
                            <div className="flex justify-center items-center w-full h-full">
                                <img
                                    src={selectedExperience.media[currentMediaIndex]}
                                    alt={`Media ${currentMediaIndex + 1}`}
                                    className="max-w-full max-h-full object-contain rounded-lg"
                                />
                            </div>
                            <button
                                className="text-white text-2xl absolute right-5"
                                onClick={showNextMedia}
                            >
                                ›
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Feed;