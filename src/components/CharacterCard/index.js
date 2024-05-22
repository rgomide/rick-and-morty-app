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
          <Text style={styles.nameText}>{name}</Text>
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
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF'
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  characterImage: {
    width: 100,
    height: 100,
    marginRight: 10
  }
})

export default CharacterCard
