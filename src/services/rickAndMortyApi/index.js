import axios from 'axios'

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

  const uri = encodeURI(`episode/${ids}`)
  return await client.get(uri)
}
const getLocationById = async (id) => {
  const uri = encodeURI(`location/${id}`)
  return await client.get(uri)
}
const getCharactersByIds = async (ids = []) => {
  if (ids.length == 0) {
    return []
  }

  const uri = encodeURI(`character/${ids}`)
  return await client.get(uri)
}

export {
  getCharacterByName,
  getLocationById,
  getCharactersByIds,
  getEpisodesByIds,
  getNextCharacterPage
}
