import React from "react";
import Header from "./header/header";
import "./main.css"
import ShowSomeThing from "./showSomeThing/showSomeThing";
import { MultipleItens } from "./item/item";
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
            <Header />
            <main>
                <ShowSomeThing title={"Artistas populares"} route={"/artists"} Elements={Artistas}/>
                <ShowSomeThing title={"Musicas populares"} route={"/musics"} Elements={Musicas}/>
            </main>
        </>
    ) 
}

export default Home;