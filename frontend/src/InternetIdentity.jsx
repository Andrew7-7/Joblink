import React, { useContext, useEffect, useState } from 'react';
import {AuthContext} from './AuthContext';

const InternetIdentity = () => {
  
  const {principal,login,logout, updateActor, isAuthenticated} = useContext(AuthContext);

  useEffect(() => {
    updateActor(); 
    // logout();
  }, []);

  return (
    <div className="flex items-center space-x-4">
      {isAuthenticated ? (
        <>
          <p className="text-sm">
            <span className="font-mono">{principal}</span>
          </p>
          <button
            onClick={logout}
            className="transform rounded-lg bg-red-500 px-3 py-1 text-sm font-bold text-white shadow-md transition duration-300 ease-in-out hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Sign Out
          </button>
        </>
      ) : (
        <button
          onClick={login}
          className="transform rounded-lg bg-infinite hover:bg-white px-6 py-2 text-sm font-bold text-white hover:text-infinite shadow-md transition duration-300 ease-in-out  hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default InternetIdentity;
