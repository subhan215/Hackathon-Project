import React, { useState } from 'react';
import { Navigate, NavLink, Router, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { setCookie } from '../cookies/setCookie';
import { useDispatch } from 'react-redux';
import { signIn } from '../store/actions/authActions/signInAction';

const LoginScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showInpPass, setShowInpPass] = useState(false)
    const passValid = () => {
        !showInpPass ? setShowInpPass(true) : setShowInpPass(false)
    }
    const [userDetails, setUserDetails] = useState({ email: "", password: "" })
    const signInFunc = () => {
        dispatch(signIn(userDetails, navigate))
    }
    return (
        <div>
            <header className='authHead'>

                <h1 className='authHeadh1'><img src='images/logo.png' width="200" height="100"/></h1>

            </header>
            <main className='authMain'>
                <div className='authContent'>
                    <h1 className="authmainh1">Log In</h1>
                    <form>
                        <input type="text" placeholder='Enter your email' onChange={(val) => setUserDetails({ ...userDetails, email: val.target.value })} />
                        <div className="passdiv">
                            <input type={!showInpPass ? "password" : "text"} placeholder='Enter your password' onChange={(val) => setUserDetails({ ...userDetails, password: val.target.value })} />
                            <button className='eyebtn' onClick={passValid} type="button" style={{ backgroundColor: "transparent !important" }}>

                                {!showInpPass ? <FontAwesomeIcon icon={faEye} style={{ background: "whitesmoke" }} />
                                    :
                                    <FontAwesomeIcon icon={faEyeSlash} style={{ background: "whitesmoke" }} />}
                            </button>
                        </div>
                    </form>
                    <button className="mybtn" onClick={signInFunc}>Sign In</button>
                    <p> Don't have an account? <a onClick={() => navigate("/signup")} style={{ "color": "rgb(28, 58, 147)" }}>Sign Up</a></p>


                </div>
                <div className='welcomebackpic'>

                </div>
            </main>
            <footer></footer>

        </div>
    );
};


export default LoginScreen;