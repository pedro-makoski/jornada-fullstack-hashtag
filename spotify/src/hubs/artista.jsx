import React, { useState } from "react";
import './artista.css'
import { songsArray } from "../assets/database/songs";
import { searchValuesWithThisValue } from "../utils/searchInList";
import { Link, useParams } from "react-router-dom"; 
import { artistArray } from "../assets/database/artists";

const HeaderArtista = ({imgPath, title}) => {
    return (
        <section style={{backgroundImage: `url("${imgPath}")`}} className="main__header">
            <h2>{title}</h2>
        </section>
    )
}

const MusicShowInline = ({cont, img, name, time, id, setCont, maxLength}) => {
    return(
        <li>
            <article>
                <Link to={`/musicas/${id}`}>
                    <div className="main__ol__li__img-place">
                        <p>{cont}</p>
                        <img src={img} alt={`Imagem da musica ${name}`}/>
                        <h3>{name}</h3>
                    </div>
                    <div>
                        <p>{time}</p>
                    </div>
                </Link>
            </article>
        </li>
    )
}

const MusicsShowInLineList = ({listMusics, artist, keyName}) => {
    const correspondents = searchValuesWithThisValue(listMusics, artist, keyName)

   return (
        <ol className="main__ol">
            {correspondents.map((musica, index) => (
                <MusicShowInline img={musica.image} name={musica.name} time={musica.duration} key={musica.id} id={musica.id} cont={index+1}/>
            ))}
        </ol>
   )
}


export const ArtistaPage = () => {
    const { id } = useParams()
    const obj = searchValuesWithThisValue(artistArray, parseInt(id), "id")[0]

    return (
        <>
            <main className="mainArtista">
                <HeaderArtista imgPath={obj.banner} title={obj.name}/>
                <div>
                    <MusicsShowInLineList listMusics={songsArray} artist={obj.name} keyName={"artist"}/>
                </div>
            </main>
        </>
    )
}