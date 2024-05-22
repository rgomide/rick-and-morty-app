import { Button, View, StyleSheet } from 'react-native'
import CharacterDetailCard from '../../components/CharacterDetailCard'
import { extracdIdsFromUrlList } from '../../services/common'

const CharacterDetailScreen = (props) => {
  const {
    route: {
      params: { character }
    },
    navigation
  } = props

  const {
    episode: episodes = [],
    location: { name: locationName, url: locationUrl },
    origin: { name: originName, url: originUrl }
  } = character

  const episodesLength = episodes.length
  const episodesTitle = `Episodes (${episodesLength})`

  const locationTitle = `Location - ${locationName}`
  const locationDisabled = locationUrl == ''

  const originTitle = `Origin - ${originName}`
  const originDisabled = originUrl == ''

  const goToEpisodeDetailScreen = () => {
    const episodeIds = extracdIdsFromUrlList(episodes)
    navigation.navigate('EpisodeDetail', { episodeIds })
  }

  const goToLocationScreen = (url) => {
    const locationId = extracdIdsFromUrlList([url])
    navigation.navigate('LocationDetail', { locationId })
  }

  return (
    <View style={styles.mainContainer}>
      <CharacterDetailCard character={character} />
      <Button title={episodesTitle} onPress={goToEpisodeDetailScreen} />
      <Button
        title={locationTitle}
        disabled={locationDisabled}
        onPress={() => {
          goToLocationScreen(locationUrl)
        }}
      />
      <Button
        title={originTitle}
        disabled={originDisabled}
        onPress={() => {
          goToLocationScreen(originUrl)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    gap: 10
  }
})

export default CharacterDetailScreen
