import React, { useEffect, useState } from "react";
import "../css/bookRoom.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookRoomPage = (props) => {

    const [startDate, setStartDate]=useState(" ");
    const [endDate, setEndDate]=useState(" ");
    const [NoOfPersons, setNoOfPersons]=useState();
    const [NoOfRooms, setNoOfRooms]=useState();
    const [selectedRoom, setselectedRoom]=useState();
    const [hotelName, setHotelName]=useState();
    const [name, setName]=useState();
    const [hotelId, setHotelId]=useState();
    const params=useParams();
    const navigate=useNavigate();

    const startDateChangeHandler = (event) => {
        console.log("start date", typeof(event.target.value));
        setStartDate(event.target.value);
        
    }

    const endDateChangeHandler = (event) => {
        setEndDate(event.target.value);
        
    }

    const NoOfPersonsChangeHandler = (event) => {
        setNoOfPersons(event.target.value);
        
    }

    const NoOfRoomsChangeHandler = (event) => {
        setNoOfRooms(event.target.value);
        
    }

    const selectRoomChangeHandler = (event) => {
        setselectedRoom(event.target.value);
        //console.log("room= ",event.target.value);
        
    };

    const nameChangeHandler = (event) => {
        setselectedRoom(event.target.value);
        //console.log("room= ",event.target.value);
        
    };



    const getHotelName = async () => {
        try {
            const storeResponse =await axios.get(`http://localhost:4001/hotels/${parseInt(params.bookRoomHotelId)}`);
            const storeHotelName = storeResponse.data.hotelName;
            const hotelId = storeResponse.data.id;
            setHotelName(storeHotelName);
            setHotelId(hotelId);
            
        } catch (error) {
             console.log("Error in getHotelName",error);
        }
    }

    // console.log("getting user email: ", props.email);
             useEffect(()=> {
                getHotelName();
                },[params.bookRoomHotelId]);


                const bookingData = {
                    customerName: name,
                    startDate: startDate,
                    endDate: endDate,
                    NoOfPersons: NoOfPersons,
                    NoOfRooms: NoOfRooms,
                    typeOfRoom: selectedRoom,
                    hotelName: hotelName,
                    hotelId: hotelId,
                    email: sessionStorage.getItem("email"),
                };
                


    const handleBook = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4001/bookings",bookingData)
                .then((response) => {
                    console.log(response.bookingData);
                    alert("congrats you Successfully Booked The Room.",bookingData)
                    navigate("/bookingsPage")
                    
                })

                .catch((err) => {
                    console.log("sorry can't post the data");
                    
                });
                setName("");
                setStartDate("");
                setEndDate("");
                setNoOfPersons();
                setNoOfRooms();
                setselectedRoom();
    }

    return (
        <>
        <div className="BookRoom-container">
            <form className="BookRoom-form" onSubmit={handleBook}>
            <h3 className="pageName">BOOK YOUR ROOM, here</h3>
            <label htmlFor='name'>Name: </label>
            <input
            type='text'
            id='name'
            name="name"
            placeholder="Your Name"
            autoComplete="off"
            value={name}
            onChange={nameChangeHandler}
            required
            />

            <label htmlFor='startDate'>Start Date: </label>
            <input
            type='date'
            id='startDate'
            name="startDate"
            //placeholder=""
            value={startDate}
            onChange={startDateChangeHandler}
            autoComplete="off"
            required
            />

            <label htmlFor='endDate'>End Date: </label>
            <input
            type='date'
            id='endDate'
            name="endDate"
            //placeholder=""
            value={endDate}
            onChange={endDateChangeHandler}
            autoComplete="off"
            required
            />

            <label htmlFor='NoOfPersons:'>No Of Persons:</label>
            <input
            type='number'
            id='NoOfPersons'
            name="NoOfPersons"
            placeholder="No Of Persons"
            autoComplete="off"
            value={NoOfPersons}
            onChange={NoOfPersonsChangeHandler}
            required
            />

            <label htmlFor='NoOfRooms:'>No Of Rooms:</label>
            <input
            type='number'
            id='NoOfRooms'
            name="NoOfRooms"
            placeholder="No Of Rooms"
            autoComplete="off"
            value={NoOfRooms}
            onChange={NoOfRoomsChangeHandler}
            required
            />
            <label htmlFor="TypeOfRoom:">Type Of Room:</label>

            <select name="Rooms" id="Rooms" value={selectedRoom} onChange={selectRoomChangeHandler}>
                <option value="Suit Room">Suit Room</option>   
                <option value="5 star Room">5 Star Room</option> 
                <option value="3 Star Room">3 Star Room</option> 
            </select>
            {/* <p>Selected option: {selectedRoom}</p>*/}

            <button type="submit">Book</button>
            {/* <p>{error}</p> */}


            </form>
        </div>
        </>
    );

    };

    export default BookRoomPage;


