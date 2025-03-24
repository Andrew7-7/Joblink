import React from 'react';
import InternetIdentity from './InternetIdentity';
import { canisterId } from 'declarations/backend';

const Header = ({ actor, setActor, isAuthenticated, setIsAuthenticated }) => {


  
  return (
    <header className="mb-2 p-8 text-white">
      <div className="mx-auto flex flex-row flex-wrap items-center justify-between rounded-2xl">
        <div className="w-1/5 justify-start flex">
          <h1 className="text-3xl font-bold px-5 py-2 text-blue-600">JobLink</h1>
        </div>
        <div className="w-2/5 bg-[var(--secondary)] rounded-3xl px-10 flex justify-between">
          <p className="text-lg font-semibold py-2 border-b-4 border-white">Home</p>
          <p className="text-lg font-semibold py-2 border-b-4 border-white">Experience</p>
          <p className="text-lg font-semibold py-2 border-b-4 border-white">Company</p>
        </div>
        <div className="w-1/5 flex justify-end">
          <InternetIdentity
            setActor={setActor}
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
