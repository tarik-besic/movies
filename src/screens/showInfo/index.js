import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TvShowsApi from '../../api/tvshows'
import FavoritesApi from '../../api/favorites'
import MyContext from '../../context/index'

const ShowInfo = () => {
  const navigate = useNavigate();
  const { session_id, favorites,setFavorites,setData } = useContext(MyContext);
  const params = useParams();
  const [favorite, setFavorite] = useState(false)
  const [ShowData, setShowData] = useState(null)
  useEffect(() => {

    const makeReq = async () => {
      try {
        const req = await TvShowsApi.getShow(params.id);
        setShowData(req.data)
      } catch (err) {
        console.log(err)
      }
    }

    if (!ShowData)
      makeReq()
    else {
      if (favorites.includes(ShowData.id)) {
        setFavorite(true)
      }
    }
  }, [ShowData])

  console.log(ShowData);
  return (
    <div className='screen show-info-screen'>

      <div className="cover">
        {ShowData?.video ?
          <div className='trailer'>
            { }
          </div>
          :
          <img src={`${process.env.REACT_APP_BACKEND_IMG_URL}/${ShowData?.backdrop_path}`} alt="poster-img" className='cover-img' />
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
          <img className='img' alt='card-img' src={`${process.env.REACT_APP_BACKEND_IMG_URL}/${ShowData?.poster_path}`} />
          {session_id
            && <div className={`favorite ${favorite ? 'added' : ""}`} onClick={async () => {
              if (favorite) {
                const res = await FavoritesApi.markFavorite('tv', ShowData.id, session_id, false)
                setFavorite(false)
                setData((data)=>{
                  const arr= data.filter((show)=>{
                    console.log(show);
                    return show.id!=ShowData.id
                  })
                  console.log("Nova showData:",arr);
                  return arr
                })
              } else {
                const res = await FavoritesApi.markFavorite('tv', ShowData.id, session_id, true)
                setFavorites((favorites)=>{return [...favorites,ShowData.id]})
                setFavorite(true)
              }

            }}>{favorite ? "Remove From Favorites" : "Mark As Favorite"}</div>}

        </div>
        <div className="show-info">
          <div className="show-title">
            {ShowData?.name}
          </div>
          <div className="show-overview">
            {ShowData?.overview}
          </div>
          <div className="show-details">
            <div className="flex-left">
              <div className="release">
                <div className='info'>
                  First Air Date
                </div>
                <p>
                  {ShowData?.first_air_date}
                </p>
                <div className="show-rating">
                  <div className='info'>show Rating</div>
                  <p>
                    {ShowData?.vote_average}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-right">
              <div className="popularity">
                <div className="info">Popularity</div>
                <p>{ShowData?.popularity}</p>
              </div>
              <div className="genres-wrapper">
                <div className='info'>Genres:</div>
                <p className="genres">
                  {ShowData?.genres?.map((genre) => {
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