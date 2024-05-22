import { View, Image, Text, StyleSheet, Pressable } from 'react-native'

const CharacterCard = (props) => {
  const { character, onPress: onPressHandler } = props
  const { name, status, image } = character

  return (
    <Pressable
      onPress={() => {
        onPressHandler(character)
      }}
    >
      <View style={styles.characterContainer}>
        <Image style={styles.characterImage} tintColor={null} source={{ uri: image }} />
        <View style={styles.textContainer}>
          <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">
            {name}
          </Text>
          <Text>{status}</Text>
        </View>
      </View>
    </Pressable>
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
  textContainer: {
    flexShrink: 'initial',
    paddingRight: 10
  },
  characterImage: {
    width: 100,
    height: 100,
    marginRight: 10
  }
})

export default CharacterCard
