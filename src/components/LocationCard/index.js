import { View, Text, Pressable, StyleSheet } from 'react-native'

const LocationCard = (props) => {
  const { location, onPress: onPressHandler } = props

  return (
    <Pressable
      onPress={() => {
        onPressHandler(location)
      }}
    >
      <View style={styles.locationContainer}>
        <Text style={styles.titleText}>{location.name}</Text>
        <Text>{location.type}</Text>
        <Text>{location.dimension}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  locationContainer: {
    flexDirection: 'col',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
    padding: 10
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default LocationCard
