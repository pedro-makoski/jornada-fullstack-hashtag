import { Route, Routes, BrowserRouter} from 'react-router-dom'
import React from 'react'
import Home from './hubs/home'
import { SeeMore } from './Components/seeMoreItems/seeMore'
import { artistArray } from './assets/database/artists'
import { songsArray } from './assets/database/songs'
import { ArtistaPage } from './hubs/artista'
import Musica from './hubs/musica'
import Header from './Components/header/header'

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/artists' element={<SeeMore  whatIsConjunct={"artists"} whatIsSingular={"artista"} borderRadiusImg={"100%"} list={artistArray} title={"artistas populares"} subtitleStandart={"Artista"}/>} />
        <Route path='/musics' element={<SeeMore  whatIsConjunct={"songs"} whatIsSingular={"musica"} borderRadiusImg={"15px"} list={songsArray} title={"Musicas populares"}/>}/>
        <Route path={`/artists/:id`} element={<ArtistaPage />}/>
        <Route path={`/songs/:id`} element={<Musica />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
