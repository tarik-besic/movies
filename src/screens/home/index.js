import React, { useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Card from '../../components/card'
import MoviesApi from "../../api/movies"
import TvShowsApi from '../../api/tvshows'
import SearchApi from '../../api/search'
import MyContext from '../../context/index'
import FavoritesApi from '../../api/favorites'
import SearchImg from "../../assets/images/search.png"

const Home = () => {
  const navigate = useNavigate();
  const state = useLocation();
  const { session_id, logout, select, setSelect, option, setOption, data, setData, inputRef } = useContext(MyContext);

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
      switch (select) {
        case 1:
          FavoritesApi.getFavorites('movies', session_id, append)
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
          FavoritesApi.getFavorites('tv', session_id, append)
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
    
  if(state.state){
    if(state.state.persist){
      console.log(state.state.persist);
      return;
    }
    setData([])
  }
  }, [])
  

  useEffect(() => {
    console.log("Making request");
    if (option === "movies")
      MoviesApi.page = 1;
    else if (option === "shows")
      TvShowsApi.page = 1;
    else
      FavoritesApi.page = 1;
    if (state.state) {
      if (state.state.persist === true) {
        return;
      }
    }
    makeRequest();
  }, [select])

  useEffect(() => {
    if (state.state) {
      if (state.state.persist === true) {
        state.state.persist = false;
        return;
      }
    }
    //in favorites it would crash since there is no search
    if (inputRef.current) {
      inputRef.current.value = ""
      SearchApi.page = 1;
    }
    console.log("Opet idem da fetcham");
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
      FavoritesApi.getFavorites('movies', session_id).then((res) => { setData(res.data.results) }).catch((err) => { console.log(err) })
    }
  }, [option])

  return (
    <div className='screen home-screen'>
      <div className='header'>
        <div className="links">
          <div className={`header-link ${option === "movies" ? "active" : ''}`} onClick={() => {
            setOption("movies")
          }}>Movies</div>
          <div className={`header-link ${option === "shows" ? "active" : ''}`} onClick={() => {
            setOption("shows")
          }}>Tv Shows</div>
          {session_id
            && <div
              className={`header-link ${option === "favorites" ? "active" : ''}`}
              onClick={() => setOption("favorites")}>
              Favorites
            </div>
          }
        </div>
        {session_id
          ? <div className="header-link red" onClick={logout}>Logout</div>
          : <div className="header-link green" onClick={() => { navigate("/login") }}>Login</div>
        }
      </div>
      <div className="tabbar">
        {option === "movies" ? renderMovieOptions() : option === "shows" ? renderShowOptions() : session_id && renderFavoritesOptions()}

        {option !== "favorites"
          && <div className='input-wrapper'>
            <input type="text"
              onChange={(ev) => {
                inputRef.current.value = ev.target.value;
                inputRef.current.lastValue = ev.target.value;
              }}
              placeholder="Search..."
              ref={inputRef.current.input}
              defaultValue={inputRef.current.lastValue}
            />

            <div className='img-wrapper'>
              <img src={SearchImg} onClick={async () => {
                if (inputRef.current.value == "") return;

                try {
                  const req = await SearchApi.getMedia(inputRef.current.value, option);
                  setData(req.data.results)
                  // console.log(req);
                } catch (error) {
                  console.log(error);
                }
              }} />
            </div>
          </div>
        }
      </div>

      <div className="content">
        {data.map((item, id) => {
          return <Card data={item} key={id} />
        })}
      </div>
      <div className="load">
        <div
          className='btn-load'
          onClick={async () => {
            if (option == "favorites") {
              FavoritesApi.page += 1;
              makeRequest(true)
            } else if (option === "movies") {
              MoviesApi.page += 1;
            } else {
              TvShowsApi.page += 1;
            }
            if (inputRef.current?.value == "")
              makeRequest(true)
            else {
              SearchApi.page += 1;
              try {
                console.log("SENDAM DATA:", {
                  query: inputRef.current.value,
                  option,
                  append: true
                });
                const req = await SearchApi.getMedia(inputRef.current.value, option, true);
                setData((data) => {
                  let newData = [...data]
                  Array.prototype.push.apply(newData, req.data.results);
                  return newData;
                })
              } catch (error) {
                console.log(error);
              }
            }
          }}
        >
          Load More..
        </div>
      </div>
    </div>
  )
}

export default Home;