import React, { useState } from "react";
import './artista.css'
import { songsArray } from "../assets/database/songs";
import { searchValuesWithThisValue } from "../utils/searchInList";
import { Link, useParams } from "react-router-dom"; 
import { artistArray } from "../assets/database/artists";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'

const HeaderArtista = ({imgPath, title}) => {
    return (
        <section style={{backgroundImage: `url("${imgPath}")`}} className="main__header">
            <h2>{title}</h2>
        </section>
    )
}

const MusicShowInline = ({cont, img, name, time, id}) => {
    return(
        <li>
            <article>
                <Link to={`/songs/${id}`}>
                    <div className="main__ol__li__img-place">
                        <p className="main__ol__li__img-place__cont">{cont}</p>
                        <div className="main__ol__li__img-place__img">
                            <img src={img} alt={`Imagem da musica ${name}`}/>
                            <h4>{name}</h4>
                        </div>
                    </div>
                    <div>
                        <p>{time}</p>
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
                {correspondents.slice(0, quantAppear).map((musica, index) => (
                    <MusicShowInline img={musica.image} name={musica.name} time={musica.duration} key={musica.id} id={musica.id} cont={index+1}/>
                ))}
            </ol>
            {seeMore ? <button className="main__ol__see-more" onClick={addView}>Veja mais</button> : <></>}
        </>
   )
}


export const ArtistaPage = () => {
    const { id } = useParams()
    const { name, banner } = searchValuesWithThisValue(artistArray, parseInt(id), "id")[0]
    const correspondents = searchValuesWithThisValue(songsArray, name, "artist")

    return (
        <>
            <main className="mainArtista">
                <HeaderArtista imgPath={banner} title={name}/>
                <div className="mainArsta__musics">
                    <h3>Populares</h3>
                    <MusicsShowInLineList listMusics={songsArray} correspondents={correspondents}/>
                </div>
                <Link to={`/songs/${correspondents[0].id}`}>
                    <div className="fa-artist">
                        <FontAwesomeIcon icon={faCirclePlay} />
                    </div>
                </Link>
            </main>
        </>
    )
}