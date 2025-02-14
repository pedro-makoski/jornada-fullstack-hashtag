import React, { act, useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faBackwardStep, faForwardStep, faCirclePause, prefix} from '@fortawesome/free-solid-svg-icons'
import './musica.css'
import { Link, useParams } from "react-router-dom";
import { fetchData } from "./artista";
import { useQuery } from "@tanstack/react-query";
import { URL } from "../assets/database/artists";

const minutesToFormat = (minutes) => {
    const minutesAbs = Math.floor(minutes/60)
    const seconds = Math.floor(minutes % 60)

    return `${minutesAbs.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

const formatToSeconds = (format) => {
    const [minutes, seconds] = format.toString().split(":")
    const minutesInt = Number(minutes)
    const secondsInt = Number(seconds)

    return minutesInt+(secondsInt / 60)
}

const Musica = () => {
    const { id } = useParams()

    const { data:song, error, isLoading } = useQuery({
        queryKey: ["songs", id],
        queryFn:fetchData(`${URL}/songs/${id}`),
    })

    const { data:currentArtista, error:errorArtist, isLoading:isLoadingArtist } = useQuery({
        queryKey: ["artists", id],
        queryFn:fetchData(`${URL}/artistfromsong/${song?.name}`),
        enabled:!!song, 
    })

    const idArtista = currentArtista?._id
    const imageArtista = currentArtista?.image

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

    if(isLoadingArtist) {
        return (
            <h1>Carregando...</h1>
        )
    }

    if(errorArtist) {
        return (
            <h1 className="carregando">Problema ao encontrar os elementos</h1>
        )
    }

    const { image, name, duration, artist, audio } = song 

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
                    <AudioPlayer audio={audio} duration={duration} id={id} name={name}/>
                    <div className="main--music__autor-infos">
                        <h2>{name}</h2>
                        <p>{artist}</p>
                    </div>
                </section>
            </main>
        </>
    )
}

const AudioPlayer = ({audio, duration, id, name}) => {
    const {data:nextMusic, error:errorSongNext, isLoading:isLoadingSongNext} = useQuery({
        queryKey: ["nextmusic", id],
        queryFn:fetchData(`${URL}/nextmusic/${name}`)
    });
    const {data:beforeMusic, error:errorSongBefore, isLoading:isLoadingSongBefore} = useQuery({
        queryKey: ["beforemusic",id],
        queryFn:fetchData(`${URL}/beforemusic/${name}`),
        enabled:!!nextMusic
    });

    const togglePlay = () => {
        let isPauseNew = !isPause;
        if(isPauseNew) {
            audioElement.current.pause();
        } else {
            audioElement.current.play();
        }
        setIsPause(isPauseNew);
    }

    const [isPause, setIsPause] = useState(true);
    const [timeStamp, setTimeStamp] = useState('00:00');
    const audioElement = useRef(null);
    const progress = useRef(null);

    useEffect(() => {
        setIsPause(true)
        if(audioElement.current) {
            audioElement.current.pause();
            audioElement.current.currentTime = 0;
            progress.current.style.setProperty("--_progress", `0%`);
            setTimeStamp("00:00");
        };

        return () => {
            if(audioElement.current) {
                audioElement.current.pause()
                audioElement.current.currentTime = 0
            }
        }
    }, [id])

    useEffect(() => {
        const intervalId = setInterval(() => {
            if(!isPause) {
                const currentTime = audioElement.current.currentTime
                setTimeStamp(minutesToFormat(currentTime))
                const percent = currentTime/formatToSeconds(duration)
                progress.current.style.setProperty("--_progress", `${percent}%`)
            }
        }, 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [isPause])

    if(errorSongNext) {
        return (
            <h1 className="carregando">Problema ao encontrar os elementos</h1>
        );
    }

    if(isLoadingSongNext) {
        return (
            <h1>Carregando...</h1>
        );;
    }

    if(errorSongBefore) {
        return (
            <h1 className="carregando">Problema ao encontrar os elementos</h1>
        );
    }

    if(isLoadingSongBefore) {
        return (
            <h1>Carregando...</h1>
        );
    }

    return (
        <div className="main-music__infos__time">
            <div className="main-music__infos__buttons">
                <Link className="button-control" to={`/songs/${beforeMusic?._id}`}>
                    <FontAwesomeIcon icon={faBackwardStep} className="fa"/>
                </Link>
                <button className="button-control" onClick={togglePlay}> 
                    <FontAwesomeIcon icon={isPause ? faCirclePlay : faCirclePause} className="fa"/>
                </button>
                <Link className="button-control" to={`/songs/${nextMusic?._id}`}>
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
            <audio src={audio} ref={audioElement}></audio>
        </div>
    )
}

export default Musica;