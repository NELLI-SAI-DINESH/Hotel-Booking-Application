import React from "react";
import {useNavigate} from "react-router-dom";
import "../css/dashBoard.css"

const DashboardPage = () => {
    //const navigate = useNavigate();
    return(
        <>
            <div className="dashboard-container">

                <h1 className="dashboard-welcomeMsg">Welcome to DINESH STAY
                    <h3 className="dashboard-welcomeMsg">We always provides you an amazing and pleasent STAY
                        <br/>With your friends and familyat reasonable prices.
                        <br/>We provide well-designed space with modern amenities.
                        <br/>you can reserve a room faster with our efficient DINESH STAY app
                        <br/>Enjoy your stay.
                    </h3>
                </h1>

            </div>

            {/* <button onClick={() => navigate(-1)}> Logout </button> */}
        </>
    );
}

export default DashboardPage;