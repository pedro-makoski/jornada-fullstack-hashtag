import React, { useEffect, useRef, useState } from "react";

import { searchValuesWithThisValue } from "../utils/searchInList";
import { artistArray } from "../assets/database/artists";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faBackwardStep, faForwardStep, faCirclePause} from '@fortawesome/free-solid-svg-icons'
import './musica.css'
import { Link, useParams } from "react-router-dom";
import { songsArray } from "../assets/database/songs";

const Musica = () => {
    const { id } = useParams()
    const obj = searchValuesWithThisValue(songsArray, parseInt(id), "id")[0]
    const artista = searchValuesWithThisValue(artistArray, obj.artist, "name")
    const image = artista[0]["image"]
    const [isPause, setIsPause] = useState(false)
    const [timeStamp, setTimeStamp] = useState('1:00')

    const togglePlay = () => {
        setIsPause(prev => !prev)
    }

    return (
        <>
            <main className="main-music">
                <section className="main-music--music">
                    <img src={obj.image} />
                </section>
                <section className="main-music__infos">
                    <div>
                        <Link to={`/artistas/${artista[0]["id"]}`} className="main-music__infos__link-author">
                            <img src={image} className="main-music__infos__image-author"/>
                        </Link>
                    </div>
                    <div className="main-music__infos__time">
                        <div className="main-music__infos__buttons">
                            <button className="button-control">
                                <FontAwesomeIcon icon={faBackwardStep} className="fa"/>
                            </button>
                            <button className="button-control" onClick={togglePlay}> 
                                <FontAwesomeIcon icon={isPause ? faCirclePause : faCirclePlay} className="fa"/>
                            </button>
                            <button className="button-control">
                                <FontAwesomeIcon icon={faForwardStep} className="fa"/>
                            </button>
                        </div>
                        <div className="main--music__infos-time-view">
                            <p>{timeStamp}</p>
                            <div className="progress-place">
                                <span className="progress-place__total"></span>
                                <span className="progress-place__progress"></span>
                            </div>
                            <p>{obj.duration}</p>
                        </div>
                    </div>
                    <div className="main--music__autor-infos">
                        <h2>{obj.name}</h2>
                        <p>{obj.artist}</p>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Musica;