import React from 'react';
import { useAuth } from '../../context/authContext'
import Hero from '../../components/Hero'

const Home = () => {
    const { user } = useAuth();
    console.log("bienvenido ", user)
    return (
        <>
            <Hero />
        </>
    );
}

export default Home;
