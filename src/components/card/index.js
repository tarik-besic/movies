import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Star from "../../assets/images/star.png"

const Card = ({ data }) => {
    if(data.video)
    console.log(data);
    // else console.log("nista");
    const navigate = useNavigate();
    return (
        <div className='card-wrapper'
            onClick={() => {
                //if data has title its movie else tv show
                if (data.title) {
                    navigate(`/movie/${data.id}`)
                    return;
                }

                navigate(`/show/${data.id}`)
            }}>
            <div className="card" >
                <div className="img-wrapper">
                    <img className='img' alt='card-img' src={`${process.env.REACT_APP_BACKEND_IMG_URL}/${data?.poster_path}`} />
                    <div className="reviews"
                        style={{ color: data?.vote_average > 6.5 ? "#01d277" : "#D72323" }}>
                        <img src={Star} alt="star" className='star' />
                        {data?.vote_average}
                    </div>
                </div>
                <div className="card-details">
                    <div className="title">
                        {data.title ? data.title : data.name}

                        {data.release_date &&
                            <div className="year">
                                ({new Date(data.release_date).getFullYear()})
                            </div>}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Card