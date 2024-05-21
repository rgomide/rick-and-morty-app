import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'

const CharacterCard = (props) => {
  const { character, onPress: onPressHandler } = props
  const { name, status, image } = character

  return (
    <TouchableOpacity
      onPress={() => {
        onPressHandler(character)
      }}
    >
      <View style={styles.characterContainer}>
        <Image style={styles.characterImage} source={{ uri: image }} />
        <View>
          <Text>{name}</Text>
          <Text>{status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  characterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  characterImage: {
    width: 90,
    height: 90,
    marginRight: 10
  }
})

export default CharacterCard
