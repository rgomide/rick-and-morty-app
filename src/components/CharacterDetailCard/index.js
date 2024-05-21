import { Text, View } from 'react-native'

const CharacterDetailCard = ({ character }) => {
  const { name } = character
  return (
    <View>
      <Text>{name} </Text>
    </View>
  )
}

export default CharacterDetailCard
