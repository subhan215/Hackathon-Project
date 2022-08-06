import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getCookie } from '../cookies/getCookie';
import RestaurantPanelScreen from '../screens/RestaurantPanelScreen';
import bookingDetailsScreen from '../screens/bookingDetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import UserScreen from '../screens/UserScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';

const Routing = () => {
    const Pvt_Route = () => {
        let user ; 
       /*  function checkCookie(cname) { */
             user = getCookie("user");
           
         /*  } */
         /*  checkCookie("user") */
        if(user) {
            console.log(user)
            user = JSON.parse(user)
            if(user.role === "restaurant") {
                return <RestaurantPanelScreen email = {user.email} role = {user.role}/>

            } else if(user.role === "customer") {
            return <UserScreen email = {user.email} role = {user.role}/>
            }
        } else {
           return <Navigate to="/login"/>
        }
     }
     /* const HomePvt_Route = () => {
         let userData = JSON.parse(localStorage.getItem("logInUser"))
         if(userData) {
             return <Home />
         } else {
            return <Navigate to="/login"/>
         }
     }
     const UpdProfPvt_Route = () => {
         let userData = JSON.parse(localStorage.getItem("logInUser"))
         if(userData) {
             return <UpdateProfile />
         } else {
            return <Navigate to="/login"/>
         }
     } */
     
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginScreen />} />
                <Route index element={<HomeScreen />} />
                <Route path='/signup' element={<SignUpScreen />} />
                <Route path='/profile' element = {<Pvt_Route />}/>
                <Route path='/home' element = {<HomeScreen />}/>
                <Route path='/bookingDetails' element = {<bookingDetailsScreen />}/>
                <Route path='/personalInfo' element = {<PersonalInfoScreen />}/>

                <Route path='*' element={<h1>Error 404! Sorry page not found</h1>} />
            </Routes>
        </>
    );
};
export default Routing;