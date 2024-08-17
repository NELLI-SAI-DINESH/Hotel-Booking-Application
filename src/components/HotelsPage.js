import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/hotelsPage.css";
import { useNavigate } from "react-router-dom";

const HotelsPage = () => {
    const [data, setData] = useState([]); // Changed 'date' to 'data'
    const navigate = useNavigate();

    const responseHandler = async () => {
        try {
            const response = await axios.get("http://localhost:4001/hotels");
            setData(response.data);
        } catch (error) {
            console.error("Error fetching hotel data:", error);
        }
    };

    useEffect(() => {
        responseHandler();
    }, []);

    return (
        <>
            <div className="hotelPage-container">
                <h1>Select your stay here</h1>
                <br />
                <div>
                    <ul>
                        {data?.map((item) => (
                            <div className="hotelsPage-cards" key={item.id}>
                                <h3 className="hotelName">{item.hotelName}</h3>
                                <h4 className="hotelDetails">
                                    City Name: {item.city}
                                    <br />
                                    Amenities: {item.amenities}
                                    <br />
                                    Address: {item.address}
                                    <br />
                                    Contact No: {item.phoneNo}
                                </h4>
                                <span>
                                    <button
                                        className="hotel-button"
                                        onClick={() => navigate(`/bookRoomPage/${item.id}`)}
                                    >
                                        Book A Room
                                    </button>
                                    <button
                                        className="hotel-button"
                                        onClick={() => navigate(`/viewReviewPage/${item.id}`)}
                                    >
                                        View Reviews
                                    </button>
                                    <button
                                        className="hotel-button"
                                        onClick={() => navigate(`/addReviewPage/${item.id}`)}
                                    >
                                        Add Reviews
                                    </button>
                                </span>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default HotelsPage;
