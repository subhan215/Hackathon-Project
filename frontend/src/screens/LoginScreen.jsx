import React, { useState } from 'react';
import { NavLink, Router } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const LoginScreen = () => {
    const [showInpPass, setShowInpPass] = useState(false)
    const passValid = () => {
        !showInpPass ? setShowInpPass(true) : setShowInpPass(false)
    }
    const [userDetails, setUserDetails] = useState({email: "", password: "" })
    function signInFunc() {
        alert(userDetails)
        // POST request using fetch()
        fetch("http://localhost:5000/user/login", {
            // Adding method type
            method: "POST",
            // Adding body or contents to send
            body: JSON.stringify(userDetails),
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            // Converting to JSON
            .then(response => response.json())
            // Displaying results to console
            .then(json => console.log(json))
    }
    return (
        <div>
            <header className='authHead'>
                <div className='authHeaddiv1'>
                    <div className='authHeaddiv1imgdiv'>
                        <img src="" width="200px" />
                    </div>
                    <h1 className='authHeaddiv1h1'>Amazon</h1>
                </div>
                <div className='authHeaddiv2'>
                    <div className='searchDiv'>assa</div>
                    <div className='searchIcon'>as</div>
                </div>
                <div className='authHeaddiv3'>
                    <p className='cartp'>Cart</p>
                    <p className='signinp'>Sign In</p>
                </div>
            </header>
            <main className='authMain'>
               
                    <h1 className="authmainh1">Log In</h1>
                    <form>
                        <input type="text" placeholder='Enter your email'  onChange={(val) => setUserDetails({ ...userDetails, email: val.target.value })} />
                        <div className="passdiv">
                            <input type={!showInpPass ? "password" : "text"} placeholder='Enter your password' onChange={(val) => setUserDetails({ ...userDetails, password: val.target.value })} /> 
                            <button className='eyebtn' onClick={passValid} type="button" style={{ backgroundColor: "transparent !important" }}>

                                {!showInpPass ? <FontAwesomeIcon icon={faEye} style={{ background: "whitesmoke" }} />
                                    :
                                    <FontAwesomeIcon icon={faEyeSlash} style={{ background: "whitesmoke" }} />}
                            </button>
                        </div>
                    </form>
                    <button  className="mybtn" onClick={signInFunc}>Sign In</button>
                    <p> Note: If you dont't have any account then click on below
                        sign up button </p>
                    <button type="button" className="mybtn signupbtn" data-toggle="modal" data-target="#exampleModal">
                        <a style={{ background: "transparent", color: "whitesmoke", textDecoration: "none" }}>Sign Up</a>
                        
                    </button>
            </main>
            <footer></footer>

        </div>
    );
};


export default LoginScreen;