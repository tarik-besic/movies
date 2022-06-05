import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/card'
import MoviesApi from "../../api/movies"
import TvShowsApi from '../../api/tvshows'
import MyContext from '../../context/index'
import FavoritesApi from '../../api/favorites'

const Home = () => {
  const navigate = useNavigate();
  const { session_id, logout } = useContext(MyContext);
  // console.log(context)
  const [select, setSelect] = useState(1);
  const [option, setOption] = useState("movies");
  const [data, setData] = useState([])

  const makeRequest = (append = false) => {
    if (option === "movies") {
      switch (select) {
        case 1:
          MoviesApi.getNowPlaying(append)
            .then((res) => {
              setData((data) => {
                if (append) {
                  let newData = [...data]
                  Array.prototype.push.apply(newData, res.data.results);
                  return newData;
                }
                return res.data.results

              })
            }).catch((err) => { console.log(err) })
          break;

        case 2:
          MoviesApi.getPopular(append).then((res) => {
            setData((data) => {
              if (append) {
                let newData = [...data]
                Array.prototype.push.apply(newData, res.data.results);
                return newData;
              }
              return res.data.results

            })
          }).catch((err) => { console.log(err) })
          break;

        case 3:
          MoviesApi.getTopRated(append).then((res) => {
            setData((data) => {
              if (append) {
                let newData = [...data]
                Array.prototype.push.apply(newData, res.data.results);
                return newData;
              }
              return res.data.results
            })
          }).catch((err) => { console.log(err) })
          break;

        case 4:
          MoviesApi.getUpcoming(append).then((res) => {
            setData((data) => {
              if (append) {
                let newData = [...data]
                Array.prototype.push.apply(newData, res.data.results);
                return newData;
              }
              return res.data.results
            })
          }).catch((err) => { console.log(err) })
          break;
      }
    } else if (option === "shows") {
      switch (select) {
        case 2:
          TvShowsApi.getPopular(append)
            .then((res) => {
              setData((data) => {
                if (append) {
                  let newData = [...data]
                  Array.prototype.push.apply(newData, res.data.results);
                  return newData;
                }
                return res.data.results
              })
            }).catch((err) => { console.log(err) })
          break;
        case 3:
          TvShowsApi.getTopRated(append).then((res) => {
            setData((data) => {
              if (append) {
                let newData = [...data]
                Array.prototype.push.apply(newData, res.data.results);
                return newData;
              }
              return res.data.results
            })
          }).catch((err) => { console.log(err) })
          break;
        case 4:
          TvShowsApi.getOnTheAir(append).then((res) => {
            setData((data) => {
              if (append) {
                let newData = [...data]
                Array.prototype.push.apply(newData, res.data.results);
                return newData;
              }
              return res.data.results
            })
          }).catch((err) => { console.log(err) })
          break;
      }
    }
    else {
      FavoritesApi.get(session_id)
    }
  }

  const renderMovieOptions = () => {
    return <>
      <div className={`link ${select === 1 ? `active` : ''}`}
        onClick={() => {
          setSelect(1)
        }}>
        Now Playing
      </div>
      <div className={`link ${select === 2 ? `active` : ''}`}
        onClick={() => {
          setSelect(2)
        }}>
        Popular
      </div>

      <div className={`link ${select === 3 ? `active` : ''}`}
        onClick={() => {
          setSelect(3)
        }}>
        Top Rated
      </div>
      <div className={`link ${select === 4 ? `active` : ''}`}
        onClick={() => {
          setSelect(4)
        }}>
        Upcoming
      </div>
    </>
  }

  const renderShowOptions = () => {
    return <>
      <div className={`link ${select === 2 ? `active` : ''}`}
        onClick={() => {
          setSelect(2)
        }}>
        Popular
      </div>
      <div className={`link ${select === 3 ? `active` : ''}`}
        onClick={() => {
          setSelect(3)
        }}>
        Top Rated
      </div>
      <div className={`link ${select === 4 ? `active` : ''}`}
        onClick={() => {
          setSelect(4)
        }}>
        On The Air
      </div>
    </>
  }
  const renderFavoritesOptions = () => {
    return <>
      <div className={`link ${select === 1 ? `active` : ''}`}
        onClick={() => {
          setSelect(1)
        }}>
        Movies
      </div>
      <div className={`link ${select === 2 ? `active` : ''}`}
        onClick={() => {
          setSelect(2)
        }}>
        Tv Shows
      </div>
    </>
  }
  useEffect(() => {
    if (option === "movies") {
      MoviesApi.getNowPlaying().then((res) => { setData(res.data.results) }).catch((err) => { console.log(err) })
      setSelect(1)
    }
    else if (option === "shows") {
      setSelect(2)
      TvShowsApi.getPopular().then((res) => { setData(res.data.results) }).catch((err) => { console.log(err) })
    }
    else {
      setSelect(1);
      FavoritesApi.getFavorites('movies',session_id).then((res) => { setData(res.data.results) }).catch((err) => { console.log(err) })
    }
  }, [option])

  useEffect(() => {
    console.log("select effect");
    if (option === "movies")
      MoviesApi.page = 1;
    else if (option === "shows")
      TvShowsApi.page = 1;
    else
      console.log("Favorites page 1")
    makeRequest();
  }, [select])

  return (
    <div className='screen home-screen'>
      <div className='header'>
        <div className="links">
          <div className={`header-link ${option === "movies" ? "active" : ''}`} onClick={() => setOption("movies")}>Movies</div>
          <div className={`header-link ${option === "shows" ? "active" : ''}`} onClick={() => setOption("shows")}>Tv Shows</div>
          {session_id
            && <div
              className={`header-link ${option === "favorites" ? "active" : ''}`}
              onClick={() => setOption("favorites")}>
              Favorites
            </div>
          }
        </div>

        <h5 style={{ color: "#fff" }}>{session_id}</h5>
        {session_id
          ? <div className="btn-red" onClick={logout}>Logout</div>
          : <div className="btn" onClick={() => { navigate("/login") }}>Login</div>
        }
      </div>
      <div className="tabbar">
        {option === "movies" ? renderMovieOptions() : option==="shows" ? renderShowOptions() : session_id && renderFavoritesOptions()}
      </div>

      <div className="content">
        {data.map((item, id) => {
          return <Card data={item} key={id} />
        })}
      </div>
      <div className="load" onClick={() => {
        if (option === "movies") {
          MoviesApi.page += 1;
        } else {
          TvShowsApi.page += 1;
        }
        makeRequest(true)
      }}>
        Load More..
      </div>
    </div>
  )
}

export default Home;