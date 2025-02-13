import React from "react";  
import "./main.css"
import ShowSomeThing from "../Components/showSomeThing/showSomeThing";
import { MultipleItens } from "../Components/item/item";
import { artistArray } from "../assets/database/artists";
import {songsArray} from  "../assets/database/songs"

const artists = () => {
    return <MultipleItens list={artistArray} whatIsConjunct={"artists"} whatIsSingular={"artista"} sliceQuantList={10} borderRadiusImg={"100%"} subtitleStandart={"Artista"}/>
}
const songs = () => {
    return <MultipleItens list={songsArray} whatIsConjunct={"songs"} whatIsSingular={"musica"} sliceQuantList={20} borderRadiusImg={"15px"}/>
}

const Home = () => {
    return (
        <>
            <main>
                <ShowSomeThing title={"artists populares"} route={"/artists"} Elements={artists} showSeeMore={true}/>
                <ShowSomeThing title={"songs populares"} route={"/musics"} Elements={songs} showSeeMore={true}/>
            </main>
        </>
    ) 
}

export default Home;