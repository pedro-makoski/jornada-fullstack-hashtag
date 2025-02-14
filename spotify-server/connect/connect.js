import { MongoClient } from "mongodb"
import * as dotenv from 'dotenv'

dotenv.config()

const cliente = new MongoClient(process.env.URI)
const db = cliente.db("spotify")

export const getColect = async(nameCollection) => {
    const list = await db.collection(nameCollection).find({}).toArray()
    return list 
}

export const getCollection = async(nameCollection) => {
    const collection = await getColect(nameCollection)

    return (req, res) => {
        res.send(collection)
    }
}


export const getCollectionById = async(nameCollection, place) => {
    const collection = await db.collection(nameCollection).find({}).toArray()

    return (req, res) => {
        const id = req.params.id
        const newObj = collection.find((obj) => obj[place].toString().toLowerCase() === id.toLowerCase())
        if(!newObj) {
            res.status(404)
            res.send("Problema ao achar elemento")
        }

        res.status(200)
        res.send(newObj)
    }
}

export const getColectionByElementModule = async(nameCollection, place, elemento) => {
    const collection = await db.collection(nameCollection).find({}).toArray()
    return collection.filter((obj) =>obj[place].toString().toLowerCase() === elemento.toString().toLowerCase()) 
}

export const getCollectionByProperty = async(nameCollection, place) => {
    return async(req, res) => {
        const elemento = req.params.property
        const newObj = await getColectionByElementModule(nameCollection, place, elemento)

        if(!newObj || newObj.length === 0) {
            res.status(404)
            res.send("Problema ao achar elemento")
            return 
        }

        res.status(200)
        res.send(newObj)
    }
}

export const postManyCollection = async(list, collection) => {
    return await db.collection(collection).insertMany(list)
}
