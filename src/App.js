import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./screens/home"
import MovieInfo from "./screens/movieInfo/index"
import ShowInfo from "./screens/showInfo/index"
import Login from "./screens/login/index"

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/movie/:id' element={<MovieInfo />} />
          <Route path='/show/:id' element={<ShowInfo />} />
          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
} 

export default App;
