import React, { useState } from 'react';
import Header from './Header';
import MainLayout from './MainLayout';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [actor, setActor] = useState();
  const [tokenCreated, setTokenCreated] = useState(false);

  return (
    <MainLayout>
      <div className="min-h-screen bg-[var(--background)]">
        <Header
          actor={actor}
          setActor={setActor}
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          tokenCreated={tokenCreated}
          setTokenCreated={setTokenCreated}
        />
        
      </div>
    </MainLayout>
  );
};

export default App;
