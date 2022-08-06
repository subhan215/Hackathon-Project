import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookings } from '../store/actions/bookAction/getBookingsAction';
import { useNavigate } from 'react-router-dom';
import ActionType from '../store/constants/constant';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEdit, faGear , faMinusSquare , faPlusSquare , faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import "../App.css"
import { Button, Modal } from 'react-bootstrap';
import { bookUpd } from '../store/actions/bookAction/updBookAction';
import { signOut } from '../store/actions/authActions/signOutAction';
import { useRef } from 'react';

const UserScreen = (props) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const json = localStorage.getItem("darkMode");
    const currentMode = JSON.parse(json);
    if (currentMode) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
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
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getBookings())


  }, [])
  const [updBookDetails, setUpdBookDetails] = useState({
    hotelName: "",
    Name: "",
    Email: "",
    CNIC: "",
    _id: ""

  })
  const [showUpdModal, setShowUpdModal] = useState(false)
  const [NoOfDaysToStay, setNoOfDaysToStay] = useState(0)
  const [selectedRooms, setSelectedRooms] = useState(0)
  const [NoOfPersons, setNoOfPersons] = useState(0)

  const handleUpdClose = () => {
    setShowUpdModal(false)
  }

  const editBooking = (ind) => {
    setShowUpdModal(true)

    setUpdBookDetails({
      hotelName: userBookings[ind].hotelName,
      Name: userBookings[ind].Name,
      Email: userBookings[ind].Email,
      CNIC: userBookings[ind].CNIC,
      _id: userBookings[ind]._id
    })
    setNoOfDaysToStay(userBookings[ind].NoOfDaysToStay)
    setNoOfPersons(userBookings[ind].No0fPerson)
    setSelectedRooms(userBookings[ind].selectedRooms)
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
}function personIncrement() {
    setNoOfPersons(NoOfPersons + 1)
}
  const updBookFunc = () => {
    dispatch(bookUpd(updBookDetails , NoOfDaysToStay , NoOfPersons , selectedRooms))

    setShowUpdModal(false)


  }
  const { bookings } = useSelector((state) => state.bookingsReducer)
  let userBookings = bookings.filter(item => item.Email === props.email)
  console.log(bookings)
  console.log(userBookings)
  const personalInfo = () => {
    navigate("/personalInfo")
  }
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
          <div className='updBookDiv'>
            <div>
              <p>Name : </p>
              <input type="text" placeholder="Update Your Name" onChange={(e) => setUpdBookDetails({ ...updBookDetails, Name: e.target.value })} defaultValue={updBookDetails.Name} />
            </div>
            <div>
              <p>CNIC : </p>
              <input type="text" placeholder="Update Your CNIC" onChange={(e) => setUpdBookDetails({ ...updBookDetails, CNIC: e.target.value })} defaultValue={updBookDetails.CNIC} />
            </div>
            <p>Selected Rooms : <FontAwesomeIcon icon={faMinusSquare} onClick={roomsDecrement} /> {selectedRooms}   <FontAwesomeIcon icon={faPlusSquare} onClick={roomsIncrement} /></p>
            <p> No Of Days : <FontAwesomeIcon icon={faMinusSquare} onClick={decrement} />  {NoOfDaysToStay}  <FontAwesomeIcon icon={faPlusSquare} onClick={increment} /> </p>
            <p> No Of Persons : <FontAwesomeIcon icon={faMinusSquare} onClick={personDecrement} />  {NoOfPersons}  <FontAwesomeIcon icon={faPlusSquare} onClick={personIncrement} /> </p>                            



            <button onClick={updBookFunc}>Update </button>

          </div>


        </Modal.Body>
        <Modal.Footer style={{ border: "1px solid whitesmoke" }}>
          <Button variant="secondary" onClick={handleUpdClose} className="closeBtn">
            Close
          </Button>

        </Modal.Footer>
      </Modal>
      <div>
        <div className="profileHeadDiv">
          <h3>Previous Bookings</h3>
          <p> <FontAwesomeIcon icon={faGear} style={{ cursor: "pointer" }} className="settingIcon" onClick={openSetting}></FontAwesomeIcon></p>
        </div>
        <table className='bookingsTable'>
          <tr>

            <td>Restaurant Name </td>
            <td>Name </td>
            <td>CNIC  </td>
            <td>Price </td>
            <td>Method </td>
            <td>No Of Days To Stay </td>
            <td>Selected Rooms </td>
            <td>No of Person </td>
          </tr>
          {userBookings.map((val, ind) => {
            return <tr>
              <td> {val.hotelName}</td>
              <td>{val.Name}</td>
              <td>  {val.CNIC}</td>
              <td> {val.Price}</td>
              <td> {val.method}</td>
              <td>{val.NoOfDaysToStay}</td>
              <td>{val.selectedRooms}</td>
              <td>{val.No0fPerson}</td>
              <td>
                <FontAwesomeIcon icon={faEdit} onClick={() => editBooking(ind)} style={{ cursor: "pointer" }} className="postIcon"></FontAwesomeIcon></td>

            </tr>
          })}
        </table>


        <nav ref={settingNavRef} style={{ "maxHeight": "0" }} className = "profScreenNav">
          <ul className='settingList' ref={settingListRef} style={{ "visibility": "hidden" }}>
            <li><p onClick={personalInfo}>Personal Info</p></li>
            <li> <button onClick={() => darkModeFunc()}>Toggle Dark Mode</button></li>
            <li><p onClick={logOutFunc}>Log Out</p></li>

          </ul>
        </nav>

      </div>
    </>
  )
}


export default UserScreen;