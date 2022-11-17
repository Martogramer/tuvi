import React from 'react';
import { useAuth } from '../../Context/authContext'
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
