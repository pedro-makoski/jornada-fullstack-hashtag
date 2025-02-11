import React, { useEffect, useRef, useState } from "react";
import Header from "../Components/header/header";
import { searchValuesWithThisValue } from "../utils/searchInList";
import { artistArray } from "../assets/database/artists";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faBackwardStep, faForwardStep, faCirclePause} from '@fortawesome/free-solid-svg-icons'
import './musica.css'
import { Link } from "react-router-dom";

const Musica = ({obj}) => {
    const artista = searchValuesWithThisValue(artistArray, obj.artist, "name")
    const image = artista[0]["image"]
    const [isPause, setIsPause] = useState(false)
    const [play, setPlay] = useState(<FontAwesomeIcon icon={faCirclePlay} className="fa"/>)
    const playButton = useRef(null)
    const timeStamp = useState('0:00')

    useEffect(() => {
        if(playButton && playButton.current) {
            playButton.current.addEventListener("click", () => {
                if(isPause) {
                    setPlay(<FontAwesomeIcon icon={faCirclePlay} className="fa"/>)
                    setIsPause(false)
                } else {
                    setPlay(<FontAwesomeIcon icon={faCirclePause} className="fa"/>)
                    setIsPause(true)
                }
            })
        }
    }, [isPause])

    return (
        <>
            <Header />
            <main className="main-music">
                <section className="main-music--music">
                    <img src={obj.image} />
                </section>
                <section className="main-music__infos">
                    <div>
                        <Link to={`/artistas/${artista[0]["id"]}`}>
                            <img src={image} className="main-music__infos__image-author"/>
                        </Link>
                    </div>
                    <div className="main-music__infos__time">
                        <div className="main-music__infos__buttons">
                            <button className="button-control">
                                <FontAwesomeIcon icon={faBackwardStep} className="fa"/>
                            </button>
                            <button className="button-control" ref={playButton}> 
                                {play}
                            </button>
                            <button className="button-control">
                                <FontAwesomeIcon icon={faForwardStep} className="fa"/>
                            </button>
                        </div>
                        <div className="main--music__infos-time-view">
                            <p>{timeStamp}</p>
                            <div>
                                <span className="main--music__infos__total"></span>
                                <span className="main--music__infos__progress"></span>
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