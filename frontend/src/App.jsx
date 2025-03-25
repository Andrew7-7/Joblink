import React, { useContext, useState } from 'react';
import Header from './Header';
import MainLayout from './MainLayout';
import Landing from './Landing';
import AuthContext from './AuthContext';
import Home from './Home';

const App = () => {
  const {isAuthenticated} = useContext(AuthContext)
  return (
        <MainLayout>
          {isAuthenticated? (
            <Home />
          ):(
            <Landing />
          )}
        </MainLayout>
  );
};

export default App;
