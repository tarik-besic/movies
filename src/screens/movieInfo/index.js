import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import MoviesApi from '../../api/movies'
import FavoritesApi from '../../api/favorites'
import Star from "../../assets/images/star.png"
import Heart from "../../assets/images/heart.png"
import MyContext from '../../context/index'

const MovieInfo = () => {
  const { session_id, favorites } = useContext(MyContext);
  const params = useParams();
  const [favorite, setFavorite] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {

    const makeReq = async () => {
      try {
        const req = await MoviesApi.getMovie(params.id);
        setData(req.data)
      } catch (err) {
        console.log(err)
      }
    }

    if (!data)
      makeReq()
    else {
      if (favorites.includes(data.id)) {
        setFavorite(true)
      }
    }
  }, [data])

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
        <div className="img-wrapper">
          <img className='img' alt='card-img' src={`${process.env.REACT_APP_BACKEND_IMG_URL}/${data?.poster_path}`} />
          {session_id
            && <div className={`favorite ${favorite ? 'added' : ""}`} onClick={async () => {
              if (favorite) {
                const res = await FavoritesApi.markFavorite('movie', data.id, session_id, false)
                setFavorite(false)
              } else {
                const res = await FavoritesApi.markFavorite('movie', data.id, session_id, true)
                setFavorite(true)
              }

            }}>{favorite ? "Remove From Favorites" : "Mark As Favorite"}</div>}

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
                <p>{data?.popularity}</p>
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