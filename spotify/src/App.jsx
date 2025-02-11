import { Route, Routes, BrowserRouter} from 'react-router-dom'
import React from 'react'
import Home from './hubs/home'
import { SeeMore } from './Components/seeMoreItems/seeMore'
import { artistArray } from './assets/database/artists'
import { songsArray } from './assets/database/songs'
import { ArtistaPage } from './hubs/artista'
import Musica from './hubs/musica'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/artists' element={<SeeMore  whatIsConjunct={"artistas"} whatIsSingular={"artista"} borderRadiusImg={"100%"} list={artistArray} title={"Artistas populares"} subtitleStandart={"Artista"}/>} />
        <Route path='/musics' element={<SeeMore  whatIsConjunct={"musicas"} whatIsSingular={"musica"} borderRadiusImg={"15px"} list={songsArray} title={"Musicas populares"}/>}/>
        {artistArray.map((artista) => (
          <Route path={`/artistas/${artista.id}`} element={<ArtistaPage obj={artista}/>} key={artista.id}/>
        ))}
        {
          songsArray.map((song) => (
            <Route path={`/musicas/${song.id}`} element={<Musica obj={song} />} key={song.id}/>
          ))
        }
      </Routes>
    </BrowserRouter>
  )
}

export default App
