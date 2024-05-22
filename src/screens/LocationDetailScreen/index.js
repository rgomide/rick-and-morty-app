import { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { getLocationById } from '../../services/rickAndMortyApi'
import LocationCard from '../../components/LocationCard'
import { extracdIdsFromUrlList } from '../../services/common'

const LocationDetailScreen = (props) => {
  const {
    route: {
      params: { locationId }
    },
    navigation
  } = props

  const [location, setLocation] = useState({})

  useEffect(() => {
    const getLocation = async () => {
      try {
        const location = await getLocationById(locationId)

        setLocation(location.data)
      } catch (error) {
        setLocation({})
      }
    }
    getLocation()
  }, [locationId])

  const locationCardPress = (location) => {
    const characterIds = extracdIdsFromUrlList(location.residents)
    const from = `Location: ${location.name}`

    navigation.navigate('Characters', { characterIds, from })
  }

  return (
    <View style={styles.mainView}>
      <LocationCard location={location} onPress={locationCardPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    padding: 10
  }
})

export default LocationDetailScreen
