import { ActivityIndicator, View, StyleSheet } from 'react-native'

const Spinner = () => {
  return (
    <View style={styles.mainContainer}>
      <ActivityIndicator size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Spinner
