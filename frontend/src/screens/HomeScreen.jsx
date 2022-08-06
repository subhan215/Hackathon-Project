import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { getCookie } from '../cookies/getCookie';
import { getHotels } from '../store/actions/hotelsAction/getHotelsAction';

/* import DropdownButton from 'react-bootstrap/DropdownButton';
 *//* import Dropdown from 'react-bootstrap/Dropdown' */

/* import { removeDuplicateObjectFromArray } from "../functions/removeDuplicate"
 */import { TextField } from '@material-ui/core';
import { bookAdd } from '../store/actions/bookAction/bookAddAction';
import Dropdown from "../components/Dropdown"
import { faMinusSquare, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../App.css"
import { MultiSelect } from "react-multi-select-component";
import { hotelsWithFilterFunc } from '../store/actions/hotelsWithFilterAction/hotelsWithFilterAction';
import { useRef } from 'react';


const HomeScreen = () => {
    const navigate = useNavigate()
    const signUpNav = () => {
        navigate("/signup")
        document.body.classList.remove("dark");

    }
    const signInNav = () => {
        navigate("/login")
        document.body.classList.remove("dark");

    }
    const profNav = () => {
        let user = getCookie("user")
        if (user) {
            navigate("/profile")

        } else {
            alert("Please First Login")
        }
    }
    let user;
    useEffect(() => {
        /*   */
        console.log(filterBy)
        handleFilterBy()

    });
    useEffect(() => {
        user = getCookie("user")
        let darkMode = localStorage.getItem("darkMode", JSON.stringify("darkMode"))

        if (user && darkMode) {
            document.body.classList.add("dark");

        } else {
            document.body.classList.remove("dark");
        }
    })
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [showUserDetails, setShowUserDetails] = useState(false)
    const [showHotelInfo, setShowHotelInfo] = useState(false)
    const [showBookingDetails, setShowBookingDetails] = useState(false)
    const [showPaymentOption, setShowPaymentOption] = useState(false)
    const [method, setMethod] = useState("cash")


    const [hotelInfo, setHotelInfo] = useState({
        Name: "",
        PerRoomPrice: 0,

    })
    const [userInfo, setUserInfo] = useState({
        Name: "",
        ContactNo: "",
        CNIC: "",
        Address: "",
        Email: ""

    })
    const [userPaymentInfo, setUserPaymentInfo] = useState({
        bankName: "Bank Al Habib",
        cardNo: "",
        cardCode: "",
        expiryDate: ""
    })
    const [NoOfDaysToStay, setNoOfDaysToStay] = useState(0)
    const [selectedRooms, setSelectedRooms] = useState(0)
    const [NoOfPersons, setNoOfPersons] = useState(0)
    let Price = (hotelInfo.PerRoomPrice * selectedRooms) * NoOfDaysToStay
    const [filterBy, setFilterBy] = useState("Price In Ascend Order");


    const handleFilterBy = () => {
        if (filterBy === "Price In Descend Order") {
            if (hotelsWithFilter.length > 0) {
                hotelsWithFilter = hotelsWithFilter.sort((a, b) => a.Price - b.Price)
            } else {
                hotels = hotels.sort((a, b) => a.Price - b.Price)
            }
        } else if (filterBy === "Price In Ascend Order") {
            if (hotelsWithFilter.length > 0) {
                hotelsWithFilter = hotelsWithFilter.sort((a, b) => b.Price - a.Price)

            } else {
                hotels = hotels.sort((a, b) => b.Price - a.Price)

            }
        }
    }


    const handleClose = () => {
        setShow(false)
        setShowUserDetails(false)
        setShowHotelInfo(false)
        setShowBookingDetails(false)
        setShowPaymentOption(false)


    };
    const bankNameHandle = (e) => {
        setUserPaymentInfo({ ...userPaymentInfo, bankName: e.target.value })
    }

    useEffect(() => {
        dispatch(getHotels())
    })



    const bookNow = (Name, Price) => {
        let user = JSON.parse(getCookie("user"))

        if (!user) {
            <Navigate to="/login" />
        }
        else if (user.role === "restaurant") {
            alert("Please sign in as customer")
        }
        else {
            setShow(true)
            setShowHotelInfo(true)
            setHotelInfo({
                Name,
                PerRoomPrice: Price
            })

            setUserInfo({
                ...userInfo, Email: user.email
            })
            /*  dispatch({
                 type : ActionType.hotelInfo , 
                 payload : {Name , PerRoomPrice}
             }) */

        }
    }
    const nextToUserDetails = () => {
        setShowHotelInfo(false);
        setShowUserDetails(true);
    }
    const nextToBookingDetails = () => {

        setShowUserDetails(false);
        setShowBookingDetails(true)
    }
    const nextToPaymentOption = () => {


        setShowBookingDetails(false)
        setShowPaymentOption(true)
    }
    const onOptionChange = e => {
        setMethod(e.target.value)
    }
    const increment = () => {
        setNoOfDaysToStay(NoOfDaysToStay + 1)
    }
    const roomsIncrement = () => {
        setSelectedRooms(selectedRooms + 1)
    }
    const roomsDecrement = () => {
        setSelectedRooms(selectedRooms - 1)
    }
    function decrement() {
        setNoOfDaysToStay(NoOfDaysToStay - 1)
    }
    function personDecrement() {
        setNoOfPersons(NoOfPersons - 1)
    } function personIncrement() {
        setNoOfPersons(NoOfPersons + 1)
    }
    function onSubmit() {
        dispatch(bookAdd(hotelInfo.Name, userInfo, userPaymentInfo, NoOfDaysToStay, selectedRooms, NoOfPersons, Price, method, setUserInfo, setUserPaymentInfo, setNoOfDaysToStay, setSelectedRooms, setNoOfPersons, setMethod))
    }
    let { hotels } = useSelector((state) => state.hotelReducer)
    let { hotelsWithFilter } = useSelector((state) => state.hotelsWithFilterReducer)
    const options = [
        { label: "Breakfast ", value: "Breakfast" },
        { label: "Swimming Pool ", value: "Swimming Pool" },
        { label: "Gym", value: "Gym" },
        { label: "Big Room", value: "Big Room" },
        { label: "luxury room", value: "luxury room" },
        { label: "Club", value: "Club" },


    ];
    const [selected, setSelected] = useState([]);
    useEffect(() => {
        dispatch(hotelsWithFilterFunc(selected, hotels))

    }, [selected])
    const HomeNavList = useRef()
    const togglerImg = useRef()


    const menuToggle = () => {


        if (HomeNavList.current.style.maxHeight === "0px") {
            HomeNavList.current.style.maxHeight = "200px"
            HomeNavList.current.style.borderTop = "1px solid rgb(28, 58, 147)"

            togglerImg.current.src = "images/cross.png"
        } else if (HomeNavList.current.style.maxHeight === "200px") {
            HomeNavList.current.style.maxHeight = "0px"
            HomeNavList.current.style.borderTop = "none"

            togglerImg.current.src = "images/menu.png"
        }
    }
    return (
        <>
            <div>
                <header className='homeScreenHeader'>
                    <h1 className=''><img src='images/logo.png' width="200" height="100" /></h1>
                    <nav>
                        <ul ref={HomeNavList} style={{ maxHeight: "0px" }}>
                            <li><a onClick={signUpNav} >Sign Up</a></li>
                            <li><a onClick={signInNav} >Sign In</a></li>
                            <li><a onClick={profNav}>Profile</a></li>
                        </ul>

                    </nav>
                    <img src="images/menu.png" className="menu-icon" onClick={menuToggle} ref={togglerImg} width="35px" height="23px" />

                </header>
                <div className='homeScreenHead'>

                    <Dropdown
                        label="Filter by:"
                        options={[
                            { label: 'Price In Descend Order', value: 'Price In Descend Order' },
                            { label: 'Price In Ascend Order', value: 'Price In Ascend Order' },



                        ]}
                        value={filterBy}
                        onChange={(e) => setFilterBy(e.target.value)} Class="filterByDropDown" />

                    <div className='servicesFilterDiv'>
                        <p>Specially to Include : </p>
                        <MultiSelect
                            options={options}
                            value={selected}
                            onChange={setSelected}
                            labelledBy="Select"
                        />
                    </div>
                </div>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton >
                        <Modal.Title style={{ color: "black", width: "500px", textAlign: "center" }}>Book Now</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ color: "black" }}>
                        {showPaymentOption && <div className='paymentDiv'>
                            <p>Select Payment Method</p>
                            <div className='paymentOptions'>
                                <div>
                                    <input type="radio" name="method" value="card" checked={method === "card"} onChange={onOptionChange} />
                                    <label htmlFor="Card">Card</label>
                                </div>
                                <div>
                                    <input type="radio" name="method" value="cash" checked={method === "cash"} onChange={onOptionChange} />
                                    <label htmlFor="Cash">Cash</label>
                                </div>
                            </div>
                            {method === "card" && <div >
                                <p>Select Your Bank : </p>
                                <select value={userPaymentInfo.bankName} onChange={bankNameHandle}>
                                    <option value="Bank Al Habib">Bank Al Habib</option>
                                    <option value="Ubl Bank">Ubl Bank</option>
                                    <option value="Bank Alfalah">Bank Alfalah</option>
                                </select>
                                <div>
                                    <input type="text" placeholder='Enter Card No.' onChange={(e) => setUserPaymentInfo({ ...userPaymentInfo, cardNo: e.target.value })} />

                                </div>
                                <div>
                                    <input type="text" placeholder='Enter Card Code' onChange={(e) => setUserPaymentInfo({ ...userPaymentInfo, cardCode: e.target.value })} />
                                </div>
                                <div style={{

                                    display: 'block',
                                    width: 'fit-content'
                                }}>
                                    <p>Choose card expiry date: </p>

                                    <TextField
                                        id="date"
                                        onChange={(e) => setUserPaymentInfo({ ...userPaymentInfo, expiryDate: e.target.value })}
                                        type="date"
                                        defaultValue="2017-05-24"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                            </div>}
                            <button onClick={onSubmit} className="bookSubmitbtn">Submit </button>

                        </div>}
                        {showBookingDetails && <div className="userDetailsShow">
                            <p>Name : {userInfo.Name}</p>
                            <p>Contact No : {userInfo.ContactNo}</p>
                            <p>CNIC : {userInfo.CNIC}</p>
                            <p>Address : {userInfo.Address}</p>
                            <p>No Of Persons : {userInfo.No0fPerson}</p>
                            <p>Selected Rooms : {selectedRooms}</p>
                            <p>No Of Days To Stay : {NoOfDaysToStay}</p>
                            <p>Price : {Price}</p>
                            <button onClick={nextToPaymentOption}>Next</button>

                        </div>}
                        {showUserDetails && <div className='bookPersonInfo'>
                            <p>Your Name : <input type="text" onChange={(e) => setUserInfo({ ...userInfo, Name: e.target.value })} /></p>
                            <p>Contact No <input type="text" onChange={(e) => setUserInfo({ ...userInfo, ContactNo: e.target.value })} /> </p>
                            <p>CNIC : <input type="text" onChange={(e) => setUserInfo({ ...userInfo, CNIC: e.target.value })} /></p>
                            <p>Address : <input type="text" onChange={(e) => setUserInfo({ ...userInfo, Address: e.target.value })} /></p>
                            <p> No Of Persons : <FontAwesomeIcon icon={faMinusSquare} onClick={personDecrement} />  {NoOfPersons}  <FontAwesomeIcon icon={faPlusSquare} onClick={personIncrement} /> </p>                            <button onClick={nextToBookingDetails}>Next</button>
                        </div>

                        }
                        {showHotelInfo &&
                            <div className="hotelRoomSelectDiv">
                                <h5>Hotel Name: {hotelInfo.Name}</h5>
                                <p>Room Price Per Day: {hotelInfo.PerRoomPrice}</p>


                                <p>Selected Rooms : <FontAwesomeIcon icon={faMinusSquare} onClick={roomsDecrement} /> {selectedRooms}   <FontAwesomeIcon icon={faPlusSquare} onClick={roomsIncrement} /></p>
                                <p> No Of Days : <FontAwesomeIcon icon={faMinusSquare} onClick={decrement} />  {NoOfDaysToStay}  <FontAwesomeIcon icon={faPlusSquare} onClick={increment} /> </p>

                                <p>Total Price: {Price}</p>
                                <button onClick={nextToUserDetails}>Next</button>
                            </div>}
                    </Modal.Body>
                    <Modal.Footer style={{ border: "1px solid whitesmoke" }}>
                        <Button variant="secondary" onClick={handleClose} className="closeBtn">
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
                <div className="hotelsDiv ">
                    {
                        hotelsWithFilter.length > 0 ?
                            hotelsWithFilter.map((val, ind) => {
                                console.log(val)
                                return <div className='postDiv col-lg-3 col-md-4 col-sm-8 col-8'>
                                    <div className='postDivp1'>
                                        <div className='hotelName'>
                                            <h4>{
                                                val.Name}</h4>
                                        </div>
                                        <div className='postImgDiv'>
                                            <img src={val.Image} alt="" width="200px" height="150px" />
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
                                        <div className='bookNowbbtnDiv'>
                                            <button onClick={() => bookNow(val.Name, val.Price)} className="bookNowbtn">Book Now</button>
                                        </div>
                                    </section>

                                </div>
                            }) :
                            hotels.map((val, ind) => {
                                return <div className='postDiv col-lg-3 col-md-4 col-sm-8 col-8 ' data-aos="fade-right">
                                    <div className='postDivp1'>
                                        <div className='hotelName'>
                                            <h3>{
                                                val.Name}</h3>
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
                                            <p><span>Services Of Rooms :</span><div className='postlistDiv'>{val.Services_of_Rooms.map((val, ind) => {
                                                return <li>{val} </li>

                                            })} </div></p>
                                            <p ><span> Room Details : </span>  <div className='postlistDiv'>{val.Room_Details.map((val, ind) => {
                                                return <li>{val}</li>
                                            })}  </div></p>
                                            <p> <span> Hotel Services : </span>   <div className='postlistDiv'>{val.Services.map((val, ind) => {
                                                return <li>{val}</li>
                                            })}  </div></p>
                                        </div>
                                        <div className='bookNowbbtnDiv'>
                                            <button onClick={() => bookNow(val.Name, val.Price)} className="bookNowbtn">Book Now</button>
                                        </div>
                                    </section>

                                </div>
                            })}
                </div>
            </div>
        </>
    )
};


export default HomeScreen;