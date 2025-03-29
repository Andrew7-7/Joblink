import React, { useState, useEffect } from 'react';

import { backend } from 'declarations/backend';


const Feed = () => {

    const [experiences, setExperiences] = useState([])

  const getExperiences = async () => {
    try{
      const res = await backend.feed({principal_user_id:"0"})
      setExperiences(res)
    }catch(e){
        setExperiences([{
            position:"Error",
            description:e,
            start_time:1,
            end_time:2
        }])
    }
  }
  useEffect(() => {
    getExperiences()
  }, [])

    const dateFormat = (date) => {
        return `${date.toLocaleString("defaulft", {month:"short"})} ${date.getFullYear()}`
    }
    return (
        <div className="absolute z-10 my-24 font-sans text-white min-h-screen">
            <div className={`p-5 flex justify-center ${selectedExperience ? 'blur-sm' : ''}`}>
                <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {experiences.map((experience, idx) => (
                        <div
                            key={idx}
                            className="bg-gray-800 rounded-lg overflow-hidden text-center p-4 cursor-pointer"
                            onClick={() => openCarousel(experience)}
                        >
                            <p className="text-white text-lg font-bold">{experience.position}</p>
                            <p className="text-gray-400 text-sm mt-2">
                                {dateFormat(new Date(Number(experience.start_date)))} - {experience.end_date != 0 ? dateFormat(new Date(Number(experience.end_date))):"Now"}
                            </p>
                            <p className="text-gray-300 text-sm mt-3 text-left">{experience.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Feed;