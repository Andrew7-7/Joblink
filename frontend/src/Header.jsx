import React, { useContext, useState } from 'react';
import InternetIdentity from './InternetIdentity';
import { canisterId } from 'declarations/backend';
import ActorContext from './ActorContext';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {

  const {actor, setActor} = useContext(ActorContext)
  const [index, setIndex] = useState(0)

  const pages = [
    "Home","Experience", "Company"
  ]
  
  return (
    <header className="mb-2 p-8 w-full text-white fixed top w-screen flex flex-row flex-wrap items-center justify-between z-50">
      <div className="w-1/5 justify-start flex">
          <h1 className="text-3xl font-bold px-5 py-2 text-white">JobLink</h1>
        </div>
        <div className="w-2/5 bg-[var(--secondary)] rounded-3xl px-10 flex justify-between">
          {pages.map((e, idx) => 
          <p onClick={() => {setIndex(idx)}} className={`text-lg font-semibold py-2 ${idx == index?"border-b-4 border-white":""}`} key={idx}>{e}</p>)}
        </div>
        <div className="w-1/5 flex justify-end">
          <InternetIdentity
            setActor={setActor}
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
        </div>
    </header>
  );
};

export default Header;
