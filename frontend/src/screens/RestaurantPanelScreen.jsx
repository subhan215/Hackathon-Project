import React, { useEffect, useState, useRef } from "react"
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { addHotel } from "../store/actions/hotelsAction/hotelAddAction";
import { getHotels } from '../store/actions/hotelsAction/getHotelsAction';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEdit, faGear, faCirclePlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { delHotel } from "../store/actions/hotelsAction/delHotelAction";
import { updHotel } from "../store/actions/hotelsAction/updHotelAction";
import { useNavigate } from "react-router-dom";
import { signOut } from "../store/actions/authActions/signOutAction";
import "../App.css"

const RestauantPanelScreen = (props) => {
    const navigate = useNavigate()
    const personalInfo = () => {
        navigate("/personalInfo")
    }
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const json = localStorage.getItem("darkMode");
        const currentMode = JSON.parse(json);
        if (currentMode) {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
        console.log(hotelDetails)
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }

    }, [darkMode])
    const darkModeFunc = () => {
        if (darkMode) {
            setDarkMode(false)
            document.body.classList.remove("dark");
            localStorage.setItem("lightMode", JSON.stringify("lightMode"))
            localStorage.removeItem("darkMode", JSON.stringify("darkMode"))

        } else {
            setDarkMode(true)
            document.body.classList.add("dark");
            localStorage.setItem("darkMode", JSON.stringify("darkMode"))
            localStorage.removeItem("lightMode", JSON.stringify("lightMode"))

        }
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getHotels())


    }, [])
    const [show, setShow] = useState(false);
    const [updValue, setUpdValue] = useState('')
    const [hotelDetails, setHotelDetails] = useState({
        Name: "",
        Price: "",
        Services_of_Rooms: [],
        Room_Details: [],
        Services: [],
    })
    const [updHotelDetails, setUpdHotelDetails] = useState({
        Name: "",
        Price: "",
        Services_of_Rooms: [],
        Room_Details: [],
        Services: [],
        image: "",
        img_Cloud_Id: ""
    })
    const [roomServices, setRoomServices] = useState("")
    const [roomDetails, setRoomDetails] = useState("")
    const [services, setServices] = useState("")
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [showUpdModal, setShowUpdModal] = useState(false)
    const handleUpdClose = () => {
        setShowUpdModal(false)



    }
    const handleClose = () => {
        setShow(false)

    };

    const roomDetailsFunc = () => {
        setHotelDetails({ ...hotelDetails, Room_Details: [...hotelDetails.Room_Details, roomDetails] })
        setRoomDetails("")
    }
    const roomServicesFunc = () => {
        setHotelDetails({ ...hotelDetails, Services_of_Rooms: [...hotelDetails.Services_of_Rooms, roomServices] })
        setRoomServices("")
        console.log(roomServices)

    }
    const servicesFunc = () => {
        setHotelDetails({ ...hotelDetails, Services: [...hotelDetails.Services, services] })
        setServices("")

    }
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }
    const addHotelFunc = () => {
        dispatch(addHotel(hotelDetails, props.email, previewSource, setHotelDetails, setPreviewSource))
    }
    const delHotelFunc = (Email, Img_Cloud_Id) => {
        dispatch(delHotel(Email, Img_Cloud_Id))
    }
    const editPost = (Email, image, img_Cloud_Id) => {
        setShowUpdModal(true);
        let hotel = hotels.filter(item => item.Email === Email)
        setUpdHotelDetails({
            Name: hotel[0].Name,
            Price: hotel[0].Price,
            Services_of_Rooms: hotel[0].Services_of_Rooms,
            Room_Details: hotel[0].Room_Details,
            Services: hotel[0].Services,
            image,
            img_Cloud_Id

        })
    }
    const updHotelName = () => {
        setUpdHotelDetails({
            ...updHotelDetails, Name: updValue
        })
        alert("Value Updated")
    }
    const updPerRoomPrice = () => {
        setUpdHotelDetails({
            ...updHotelDetails, Price: updValue
        })
        alert("Value Updated")
    }
    const updServicesOfRooms = (ind) => {
        updHotelDetails.Services_of_Rooms.splice(ind, 1, updValue)
        alert("Value Updated")

    }
    const updRoom_Details = (ind) => {
        updHotelDetails.Room_Details.splice(ind, 1, updValue)
        alert("Value Updated ")

    }
    const updServices = (ind) => {
        updHotelDetails.Services.splice(ind, 1, updValue)
        alert("Value Updated ")

    }
    const updHotelFunc = () => {
        dispatch(updHotel(props.email, updHotelDetails, previewSource, setPreviewSource))

        setShowUpdModal(false)


    }

    const { hotels } = useSelector((state) => state.hotelReducer)
    let hotel;
    if (hotels) {
        hotel = hotels.filter(item => item.Email === props.email)
    }

    console.log(hotels)
    console.log(hotel)
    const logOutFunc = () => {
        dispatch(signOut(navigate))

    }
    const settingListRef = useRef()
    const settingNavRef = useRef()
    const openSetting = () => {

        if (settingNavRef.current.style.maxHeight == "0px") {
            settingNavRef.current.style.maxHeight = "200px"
            settingNavRef.current.style.border = "1px solid rgb(28, 58, 147)"

        }
        else {
            settingNavRef.current.style.maxHeight = "0"
            settingNavRef.current.style.border = "none"

        }

    }
    useEffect(() => {
        if (settingNavRef.current.style.width = "200px") {
            settingListRef.current.style.visibility = "visible"
        } else {
            settingListRef.current.style.visibility = "hidden"

        }

    });
    return (
        <>
            <nav ref={settingNavRef} style={{ "maxHeight": "0"}} className = "profScreenNav">
                <ul className='settingList' ref={settingListRef} style={{ "visibility": "hidden" }}>
                    <li><p onClick={personalInfo}>Personal Info</p></li>
                    <li> <button onClick={() => darkModeFunc()}>Toggle Dark Mode</button></li>
                    <li><p onClick={logOutFunc}>Log Out</p></li>

                </ul>
            </nav>
            <div className="detailsShowDiv">
                <div className="profileHeadDiv">
                    <div className="hotelDetHead">
                        <h3>Enter Your Hotel Details </h3><button onClick={() => setShow(true)}>
                            Add
                        </button></div>
                    <p> <FontAwesomeIcon icon={faGear} style={{ cursor: "pointer" }} className="settingIcon" onClick={openSetting}></FontAwesomeIcon></p>
                </div>


                <h5> Hotel Name :
                    {hotelDetails.Name ?
                        <span> {" " + hotelDetails.Name} </span> : null} </h5>
                <h5> Per Room Price :
                    {hotelDetails.Price ?
                        <span>{" " + hotelDetails.Price}</span> : null} </h5>


                <h5>Services of Rooms : </h5>

                {
                    hotelDetails.Services_of_Rooms ?
                        hotelDetails.Services_of_Rooms.map((val, ind) => {
                            return <li>{" " + val}</li>
                        }) : null
                }
                <h5>Room Details : </h5>
                {
                    hotelDetails.Room_Details ?
                        hotelDetails.Room_Details.map((val, ind) => {
                            return <li>{" " + val}</li>
                        }) : null
                }
                <h5>Hotel Services: </h5>
                {
                    hotelDetails.Services ?
                        hotelDetails.Services.map((val, ind) => {
                            return <li>{" " + val}</li>
                        }) : null
                }
                {previewSource && (<div className="hotelPicDiv">
                    <img
                        src={previewSource}
                        alt="chosen"
                        style={{ height: '200px', width: "250px" }}
                    />                </div>
                )}
                <button onClick={addHotelFunc} className="postBtn">Post</button>
            </div>
            {<Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton className="myModalhead">
                    <Modal.Title >
                        Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='addHotelInput'>
                        <div>
                            <input type="text" placeholder="Hotel Name" onChange={(e) => setHotelDetails({ ...hotelDetails, Name: e.target.value })} />
                        </div>
                        <div>
                            <input type="text" placeholder="Per Room Price" onChange={(e) => setHotelDetails({ ...hotelDetails, Price: e.target.value })} />
                        </div>
                        <div>
                            <input type="text" placeholder='Room Services' onChange={(e) => setRoomServices(e.target.value)} value={roomServices} />
                            <button onClick={roomServicesFunc} style={{ border: "none" }}>
                                <FontAwesomeIcon icon={faPlusCircle} style={{ cursor: "pointer" }} className="addIcon"></FontAwesomeIcon>
                            </button>
                        </div>
                        <div>
                            <input type="text" placeholder='Room Details' onChange={(e) => setRoomDetails(e.target.value)} value={roomDetails} />
                            <button onClick={roomDetailsFunc} style={{ border: "none" }}>
                                <FontAwesomeIcon icon={faPlusCircle} style={{ cursor: "pointer" }} className="addIcon"></FontAwesomeIcon>
                            </button>
                        </div>
                        <div>
                            <input type="text" placeholder='Services Details' onChange={(e) => setServices(e.target.value)} value={services} />
                            <button onClick={servicesFunc} style={{ border: "none" }}>
                                <FontAwesomeIcon icon={faPlusCircle} style={{ cursor: "pointer" }} className="addIcon"></FontAwesomeIcon>

                            </button>
                        </div>
                        <div>
                            <input
                                id="fileInput"
                                type="file"
                                name="image"
                                onChange={handleFileInputChange}
                                value={fileInputState}
                                className="form-input"
                                style={{ border: "none" }}
                            />
                        </div>
                    </div>
                    {previewSource && (<div className='crtPostImg'>
                        <img
                            src={previewSource}
                            alt="chosen"
                            style={{ height: '200px', width: "250px" }}
                        />                </div>
                    )}




                </Modal.Body>
                <Modal.Footer style={{ border: "1px solid whitesmoke" }}>
                    <Button variant="secondary" onClick={handleClose} className="closeBtn">
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>}
            <Modal
                show={showUpdModal}
                onHide={handleUpdClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header closeButton >
                    <Modal.Title >Update Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='inputdiv updateDetMod'>

                        <p>Hotel Name : </p>
                        <div>
                            <input type="text" placeholder="Update Hotel Name" onChange={(e) => setUpdValue(e.target.value)} defaultValue={updHotelDetails.Name} />
                            <FontAwesomeIcon icon={faCirclePlus} onClick={() => updHotelName()} style={{ cursor: "pointer" }} className="postIconR"></FontAwesomeIcon>

                            
                        </div>

                        <p>Per Room Price : </p>
                        <div>
                            <input type="text" placeholder='Update Per Room Price' onChange={(e) => setUpdValue(e.target.value)} defaultValue={updHotelDetails.Price} />
                            <FontAwesomeIcon icon={faCirclePlus} onClick={() => updPerRoomPrice()} style={{ cursor: "pointer" }} className="postIconR"></FontAwesomeIcon>

                        </div>
                        <div className = "hotelDetailsDivR">
                            <p>Services of Rooms : </p>
                            {updHotelDetails.Services_of_Rooms.map((val, ind) => {
                                return <div>

                                    <input type="text" onChange={(e) => setUpdValue(e.target.value)} defaultValue={val} />
                                   <FontAwesomeIcon icon={faCirclePlus} onClick={() => updServicesOfRooms(ind)} style={{ cursor: "pointer" }} className="postIconR"></FontAwesomeIcon>

                                </div>

                            })}
                            <p>Room Details : </p>
                            {updHotelDetails.Room_Details.map((val, ind) => {
                                return <div>
                                    <input type="text" defaultValue={val} onChange={(e) => setUpdValue(e.target.value)} />
                                    <FontAwesomeIcon icon={faCirclePlus} onClick={() => updRoom_Details(ind)} style={{ cursor: "pointer" }} className="postIconR"></FontAwesomeIcon>

                                </div>
                            })}
                            <p>Hotel Services : </p>
                            {updHotelDetails.Services.map((val, ind) => {
                                return <div>
                                    <input type="text" defaultValue={val} onChange={(e) => setUpdValue(e.target.value)} />
                                    <FontAwesomeIcon icon={faCirclePlus} onClick={() => updServices(ind)} style={{ cursor: "pointer" }} className="postIconR"></FontAwesomeIcon>

                                </div>

                            })}
                        </div>
                        <p className="updimgP">If want to Update Image</p>
                        <input
                            id="fileInput"
                            type="file"
                            name="image"
                            onChange={handleFileInputChange}
                            value={fileInputState}
                            className="imgInput"
                        />

                        {previewSource && (<div className='crtPostImg updHotelImg'>
                            <img
                                src={previewSource}
                                alt="chosen"
                                style={{ height: '200px', width: "250px" }}
                            />                </div>

                        )}
                        <button onClick={updHotelFunc} className = "updBtn">Update </button>

                    </div>


                </Modal.Body>
                <Modal.Footer style={{ border: "1px solid whitesmoke" }}>
                    <Button variant="secondary" onClick={handleUpdClose} className="closeBtn">
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
            {hotel && hotel.map((val, ind) => {
                return <div className='postDiv col-lg-4 col-md-6 col-sm-12 postDivR'>
                    <div className='iconsDiv'>
                        <FontAwesomeIcon icon={faEdit} onClick={() => editPost(val.Email, val.Image, val.Img_Cloud_Id)} style={{ cursor: "pointer" }} className="postIconR"></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faTimes} onClick={() => delHotelFunc(val.Email, val.Img_Cloud_Id)} style={{ cursor: "pointer" }} className="postIconR"> </FontAwesomeIcon>

                    </div>
                    <div className="postContentR">
                        <div className='postDivp1'>
                            <div className='hotelName'>
                                <h4>{
                                    val.Name}</h4>
                            </div>
                            <div className='postImgDiv'>
                                <img src={val.Image} alt="" width="100%" height="150px" />
                            </div>
                        </div>
                        <section>
                            <div className='priceDiv'>
                                <p>Per Room Price : {val.Price}</p>
                            </div>
                            <div className='hotelInfoSec'>
                                <p>Services Of Rooms :<div className='postlistDiv'>{val.Services_of_Rooms.map((val, ind) => {
                                    return <li>{val} </li>

                                })} </div></p>
                                <p >Room Details :  <div className='postlistDiv'>{val.Room_Details.map((val, ind) => {
                                    return <li>{val}</li>
                                })}  </div></p>
                                <p>Hotel Services :  <div className='postlistDiv'>{val.Services.map((val, ind) => {
                                    return <li>{val}</li>
                                })}  </div></p>
                            </div>
                        </section>
                    </div>


                </div>
            })}

        </>
    )
}
export default RestauantPanelScreen