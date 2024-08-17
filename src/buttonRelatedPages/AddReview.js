import React, { useEffect, useState, useCallback } from "react";
import "../css/addReview.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddReviewPage = () => {
    const [review, setReview] = useState("");
    const [data, setData] = useState([]);
    const params = useParams();

    const reviewChangeHandler = (event) => {
        setReview(event.target.value);
    };

    const storeHandler = useCallback(async () => {
        try {
            const storeResponse = await axios.get(`http://localhost:4001/hotels/${parseInt(params.addReviewHotelId)}`);
            const currentReviews = storeResponse.data.reviews;
            setData(currentReviews);
        } catch (error) {
            console.log("Error in storage handler:", error);
        }
    }, [params.addReviewHotelId]);

    useEffect(() => {
        storeHandler();
    }, [storeHandler]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Removed the unused 'response' variable
            await axios.patch(`http://localhost:4001/hotels/${parseInt(params.addReviewHotelId)}`, {
                reviews: [...data, review],
            });
            alert("Review Added Successfully, Thanks for the feedback.");
            setReview("");
        } catch (error) {
            console.log("Error adding review:", error);
        }
    };

    return (
        <>
            <div className="addReview-container">
                <div className="addReview-addReviewBox">
                    <h2 className="reviewBox-name">Add Your Review Here:</h2>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            className="input-block"
                            type="textArea"
                            id="addReview"
                            name="addReview"
                            placeholder="Write Review:"
                            value={review}
                            onChange={reviewChangeHandler}
                            autoComplete="off"
                            required
                        />
                        <button type="submit" className="addReview-Button">Add Review</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddReviewPage;
