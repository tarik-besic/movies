import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MoviesApi from '../../api/movies'
import Star from "../../assets/images/star.png"

const MovieInfo = () => {
  const params = useParams();
  const [data, setData] = useState([])

  useEffect(() => {

    const makeReq = async () => {
      try {
        const req = await MoviesApi.getMovie(params.id);
        setData(req.data)
      } catch (err) {
        console.log(err)
      }
    }

    makeReq()
    return () => {

    }
  }, [])
  console.log(data);
  return (
    <div className='screen movie-info-screen'>

      <div className="cover">
        {data?.video ?
          <div className='trailer'>
            { }
          </div>
          :
          <img src={`${process.env.REACT_APP_BACKEND_IMG_URL}/${data?.backdrop_path}`} alt="poster-img" className='cover-img' />
        }
      </div>
      <div className="movie-wrapper">
        <div className="movie" >
          <img className='img' alt='card-img' src={`${process.env.REACT_APP_BACKEND_IMG_URL}/${data?.poster_path}`} />
        </div>
        <div className="movie-info">
          <div className="movie-title">
            {data?.title}
          </div>
          <div className="movie-overview">
            {data?.overview}
          </div>
          <div className="movie-details">
            <div className="flex-left">
              <div className="release">
                <div className='info'>
                  Release Date
                </div>
                <p>
                  {data?.release_date}
                </p>
                <div className="movie-rating">
                  <div className='info'>Movie Rating</div>
                  <p>
                    {data?.vote_average}
                  </p>
                </div>
              </div>
              <div className="popularity">
                <div className="info">Popularity</div>
                <p>{data.popularity}</p>
              </div>
            </div>
            <div className="flex-right">
              <div className="budget">
                <div className='info'>Budget</div>
                <p>${data?.revenue?.toLocaleString()}</p>
              </div>
              <div className="time">
                <div className='info'>Running time</div>
                <p>{data?.runtime}</p>
              </div>
              <div className="genres-wrapper">
                <div className='info'>Genres:</div>
                <p className="genres">
                  {data?.genres?.map((genre) => {
                    return <span className='genre' key={genre.id}>
                      {genre.name}
                    </span>
                  })}
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div >
  )
}

export default MovieInfo