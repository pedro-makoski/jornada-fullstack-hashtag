import React, { useState } from "react";
import './artista.css'
import { URL } from "../assets/database/artists";
import axios from "axios";
import { Link, useParams } from "react-router-dom"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from "@tanstack/react-query";

const HeaderArtista = ({imgPath, title}) => {
    return (
        <section style={{backgroundImage: `url("${imgPath}")`}} className="main__header">
            <h2>{title}</h2>
        </section>
    )
}

const MusicShowInline = ({cont, image, name, duration, _id}) => {
    return(
        <li>
            <article>
                <Link to={`/songs/${_id}`}>
                    <div className="main__ol__li__img-place">
                        <p className="main__ol__li__img-place__cont">{cont}</p>
                        <div className="main__ol__li__img-place__img">
                            <img src={image} alt={`Imagem da musica ${name}`}/>
                            <h4>{name}</h4>
                        </div>
                    </div>
                    <div>
                        <p>{duration}</p>
                    </div>
                </Link>
            </article>
        </li>
    )
}

const MusicsShowInLineList = ({correspondents}) => {
    const [quantAppear, setQuantAppear] = useState(5)
    const [seeMore, setSeeMore] = useState(true)

    const addView = () => {
        let quantAppearNew = quantAppear+5;
        if(quantAppearNew === correspondents.length) {
            setSeeMore(false)
        }
        setQuantAppear(prev => prev+5);
    }
        

   return (
        <>
            <ol className="main__ol">
                {Array.from(correspondents).slice(0, quantAppear).map((musica, index) => (
                    <MusicShowInline  cont={index+1} {...musica}/>
                ))}
            </ol>
            {seeMore ? <button className="main__ol__see-more" onClick={addView}>Veja mais</button> : <></>}
        </>
   )
}

export const fetchData = (url) => {
    return async() => {
        const encodedURl = encodeURI(url) 
        const { data } = (await axios.get(encodedURl))
        return data
    }
} 


export const ArtistaPage = () => {
    const { id } = useParams()

    const { data, error, isLoading } = useQuery({
        queryKey: ["artists", id],
        queryFn:fetchData(`${URL}/artists/${id}`),
    })

    const songsQuery = useQuery({
        queryKey: ["songs", id],
        queryFn:fetchData(`${URL}/songsfromartist/${data?.name}`),
        enabled: !!data
    })

    if(isLoading) {
        return (
            <h1 className="carregando">Carregando</h1>
        )
    }

    if(error) {
        return (
            <h1 className="carregando">Problema ao encontrar os elementos</h1>
        )
    }

    if(songsQuery.isLoading) {
        return (
            <h1 className="carregando">Carregando</h1>
        )
    }

    if(songsQuery.error) {
        return (
            <h1 className="carregando">Problema ao encontrar os elementos</h1>
        )
    }

    const { name, banner } = data
    const correspondents = songsQuery.data

    return (
        <>
            <main className="mainArtista">
                <HeaderArtista imgPath={banner} title={name}/>
                <div className="mainArsta__musics">
                    <h3>Populares</h3>
                    <MusicsShowInLineList listMusics={correspondents} correspondents={correspondents}/>
                </div>
                <Link to={`/songs/${correspondents._id}`}>
                    <div className="fa-artist">
                        <FontAwesomeIcon icon={faCirclePlay} />
                    </div>
                </Link>
            </main>
        </>
    )
}