import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./screens/home"
import MovieInfo from "./screens/movieInfo/index"
import ShowInfo from "./screens/showInfo/index"
import Login from "./screens/login/login"
import { ContextProvider } from "./context"

const App = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/movie/:id' element={<MovieInfo />} />
          <Route path='/show/:id' element={<ShowInfo />} />
          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
