import React from "react";
import "./item.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'

export function ElementArtistOrSong({imgPath, title, route, subtitle, whatIs, borderRadiusImg, subtitleStandart}) {
    return (
        <article className="items__item">
            <Link to={route}>
                <div className="items__item__img">
                    <img src={imgPath} alt={`$Imagem do(a) ${whatIs} ${title}`} style={{borderRadius: borderRadiusImg}}/>
                    <div>
                        <FontAwesomeIcon icon={faCirclePlay} className="fa-play"/>
                    </div>
                </div>  
                <div className="item__titles">
                    <h3>{title}</h3>
                    <p>{subtitle ?? subtitleStandart}</p>
                </div>
            </Link>
        </article>
    )
}

export function MultipleItens({list, whatIsConjunct, whatIsSingular, sliceQuantList, borderRadiusImg, subtitleStandart}) {
    let newList = [...Array.from(list)]

    if(sliceQuantList != 0) {
        newList = Array.from(list).slice(0, sliceQuantList)
    }

    return (
        <section className="items">
            {newList.map((element) => (
                <ElementArtistOrSong imgPath={element.image} title={element.name} route={`/${whatIsConjunct}/${element._id}`} subtitle={element.artist} whatIs={whatIsSingular} key={element._id} borderRadiusImg={borderRadiusImg} subtitleStandart={subtitleStandart}/>
            ))}
        </section>
    )
}