import axios from 'axios'
import { addEpisodeCache, getEpisodeCache, addCharacterCache, getCharacterCache } from '../cache'

const baseURL = 'https://rickandmortyapi.com/api/'

const client = axios.create({
  baseURL: baseURL,
  timeout: 5000
})

const getNextCharacterPage = async (url) => {
  return await client.get(url)
}

const getCharacterByName = async ({ name = '' }) => {
  const uri = encodeURI(`character/?name=${name}`)
  return await client.get(uri)
}

const getEpisodesByIds = async (ids = []) => {
  if (ids.length == 0) {
    return []
  }

  const episodesCache = await getEpisodeCache(ids)

  if (episodesCache) {
    return { data: episodesCache }
  } else {
    const uri = encodeURI(`episode/${ids}`)
    const episodes = await client.get(uri)

    await addEpisodeCache(ids, episodes.data)

    return episodes
  }
}
const getLocationById = async (id) => {
  const uri = encodeURI(`location/${id}`)
  return await client.get(uri)
}

const getCharactersByIds = async (ids = []) => {
  if (ids.length == 0) {
    return []
  }

  const charactersCache = await getCharacterCache(ids)

  if (charactersCache) {
    return { data: charactersCache }
  } else {
    const uri = encodeURI(`character/${ids}`)
    const characters = await client.get(uri)

    await addCharacterCache(ids, characters.data)

    return characters
  }
}

export {
  getCharacterByName,
  getLocationById,
  getCharactersByIds,
  getEpisodesByIds,
  getNextCharacterPage
}
