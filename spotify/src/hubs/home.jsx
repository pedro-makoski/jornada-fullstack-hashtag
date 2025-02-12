import React from "react";  
import "./main.css"
import ShowSomeThing from "../Components/showSomeThing/showSomeThing";
import { MultipleItens } from "../Components/item/item";
import { artistArray } from "../assets/database/artists";
import {songsArray} from  "../assets/database/songs"

const Artistas = () => {
    return <MultipleItens list={artistArray} whatIsConjunct={"artistas"} whatIsSingular={"artista"} sliceQuantList={10} borderRadiusImg={"100%"} subtitleStandart={"Artista"}/>
}
const Musicas = () => {
    return <MultipleItens list={songsArray} whatIsConjunct={"musicas"} whatIsSingular={"musica"} sliceQuantList={20} borderRadiusImg={"15px"}/>
}

const Home = () => {
    return (
        <>
            <main>
                <ShowSomeThing title={"Artistas populares"} route={"/artists"} Elements={Artistas} showSeeMore={true}/>
                <ShowSomeThing title={"Musicas populares"} route={"/musics"} Elements={Musicas} showSeeMore={true}/>
            </main>
        </>
    ) 
}

export default Home;