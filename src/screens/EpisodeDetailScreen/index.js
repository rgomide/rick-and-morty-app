import { useEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { getEpisodesByIds } from '../../services/rickAndMortyApi'
import EpisodeCard from '../../components/EpisodeCard'
import { extracdIdsFromUrlList } from '../../services/common'
import Spinner from '../../components/Spinner'

const EpisodeDetailScreen = (props) => {
  const {
    route: {
      params: { episodeIds }
    },
    navigation
  } = props

  const [isLoading, setIsLoading] = useState(false)
  const [episodes, setEpisodes] = useState([])

  useEffect(() => {
    const getEpisodes = async () => {
      try {
        setIsLoading(true)
        const episodes = await getEpisodesByIds(episodeIds)
        setIsLoading(false)

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
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <FlatList
          data={episodes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.mainStyle}
          renderItem={({ item }) => {
            return <EpisodeCard episode={item} onPress={episodeCardPress} />
          }}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  mainStyle: {
    padding: 10
  }
})

export default EpisodeDetailScreen
