import React from "react";
import { Link } from "react-router-dom";
import './showSomeThing.css'

const ShowSomeThing = ({ title, route, Elements }) => {
    console.log(Elements)
    return(
        <>
            <div className="main__titles">
                <h2>{title}</h2>
                <Link to={route} className="main__titles__link">Veja mais</Link>
            </div>
            <Elements />
        </>
    )
}

export default ShowSomeThing