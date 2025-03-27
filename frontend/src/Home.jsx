import { useContext } from "react"
import {AuthContext} from "./AuthContext"
import React from 'react';
import Register from './Register';
import Dashboard from './Dashboard';

const Home = () => {

    const {user} = useContext(AuthContext)

    return (
        <>
            {(user == "")?<Register />:<Dashboard />}
        </>
    )
}

export default Home