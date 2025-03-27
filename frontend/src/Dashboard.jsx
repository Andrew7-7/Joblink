import React, { useContext, useEffect, useState } from 'react';
import {AuthContext} from './AuthContext';

const Dashboard =() => {
  const {user} = useContext(AuthContext)
  return (<>
  <div className="flex justify-center items-center absolute z-10 w-full min-h-screen p-5">
    <div className="w-4/5 h-1/2 bg-[var(--secondary)] shadow-lg rounded-md">
      <div className="object-cover w-[200px] aspect-square rounded-full border-2 border-white">
        <img src={user.profile_pic} className="w-full h-full"/>
      </div>
    </div>
  </div>
  </>
  )
}

export default Dashboard