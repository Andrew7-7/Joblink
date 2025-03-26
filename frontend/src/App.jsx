import React, { useContext, useState } from 'react';
import Landing from './Landing';
import {AuthContext} from './AuthContext';
import Home from './Home';
import Header from './Header';


const App = () => {
  const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext)
  return (
    <>
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
            <div className="min-h-screen w-full bg-gradient-to-b from-[var(--background)] to-[var(--secondary)] overflow-hidden">
                {isAuthenticated? (
                  <Home />
                ):(
                  <Landing />
                )}
                <div className="absolute bottom left w-full h-full overflow-hidden">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className='w-full h-[200px] rotate-180 opacity-30 relative block'>
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-[var(--secondary)]"></path>
                    </svg>
                </div>
            </div>
      </>
  );
};

export default App;
