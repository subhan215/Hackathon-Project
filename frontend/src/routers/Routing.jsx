import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Routing = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginScreen />} />
                <Route index element={<LoginScreen />} />
                <Route path='/signup' element={<SignUpScreen />} />
                <Route path='*' element={<h1>Error 404! Sorry page not found</h1>} />
            </Routes>
        </>
    );
};
export default Routing;