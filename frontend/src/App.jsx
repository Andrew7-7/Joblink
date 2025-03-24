import React, { useState } from 'react';
import Header from './Header';
import MainLayout from './MainLayout';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [actor, setActor] = useState();
  const [tokenCreated, setTokenCreated] = useState(false);

  return (
    <MainLayout>
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[var(--background)] to-[var(--secondary)]">
        {/* <h2 className='bg-clip-text text-transparent bg-gradient-to-tl from-violet-500 to-fuchsia-500 font-bold text-4xl w-2/5 text-center'>Trusted Web3 career network with verified experience and secure identity</h2> */}
      </div>
    </MainLayout>
  );
};

export default App;
