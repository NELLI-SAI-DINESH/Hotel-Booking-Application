import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/bookingsPage.css";

const BookingsPage = () => {
    const [myBookings, setMyBookings] = useState([]);
    const navigate = useNavigate();

    const bookings = async () => {
        try {
            const response = await axios.get(`http://localhost:4001/bookings?email=${sessionStorage.getItem("email")}`);
            setMyBookings(response.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    useEffect(() => {
        bookings();
    }, []);

    const cancelBookingHandler = async (id) => {
        try {
            await axios.delete(`http://localhost:4001/bookings/${id}`);
            setMyBookings(myBookings.filter(item => item.id !== id));
        } catch (error) {
            console.log("Error canceling booking:", error);
        }
    };

    return (
        <>
            <div className="bookingPage-container">
                <ul>
                    {myBookings.length > 0 ? (
                        myBookings.map(item => (
                            <div className="bookingPage-cards" key={item.id}>
                                <h4>
                                    Name: {item.customerName}
                                    <br />
                                    Start Date: {item.startDate}
                                    <br />
                                    End Date: {item.endDate}
                                    <br />
                                    Type Of Room: {item.typeOfRoom}
                                    <br />
                                    Hotel Name: {item.hotelName}
                                    <br />
                                    Email: {item.email}
                                    <br />
                                    <button
                                        className="bookingPage-button"
                                        onClick={() => cancelBookingHandler(item.id)}
                                    >
                                        Cancel Booking
                                    </button>
                                    <h3 className="hotelName-bookingsPage">{item.hotelName}</h3>
                                </h4>
                            </div>
                        ))
                    ) : (
                        <div className="bookingPage-cards">
                            <h3>You haven't booked any rooms yet</h3>
                            <br />
                            <button className="bookingPage-button" onClick={() => navigate("/hotelsPage")}>
                                Book Room
                            </button>
                        </div>
                    )}
                </ul>
            </div>
        </>
    );
};

export default BookingsPage;
