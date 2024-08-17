import React, {useEffect, useState} from "react";
import '../css/NavBar.css';
import { useNavigate, useLocation } from "react-router-dom";

const NavBar = () => {

    const[isLogIn, setIsLogin]=useState(false);
    //const isLogIn = sessionStorage.getItem("isLoggedIn");
    //console.log(isLogIn, 'hai');
    const navigate = useNavigate();

    const currentUrl = window.location.pathname;
    //console.log(currentUrl);

    useEffect(() =>{
        if(currentUrl=== ("/dashboardPage" || "/hotelsPage" || "/bookingsPage")) {
            setIsLogin(true);
        }
    }, [currentUrl]);

    return (
        <nav>
            <div className="navbar">
                <div className="navbar-left">
                    <span className="app-name">DINESH STAY</span>
                </div>

                <div className="navbar-right">
                    <nav className="nav-links">
                        {isLogIn && <li><button className="button" onClick={() => navigate('/dashboardPage')}>Home</button></li>}
                        {isLogIn && <li><button className="button" onClick={() => navigate('/hotelsPage')}>Hotels</button></li>}
                        {isLogIn && <li><button className="button" onClick={() => navigate('/bookingsPage')}>Bookings</button></li>}
                        {isLogIn && <li><button className="button" onClick={() => navigate('/')}>Logout</button></li>}
                    </nav>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;