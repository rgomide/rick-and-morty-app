import { View, Text, TouchableOpacity } from 'react-native'

const LocationCard = (props) => {
  const { location, onPress: onPressHandler } = props

  return (
    <TouchableOpacity
      onPress={() => {
        onPressHandler(location)
      }}
    >
      <View>
        <Text>{location.name}</Text>
        <Text>{location.type}</Text>
        <Text>{location.dimension}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default LocationCard
