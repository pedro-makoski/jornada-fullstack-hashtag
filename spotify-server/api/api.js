import express from "express"
import cors from "cors"

import {getCollection, getCollectionById, getCollectionByProperty} from "../connect/connect.js"

const PORT = 3000 
const ID_PLACE = "_id"

const app = express()
app.use(cors())

app.get("/artists", await getCollection("artists"))
app.get("/songs", await getCollection("songs"))

app.get("/artists/:id", await getCollectionById("artists", ID_PLACE))
app.get("/songs/:id", await getCollectionById("songs", ID_PLACE))

app.get("/songsfromartist/:property", await getCollectionByProperty("songs", "artist"))

app.listen(PORT, () => {
    console.log("Servidor escutando")
})