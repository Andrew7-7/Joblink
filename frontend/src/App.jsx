import React, { useState } from 'react';
import Header from './Header';
import MainLayout from './MainLayout';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [actor, setActor] = useState();
  const [tokenCreated, setTokenCreated] = useState(false);

  return (
    <MainLayout>
      <div className="min-h-screen w-full bg-gradient-to-b from-[var(--background)] to-[var(--secondary)] overflow-hidden">
        {/* <div className='left-[-100px] top-[100px] opacity-1/4 absolute w-[600px] h-[600px] bg-[var(--secondary)] rounded-full'>
          
        </div> */}
        <div className='absolute top-[50%] z-10 left-[10%] w-2/5 flex flex-col gap-y-5'>
          <h2 className='bg-clip-text text-transparent bg-gradient-to-br from-pink-500 to-pink-300 font-bold text-2xl text-left'>Trusted Web3 career network with verified experience and secure identity</h2>
          
          <button className='text-[var(--secondary)] hover:scale-105 transition ease-in-out duration-200 hover:text-white w-2/5 font-bold py-2 px-2 bg-gradient-to-br from-pink-500 to-[#8F87F1] rounded-xl'>
            Getting Started
          </button>
        </div>
          <span className='w-[400px] h-[400px] bg-pink-400 absolute top-[30%] right-[5%] opacity-25 rounded-full blur-3xl'>
          </span>
          <div className="absolute bottom left w-full h-full overflow-hidden">
              <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className='w-full h-[200px] rotate-180 opacity-30 relative block'>
                  <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-[var(--secondary)]"></path>
              </svg>
          </div>
      </div>
    </MainLayout>
  );
};

export default App;
