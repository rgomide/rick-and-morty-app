import { useEffect, useState } from 'react'
import { View } from 'react-native'
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
    navigation.navigate('Characters', { characterIds })
  }

  return (
    <View>
      <LocationCard location={location} onPress={locationCardPress} />
    </View>
  )
}

export default LocationDetailScreen
