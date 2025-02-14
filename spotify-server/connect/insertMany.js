import {songsArray} from '../../spotify/src/assets/database/songs.js'
import {artistArray} from '../../spotify/src/assets/database/artists.js'
import { postManyCollection } from "./connect.js"

const removeIdFromList = (list) => {
    return list.map((obj) => {
        const copy = {...obj}
        delete copy.id
        return copy 
    })
}

console.log(await postManyCollection(removeIdFromList(songsArray),"songs"))
console.log(await postManyCollection(removeIdFromList(artistArray), "artists"))