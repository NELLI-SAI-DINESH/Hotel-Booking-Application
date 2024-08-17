import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/viewReview.css";

const ViewReviewPage = () => {
    //const [data, setData]=useState([]);
    const [reviews, setReview]=useState([])
    //const currentUrl=window.location.pathname;
    const params=useParams();

    console.log(reviews);
    const retriveReviewData = async() =>{
    const response=await axios.get("http://localhost:4001/hotels");
    // setData(response.data);
    const reqHotel=response?.data?.find(hotel => hotel.id===parseInt(params.hotelId));
    //console.log("reqHotel= ",reqHotel);
    if(reqHotel){
        if(reqHotel?.reviews.length!=0){
        setReview(reqHotel?.reviews);
        } else {
        //console.log("no review");
        setReview(["No Reviews Avaliable for this Hotel "])

        }
    }
    else{
        console.log("haii in else")
        
    }
};

    useEffect(() => {
        retriveReviewData();
    }, [])

    return (
        <>
               
               <div className="viewReview-container">
                <h1 className="reviewPage-title">View Reviews Here</h1>

                        <ul className="viewReview-reviewBox">
                            {reviews?.map(item => (
                                <li><h3>{item}</h3></li>
                            ))}
                        </ul>
               </div>
        </>
    );
};

export default ViewReviewPage;

    


