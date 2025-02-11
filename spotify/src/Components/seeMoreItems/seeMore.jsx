import React from "react";
import Header from "../header/header";
import "../../hubs/main.css"
import ShowSomeThing from "../showSomeThing/showSomeThing";
import { MultipleItens } from "../item/item";

export const SeeMore = ({list, borderRadiusImg, whatIsConjunct, whatIsSingular, title, subtitleStandart}) => {
    const Elements = () => {
        return <MultipleItens list={list} whatIsConjunct={whatIsConjunct} whatIsSingular={whatIsSingular} sliceQuantList={0} borderRadiusImg={borderRadiusImg} subtitleStandart={subtitleStandart}/>
    }

    return (
        <>
            <Header />
            <main>
                <ShowSomeThing title={title} route={"/musics"} Elements={Elements} showSeeMore={false}/>
            </main>
        </>
    ) 
}
