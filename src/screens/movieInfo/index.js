import React, { useEffect, useState, useContext } from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import MoviesApi from '../../api/movies'
import FavoritesApi from '../../api/favorites'
import MyContext from '../../context/index'

const MovieInfo = () => {
  const navigate = useNavigate();
  const { session_id, favorites,setFavorites,setData} = useContext(MyContext);
  const params = useParams();
  const [favorite, setFavorite] = useState(false)
  const [movieData, setMovieData] = useState(null)

  useEffect(() => {

    const makeReq = async () => {
      try {
        const req = await MoviesApi.getMovie(params.id);
        setMovieData(req.data)
      } catch (err) {
        console.log(err)
      }
    }

    if (!movieData)
      makeReq()
    else {
      if (favorites.includes(movieData.id)) {
        setFavorite(true)
      }
    }
  }, [movieData])

  return (
    <div className='screen movie-info-screen'>

      <div className="cover">
        {movieData?.video ?
          <div className='trailer'>
            {
              //video here
            }
          </div>
          :
          <img src={`${process.env.REACT_APP_BACKEND_IMG_URL}/${movieData?.backdrop_path}`} alt="poster-img" className='cover-img' />
        }

      </div>
      <div className="movie-wrapper">
        <div className="img-wrapper">
        <h1
            onClick={() => {
              navigate('/', {
                state:
                {
                  persist: true,
                  used:false
                }
              })
            }}>
            Go Back
          </h1>
          <img className='img' alt='card-img' src={`${process.env.REACT_APP_BACKEND_IMG_URL}/${movieData?.poster_path}`} />
          {session_id
            && <div className={`favorite ${favorite ? 'added' : ""}`} onClick={async () => {
              if (favorite) {
                const res = await FavoritesApi.markFavorite('movie', movieData.id, session_id, false)
                setFavorite(false)
                // console.log(movieData.id);
                setData((data)=>{
                  console.log(data);
                  const arr= data.filter((movie)=>{
                    console.log(movie);
                    return movie.id!=movieData.id
                  })
                  console.log("Nova movieData:",arr);
                  return arr
                })
              } else {
                const res = await FavoritesApi.markFavorite('movie', movieData.id, session_id, true)
                setFavorites((favorites)=>{return [...favorites,movieData.id]})
                setFavorite(true)
              }

            }}>{favorite ? "Remove From Favorites" : "Mark As Favorite"}</div>}

        </div>
        <div className="movie-info">
          <div className="movie-title">
            {movieData?.title}
          </div>
          <div className="movie-overview">
            {movieData?.overview}
          </div>
          <div className="movie-details">
            <div className="flex-left">
              <div className="release">
                <div className='info'>
                  Release Date
                </div>
                <p>
                  {movieData?.release_date}
                </p>
                <div className="movie-rating">
                  <div className='info'>Movie Rating</div>
                  <p>
                    {movieData?.vote_average}
                  </p>
                </div>
              </div>
              <div className="popularity">
                <div className="info">Popularity</div>
                <p>{movieData?.popularity}</p>
              </div>
            </div>
            <div className="flex-right">
              <div className="budget">
                <div className='info'>Budget</div>
                <p>${movieData?.revenue?.toLocaleString()}</p>
              </div>
              <div className="time">
                <div className='info'>Running time</div>
                <p>{movieData?.runtime}</p>
              </div>
              <div className="genres-wrapper">
                <div className='info'>Genres:</div>
                <p className="genres">
                  {movieData?.genres?.map((genre) => {
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