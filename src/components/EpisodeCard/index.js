import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'

const EpisodeCard = (props) => {
  const { episode, onPress: onPressHandler } = props

  return (
    <TouchableOpacity onPress={() => onPressHandler(episode)}>
      <View style={styles.episodeContainer}>
        <Text style={styles.episodeName}>{episode.name}</Text>
        <Text style={styles.episodeDetail}>
          {episode.episode} - {episode.air_date}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  episodeContainer: {
    flexDirection: 'col',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 7,
    paddingVertical: 15,
    gap: 3
  },
  episodeName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  episodeDetail: {
    color: '#666666'
  }
})

export default EpisodeCard
