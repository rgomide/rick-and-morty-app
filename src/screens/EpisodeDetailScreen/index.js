import { useEffect, useState } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { getEpisodesByIds } from '../../services/rickAndMortyApi'
import EpisodeCard from '../../components/EpisodeCard'
import { extracdIdsFromUrlList } from '../../services/common'

const EpisodeDetailScreen = (props) => {
  const {
    route: {
      params: { episodeIds }
    },
    navigation
  } = props

  const [episodes, setEpisodes] = useState([])

  useEffect(() => {
    const getEpisodes = async () => {
      try {
        const episodes = await getEpisodesByIds(episodeIds)

        setEpisodes([episodes.data].flat())
      } catch (error) {
        setEpisodes([])
      }
    }

    getEpisodes()
  }, [episodeIds])

  const episodeCardPress = (episode) => {
    const characterIds = extracdIdsFromUrlList(episode.characters)
    navigation.navigate('Characters', { characterIds })
  }

  return (
    <FlatList
      data={episodes}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.mainStyle}
      renderItem={({ item }) => {
        return <EpisodeCard episode={item} onPress={episodeCardPress} />
      }}
    />
  )
}

const styles = StyleSheet.create({
  mainStyle: {
    padding: 10
  }
})

export default EpisodeDetailScreen
