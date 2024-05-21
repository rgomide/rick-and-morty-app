import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'

const EpisodeCard = (props) => {
  const { episode, onPress: onPressHandler } = props

  return (
    <TouchableOpacity onPress={() => onPressHandler(episode)}>
      <View style={styles.innerView}>
        <Text>{episode.name}</Text>
        <Text>{episode.episode}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  innerView: {
    paddin: 10,
    borderWidth: 1
  }
})

export default EpisodeCard
