import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TvShowsApi from '../../api/tvshows'
import FavoritesApi from '../../api/favorites'
import MyContext from '../../context/index'

const ShowInfo = () => {
  const navigate = useNavigate();
  const { session_id, favorites } = useContext(MyContext);
  const params = useParams();
  const [favorite, setFavorite] = useState(false)
  const [data, setData] = useState(null)
  useEffect(() => {

    const makeReq = async () => {
      try {
        const req = await TvShowsApi.getShow(params.id);
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
    <div className='screen show-info-screen'>

      <div className="cover">
        {data?.video ?
          <div className='trailer'>
            { }
          </div>
          :
          <img src={`${process.env.REACT_APP_BACKEND_IMG_URL}/${data?.backdrop_path}`} alt="poster-img" className='cover-img' />
        }

      </div>
      <div className="show-wrapper">
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
            GO BACK
          </h1>
          <img className='img' alt='card-img' src={`${process.env.REACT_APP_BACKEND_IMG_URL}/${data?.poster_path}`} />
          {session_id
            && <div className={`favorite ${favorite ? 'added' : ""}`} onClick={async () => {
              if (favorite) {
                const res = await FavoritesApi.markFavorite('tv', data.id, session_id, false)
                setFavorite(false)
              } else {
                const res = await FavoritesApi.markFavorite('tv', data.id, session_id, true)
                setFavorite(true)
              }

            }}>{favorite ? "Remove From Favorites" : "Mark As Favorite"}</div>}

        </div>
        <div className="show-info">
          <div className="show-title">
            {data?.name}
          </div>
          <div className="show-overview">
            {data?.overview}
          </div>
          <div className="show-details">
            <div className="flex-left">
              <div className="release">
                <div className='info'>
                  First Air Date
                </div>
                <p>
                  {data?.first_air_date}
                </p>
                <div className="show-rating">
                  <div className='info'>show Rating</div>
                  <p>
                    {data?.vote_average}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-right">
              <div className="popularity">
                <div className="info">Popularity</div>
                <p>{data?.popularity}</p>
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

export default ShowInfo