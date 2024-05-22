import { Text, Pressable, View, StyleSheet } from 'react-native'

const EpisodeCard = (props) => {
  const { episode, onPress: onPressHandler } = props

  return (
    <Pressable onPress={() => onPressHandler(episode)}>
      <View style={styles.episodeContainer}>
        <Text style={styles.episodeName}>{episode.name}</Text>
        <Text style={styles.episodeDetail}>
          {episode.episode} - Released on {episode.air_date}
        </Text>
      </View>
    </Pressable>
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
    paddingHorizontal: 10,
    paddingVertical: 15,
    gap: 3
  },
  episodeName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  episodeDetail: {
    color: '#666666'
  }
})

export default EpisodeCard
