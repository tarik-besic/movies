import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/card'
import MoviesApi from "../../api/movies"
import TvShowsApi from '../../api/tvshows'

const Home = () => {
  const navigate = useNavigate();
  const [select, setSelect] = useState(1);
  // const [append, setAppend] = useState(false)
  const [option, setOption] = useState("movies");
  const [data, setData] = useState([])

  const makeRequest = (append = false) => {
    if (option === "movies") {
      switch (select) {
        case 1:
          MoviesApi.getNowPlaying()
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
          MoviesApi.getPopular().then((res) => {
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
          MoviesApi.getTopRated().then((res) => {
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
          MoviesApi.getUpcoming().then((res) => {
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
    } else {
      switch (select) {
        case 2:
          TvShowsApi.getPopular()
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
          TvShowsApi.getTopRated().then((res) => {
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
          TvShowsApi.getOnTheAir().then((res) => {
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
  useEffect(() => {
    if (option === "movies") {
      MoviesApi.getNowPlaying().then((res) => { setData(res.data.results) }).catch((err) => { console.log(err) })
      setSelect(1)
    }
    else {
      setSelect(2)
      TvShowsApi.getPopular().then((res) => { setData(res.data.results) }).catch((err) => { console.log(err) })
    }
  }, [option])

  useEffect(() => {
    console.log("select effect");
    makeRequest();

  }, [select])
  useEffect(() => {
    console.log("DATA", data);

  }, [data])


  return (
    <div className='screen home-screen'>
      <div className='header'>
        <div className="links">
          <div className={`movies ${option === "movies" ? "active" : ''}`} onClick={() => setOption("movies")}>Movies</div>
          <div className={`tv-shows ${option === "shows" ? "active" : ''}`} onClick={() => setOption("shows")}>Tv Shows</div>
        </div>

        <div className="login" onClick={() => { navigate("/login") }}>Login</div>
        {/* <div className="login">Login</div>
        <div className="logout">Logout</div> */}
      </div>
      <div className="tabbar">
        {option === "movies" ? renderMovieOptions() : renderShowOptions()}
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