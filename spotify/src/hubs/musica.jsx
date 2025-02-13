import React, { useEffect, useRef, useState } from "react";

import { searchValuesWithThisValue } from "../utils/searchInList";
import { artistArray } from "../assets/database/artists";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faBackwardStep, faForwardStep, faCirclePause, prefix} from '@fortawesome/free-solid-svg-icons'
import './musica.css'
import { Link, useParams } from "react-router-dom";
import { songsArray } from "../assets/database/songs";

const Musica = () => {
    const { id } = useParams()
    const { image, name, duration, artist, audio } = searchValuesWithThisValue(songsArray, parseInt(id), "id")[0]
    const currentArtista = searchValuesWithThisValue(artistArray, artist, "name")
    const musicsFromArtista = searchValuesWithThisValue(songsArray, artist, "artist")
    const idArtista = currentArtista[0]["id"]
    const imageArtista = currentArtista[0]["image"]
    const [isPause, setIsPause] = useState(true)
    const [timeStamp, setTimeStamp] = useState('00:00')

    const [minutes, seconds] = [parseInt(duration.slice(0, 2)),parseInt(duration.slice(4, 6))]
    const duratioNumberTotalMinutes = minutes*60+seconds/60

    const audioElement = useRef(null)

    const togglePlay = () => {
        let isPauseNew = !isPause
        if(isPauseNew) {
            audioElement.current.pause()
        } else {
            audioElement.current.play()
        }
        setIsPause(isPauseNew)
    }

    const progress = useRef(null)

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

    useEffect(() => {
        setIsPause(true)
    }, [id])

    const timeUpdate = () => {
        if(audioElement.current && progress.current) {
            const actualTime = audioElement.current.currentTime;
            const minutos = Math.floor(actualTime/60)
            const segundos = Math.floor(actualTime%60)

            setTimeStamp(`${minutos.toString().padStart(2, 0)}:${segundos.toString().padStart(2, 0)}`)
            const percent = `${(actualTime/duratioNumberTotalMinutes)*100}%`
            progress.current.style.setProperty("--_progress", percent)
        }
    }

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
                                <FontAwesomeIcon icon={isPause ? faCirclePlay : faCirclePause} className="fa"/>
                            </button>
                            <Link className="button-control" to={nextMusic}>
                                <FontAwesomeIcon icon={faForwardStep} className="fa"/>
                            </Link>
                        </div>
                        <div className="main--music__infos-time-view">
                            <p>{timeStamp}</p>
                            <div className="progress-place">
                                <span className="progress-place__total"></span>
                                <span className="progress-place__progress" ref={progress}></span>
                            </div>
                            <p>{duration}</p>
                        </div>
                    </div>
                    <div className="main--music__autor-infos">
                        <h2>{name}</h2>
                        <p>{artist}</p>
                    </div>
                </section>
                <audio src={audio} ref={audioElement} onTimeUpdate={timeUpdate}></audio>
            </main>
        </>
    )
}

export default Musica;