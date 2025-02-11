import { Route, Routes, BrowserRouter} from 'react-router-dom'
import React from 'react'
import Home from './Components/home'
import { SeeMore } from './Components/seeMoreItems/seeMore'
import { artistArray } from './assets/database/artists'
import { songsArray } from './assets/database/songs'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/artists' element={<SeeMore  whatIsConjunct={"artistas"} whatIsSingular={"artista"} borderRadiusImg={"100%"} list={artistArray} title={"Artistas populares"} subtitleStandart={"Artista"}/>} />
        <Route path='/musics' element={<SeeMore  whatIsConjunct={"musicas"} whatIsSingular={"musica"} borderRadiusImg={"15px"} list={songsArray} title={"Musicas populares"}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
