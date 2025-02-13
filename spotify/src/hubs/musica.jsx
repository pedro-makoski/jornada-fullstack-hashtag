import React, { useState } from "react";

import { searchValuesWithThisValue } from "../utils/searchInList";
import { artistArray } from "../assets/database/artists";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faBackwardStep, faForwardStep, faCirclePause} from '@fortawesome/free-solid-svg-icons'
import './musica.css'
import { Link, useParams } from "react-router-dom";
import { songsArray } from "../assets/database/songs";

const Musica = () => {
    const { id } = useParams()
    const { image, name, duration, artist } = searchValuesWithThisValue(songsArray, parseInt(id), "id")[0]
    const currentArtista = searchValuesWithThisValue(artistArray, artist, "name")
    const musicsFromArtista = searchValuesWithThisValue(songsArray, artist, "artist")
    const idArtista = currentArtista[0]["id"]
    const imageArtista = currentArtista[0]["image"]
    const [isPause, setIsPause] = useState(false)
    const [timeStamp, setTimeStamp] = useState('1:00')

    const togglePlay = () => {
        setIsPause(prev => !prev)
    }

    let nextMusic;
    let beforeMusic; 
    const idInt = Number(id)
    const posOfActualMusica = musicsFromArtista.findIndex((element) => element.id === idInt)
    if(posOfActualMusica === musicsFromArtista.length-1) {
        nextMusic = idInt-musicsFromArtista.length+1
    } else {
        nextMusic = idInt+1
    }

    if(posOfActualMusica === 0) {
        beforeMusic = idInt+musicsFromArtista.length-1
    } else {
        beforeMusic = idInt-1 
    }
    
    nextMusic = `/songs/${nextMusic}`
    beforeMusic = `/songs/${beforeMusic}`

    return (
        <>
            <main className="main-music">
                <section className="main-music--music">
                    <img src={image} />
                </section>
                <section className="main-music__infos">
                    <div className="main-music__infos__autor-for-image">
                        <Link to={`/artists/${idArtista}`} className="main-music__infos__autor-for-image__link">
                            <img src={imageArtista} className="main-music__infos__image-author"/>
                        </Link>
                    </div>
                    <div className="main-music__infos__time">
                        <div className="main-music__infos__buttons">
                            <Link className="button-control" to={beforeMusic}>
                                <FontAwesomeIcon icon={faBackwardStep} className="fa"/>
                            </Link>
                            <button className="button-control" onClick={togglePlay}> 
                                <FontAwesomeIcon icon={isPause ? faCirclePause : faCirclePlay} className="fa"/>
                            </button>
                            <Link className="button-control" to={nextMusic}>
                                <FontAwesomeIcon icon={faForwardStep} className="fa"/>
                            </Link>
                        </div>
                        <div className="main--music__infos-time-view">
                            <p>{timeStamp}</p>
                            <div className="progress-place">
                                <span className="progress-place__total"></span>
                                <span className="progress-place__progress"></span>
                            </div>
                            <p>{duration}</p>
                        </div>
                    </div>
                    <div className="main--music__autor-infos">
                        <h2>{name}</h2>
                        <p>{artist}</p>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Musica;