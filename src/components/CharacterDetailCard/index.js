import { Image, Text, View, StyleSheet } from 'react-native'

const CharacterDetailCard = ({ character }) => {
  const { name, status, species, type, gender, image } = character

  const nameStatus = status.toLowerCase() != 'unknown' ? `${name} - ${status}` : name

  return (
    <View style={styles.characterContainer}>
      <Image style={styles.characterImage} source={{ uri: image }} />
      <View style={styles.detailContainer}>
        <Text style={styles.textTitle}>{nameStatus}</Text>
        <Text>{species}</Text>
        {type && <Text>{type}</Text>}
        <Text>{gender}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  characterContainer: {
    flexDirection: 'col',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
    padding: 10
  },
  detailContainer: {
    alignItems: 'center'
  },
  characterImage: {
    width: 180,
    height: 180,
    marginRight: 10,
    borderRadius: 40,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#ccc'
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default CharacterDetailCard
