import express from "express"
import cors from "cors"

import {getCollection, getCollectionById, getCollectionByProperty, getColect, getColectionByElementModule} from "../connect/connect.js"

const PORT = 3000 
const ID_PLACE = "_id"

const app = express()
app.use(cors())

app.get("/artists", await getCollection("artists"))
app.get("/songs", await getCollection("songs"))

app.get("/artists/:id", await getCollectionById("artists", ID_PLACE))
app.get("/songs/:id", await getCollectionById("songs", ID_PLACE))

app.get("/songsfromartist/:property", await getCollectionByProperty("songs", "artist"))
app.get("/artistfromsong/:song", async(req, res) => {
    try {
        const song = req.params.song
        const songs = await getColect("songs")
        const songObj = Array.from(songs).find((obj) => obj.name.toString() === song)
        const artists = await getColect("artists")
        const artistObj = Array.from(artists).find((obj) => songObj.artist === obj.name)
        if(!artistObj) {
            throw new Error("Problemas ao achar o elemento")
        }
        res.status(200)
        res.send(artistObj)
    } catch(e) {
        res.status(404)
        res.send("Problemas ao achar o elemento")
    }
})  
app.get("/nextmusic/:song", async(req, res) => {
    try {
        const id = req.params.song
        const songs = await getColect("songs")
        const songObj = Array.from(songs).find((obj) => obj.name.toString() === id)
        const artists = await getColect("artists")
        const artistObj = Array.from(artists).find((obj) => songObj.artist === obj.name)
        const musics = await getColectionByElementModule("songs", "artist", artistObj.name)
        const idxOfMusics = musics.findIndex((music) => music.name === id)
        let nextMusic = idxOfMusics+1
        if(nextMusic >= musics.length) {
            nextMusic = 0
        }

        const nextMusicId = {
            "_id":musics[nextMusic]._id.toString()
        }
        res.status(200)
        res.send(nextMusicId)
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send("Problema em encontrar o elemento")
    }
})

app.get("/beforemusic/:song", async(req, res) => {
    try {
        const id = req.params.song
        const songs = await getColect("songs")
        const songObj = Array.from(songs).find((obj) => obj.name.toString() === id)
        const artists = await getColect("artists")
        const artistObj = Array.from(artists).find((obj) => songObj.artist === obj.name)
        const musics = await getColectionByElementModule("songs", "artist", artistObj.name)
        const idxOfMusics = musics.findIndex((music) => music.name === id)

        let beforeMusic = idxOfMusics-1
        if(beforeMusic < 0) {
            beforeMusic = musics.length-1
        }

        const beforeMusicId = {
            "_id":musics[beforeMusic]._id.toString()
        }

        console.log(beforeMusicId)
        res.status(200)
        res.send(beforeMusicId)
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send("Problema em encontrar o elemento")
    }
})

app.listen(PORT, () => {
    console.log("Servidor escutando")
})