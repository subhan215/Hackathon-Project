import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../cookies/getCookie';
import ActionType from '../store/constants/constant';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { updateEmail } from '../store/actions/personalInfoActions/updEmailAction';
import { updateName } from '../store/actions/personalInfoActions/updNameAction';
import { updatePass } from '../store/actions/personalInfoActions/updPassAction';
import { updatePhoneNo } from '../store/actions/personalInfoActions/updPhoneNoAction';

const PersonalInfoScreen = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        let userData = JSON.parse(getCookie("user"))
        console.log(userData)
        dispatch({ type: ActionType.SignIn, payload: userData })


    }, [])

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        phoneNo: "",
        updPass: "",


    })
    const [showName, setShowName] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showPhoneNo, setShowPhoneNo] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [showInpPass, setShowInpPass] = useState(false)
    const [showInpUpdPass, setShowInpUpdPass] = useState(false)

    const passValid = () => {
        !showInpPass ? setShowInpPass(true) : setShowInpPass(false)
    }
    const passUpdValid = () => {
        !showInpUpdPass ? setShowInpUpdPass(true) : setShowInpUpdPass(false)

    }
    const handleNameClose = () => {
        setShowName(false)
    }
    const handlePassClose = () => {
        setShowPass(false)
    }
    const handlePhoneNoClose = () => {
        setShowPhoneNo(false)
    }
    const handleEmailClose = () => {
        setShowEmail(false)
    }
    const handleNameOpen = () => {
        console.log(logInData)
        setUserData({ ...userData, name: logInName })

        setShowName(true)
    }
    const handlePassOpen = () => {

        setShowPass(true)
    }
    const handlePhoneNoOpen = () => {
        setUserData({ ...userData, phoneNo: logInPhoneNo })
        setShowPhoneNo(true)
    }
    const handleEmailOpen = () => {
        setUserData({ ...userData, email: logInEmail })

        setShowEmail(true)
    }
    const updNameFunc = () => {
        dispatch(updateName(logInData, userData.name))
    }
    const updEmailFunc = () => {
        dispatch(updateEmail(logInData, userData.email))
    }

    const updPhoneNoFunc = () => {
        dispatch(updatePhoneNo(logInData, userData.phoneNo))
    }
    const updPassFunc = () => {
        dispatch(updatePass(logInData, userData.password, logInPassword, userData.updPass, setUserData))
    }
    const { logInName, logInEmail, logInPassword, logInPhoneNo, logInUserImage, logInRole } = useSelector((state) => state.logInReducer.login)
    const logInData = {
        logInName, logInEmail, logInPassword, logInPhoneNo, logInUserImage, logInRole
    }
    return (
        <div>
            <Modal
                show={showName}
                onHide={handleNameClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Change Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="changesDiv">
                        <input type="text" placeholder='Change Name' value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                        <button onClick={updNameFunc} className="chngInfBtn">update</button>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ border: "1px solid whitesmoke" }}>
                    <Button variant="secondary" onClick={handleNameClose} className="closeBtn">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showPass}
                onHide={handlePassClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="changesDiv">
                        <div className='chngPassDiv'>

                            <div className='passdiv '>
                                <input type={!showInpPass ? "password" : "text"} placeholder='Enter Current Password' value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                                <button className='eyebtn' onClick={passValid} type="button" style={{ backgroundColor: "transparent !important" }}>

                                    {!showInpPass ? <FontAwesomeIcon icon={faEye} style={{ background: "whitesmoke" }} />
                                        :
                                        <FontAwesomeIcon icon={faEyeSlash} style={{ background: "whitesmoke" }} />}
                                </button>
                            </div>
                            <div className='passdiv'>
                                <input type={!showInpUpdPass ? "password" : "text"} placeholder='Enter new Password' value={userData.updPass} onChange={(e) => setUserData({ ...userData, updPass: e.target.value })} />
                                <button className='eyebtn' onClick={passUpdValid} type="button" style={{ backgroundColor: "transparent !important" }}>

                                    {!showInpUpdPass ? <FontAwesomeIcon icon={faEye} style={{ background: "whitesmoke" }} />
                                        :
                                        <FontAwesomeIcon icon={faEyeSlash} style={{ background: "whitesmoke" }} />}
                                </button>
                            </div>
                        </div>
                        <button onClick={updPassFunc} className="chngInfBtn">update</button>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ border: "1px solid whitesmoke" }}>
                    <Button variant="secondary" onClick={handlePassClose} className="closeBtn">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showEmail}
                onHide={handleEmailClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Change Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="changesDiv">
                        <input type="text" placeholder='Change Email' value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                        <button onClick={updEmailFunc} className="chngInfBtn">update</button>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ border: "1px solid whitesmoke" }}>
                    <Button variant="secondary" onClick={handleEmailClose} className="closeBtn">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showPhoneNo}
                onHide={handlePhoneNoClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Change Phone No</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="changesDiv">
                        <input type="text" placeholder='Change Phone No' value={userData.phoneNo} onChange={(e) => setUserData({ ...userData, phoneNo: e.target.value })} />
                        <button onClick={updPhoneNoFunc} className="chngInfBtn">update</button>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ border: "1px solid whitesmoke" }}>
                    <Button variant="secondary" onClick={handlePhoneNoClose} className="closeBtn">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='updProfDiv'>
                <h5> <button onClick={handleNameOpen}>Change Name</button></h5>
                <h5> <button onClick={handlePhoneNoOpen}>Change Phone No</button> </h5>
                <h5> <button onClick={handleEmailOpen}>Change Email</button>  </h5>
                <h5><button onClick={handlePassOpen}>Change Password</button></h5>
            </div>
        </div>
    );
};



export default PersonalInfoScreen;