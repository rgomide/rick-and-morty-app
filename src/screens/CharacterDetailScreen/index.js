import { Button, View } from 'react-native'
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
  const originTitle = `Origin - ${originName}`

  const goToEpisodeDetailScreen = () => {
    const episodeIds = extracdIdsFromUrlList(episodes)
    navigation.navigate('EpisodeDetail', { episodeIds })
  }

  const goToLocationScreen = (url) => {
    const locationId = extracdIdsFromUrlList([url])
    navigation.navigate('LocationDetail', { locationId })
  }

  return (
    <View>
      <CharacterDetailCard character={character} />
      <Button title={episodesTitle} onPress={goToEpisodeDetailScreen} />
      <Button
        title={locationTitle}
        onPress={() => {
          goToLocationScreen(locationUrl)
        }}
      />
      <Button
        title={originTitle}
        onPress={() => {
          goToLocationScreen(originUrl)
        }}
      />
    </View>
  )
}

export default CharacterDetailScreen
