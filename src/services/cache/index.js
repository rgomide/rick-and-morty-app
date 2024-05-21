import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Crypto from 'expo-crypto'

const EPISODE_KEY = 'episode'
const CHARACTER_KEY = 'character'

const getEpisodeCache = async (ids) => {
  return await getCache(ids, EPISODE_KEY)
}

const addEpisodeCache = async (ids, episodes) => {
  await addCache(ids, episodes, EPISODE_KEY)
}

const getCharacterCache = async (ids) => {
  return await getCache(ids, CHARACTER_KEY)
}

const addCharacterCache = async (ids, characters) => {
  await addCache(ids, characters, CHARACTER_KEY)
}

const getCache = async (ids, resourceKey) => {
  const key = await hash(`${resourceKey}-${ids}`)
  const cacheItems = await AsyncStorage.getItem(key)

  if (cacheItems) {
    return JSON.parse(cacheItems)
  } else {
    return null
  }
}

const addCache = async (ids, items, resourceKey) => {
  const key = await hash(`${resourceKey}-${ids}`)
  await AsyncStorage.setItem(key, JSON.stringify(items))
}

const hash = async (key) => {
  return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA1, key)
}

export { addEpisodeCache, getEpisodeCache, addCharacterCache, getCharacterCache }
