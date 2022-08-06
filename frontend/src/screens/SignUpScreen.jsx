import React, { useState } from 'react';
import { NavLink, Router, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
import { signUp } from '../store/actions/authActions/signUpAction';
import "../App.css"
/* import logo from "../images/"
 */const SignUpScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showInpPass, setShowInpPass] = useState(false)
    const [showInpConPass, setShowInpConPass] = useState(false)
    const [role, setRole] = useState("")

    const passValid = () => {
        !showInpPass ? setShowInpPass(true) : setShowInpPass(false)
    }
    const passConValid = () => {
        !showInpConPass ? setShowInpConPass(true) : setShowInpConPass(false)
    }
    const [userDetails, setUserDetails] = useState({ name: "", email: "", password: "", phoneNo: "" })
    const [conPass, setConPass] = useState("")
    const signUpFunc = () => {
        dispatch(signUp(userDetails, conPass, navigate, role))
    }
    const onOptionChange = e => {
        setRole(e.target.value)
    }

    return (
        <div>
            <header className='authHead'>

                <h1 className='authHeadh1'><img src='images/logo.png' width="200" height="100"/></h1>

            </header>
            <main className='authMain'>
                <div className='authContent'>
                    <h1 className="authmainh1">Sign Up</h1>
                    <form>
                        <div className='rolesdiv'>
                            <div className='rolesdivp'>
                                <input type="radio" name="role" value="restaurant" checked={role === "restaurant"} onChange={onOptionChange} />
                                <p htmlFor="restaurant" style={{"margin" : 0}}>restaurant</p>
                            </div>
                            <div className="rolesdivp">
                                <input type="radio" name="role" value="customer" checked={role === "customer"} onChange={onOptionChange} />
                                <p htmlFor="customer" style={{"margin" : 0}}>customer</p>
                            </div>
                        </div>
                        <input type="text" placeholder='Enter your name' onChange={(val) => setUserDetails({ ...userDetails, name: val.target.value })} />
                        <input type="text" placeholder='Enter your email' onChange={(val) => setUserDetails({ ...userDetails, email: val.target.value })} />
                        <div className="passdiv">
                            <input type={!showInpPass ? "password" : "text"} placeholder='Enter your password' onChange={(val) => setUserDetails({ ...userDetails, password: val.target.value })} />
                            <button className='eyebtn' onClick={passValid} type="button" style={{ backgroundColor: "transparent !important" }}>

                                {!showInpPass ? <FontAwesomeIcon icon={faEye} style={{ background: "whitesmoke" }} />
                                    :
                                    <FontAwesomeIcon icon={faEyeSlash} style={{ background: "whitesmoke" }} />}
                            </button>
                        </div>
                        <div className="passdiv">
                            <input type={!showInpConPass ? "password" : "text"} placeholder='Confirm password' onChange={(val) => setConPass(val.target.value)} />
                            <button className='eyebtn' onClick={passConValid} type="button" style={{ backgroundColor: "transparent !important" }}>

                                {!showInpConPass ? <FontAwesomeIcon icon={faEye} style={{ background: "whitesmoke" }} />
                                    :
                                    <FontAwesomeIcon icon={faEyeSlash} style={{ background: "whitesmoke" }} />}
                            </button>
                        </div>
                        <input type="text" placeholder="Enter your phone no" onChange={(val) => setUserDetails({ ...userDetails, phoneNo: val.target.value })} />
                    </form>
                    <button type="button" className="mybtn signupbtn" data-toggle="modal" data-target="#exampleModal" onClick={signUpFunc}>
                        <a style={{ background: "transparent", color: "whitesmoke", textDecoration: "none" }}>Sign Up</a>

                    </button>
                    <p> Already Have an account? <a onClick={() => navigate("/login")} style = {{"color" : "rgb(28, 58, 147)"}}>Sign In</a></p>
                    

                </div>
                <div className='welcomebackpic'>

                </div>
            </main>
        </div>
    );
};


export default SignUpScreen;