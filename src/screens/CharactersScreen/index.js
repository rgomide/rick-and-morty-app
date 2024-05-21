import { useEffect, useState } from 'react'
import { View, TextInput, Button, FlatList, StyleSheet } from 'react-native'

import { getCharacterByName, getCharactersByIds } from '../../services/rickAndMortyApi'
import CharacterCard from '../../components/CharacterCard'

const CharactersScreen = (props) => {
  const { navigation, route: { params: { characterIds } = {} } = {} } = props

  const [characters, setCharacters] = useState([])
  const [pageInfo, setPageInfo] = useState({})
  const [nameSearch, setNameSearch] = useState('')

  const characterCardPress = (character) => {
    navigation.navigate('CharacterDetail', { character })
  }

  useEffect(() => {
    if (characterIds) {
      const getCharacters = async () => {
        try {
          const chars = await getCharactersByIds(characterIds)

          setPageInfo({})
          setCharacters([chars.data].flat())
        } catch (error) {
          setPageInfo({})
          setCharacters([])
        }
      }

      getCharacters()
    }
  }, [characterIds])

  return (
    <View>
      <TextInput
        style={[styles.textInput, styles.marginVertical]}
        onChangeText={setNameSearch}
        value={nameSearch}
      />
      <Button
        title="Load Characters"
        onPress={async () => {
          try {
            const chars = await getCharacterByName({
              name: nameSearch
            })

            setPageInfo(chars.data.info)
            setCharacters(chars.data.results)
          } catch (error) {
            setPageInfo({})
            setCharacters([])
          }
        }}
      />
      <FlatList
        style={styles.marginVertical}
        data={characters}
        keyExtractor={(item) => item.id}
        renderItem={(element) => {
          return <CharacterCard onPress={characterCardPress} character={element.item} />
        }}
      />
      <Button
        title="Load More..."
        disabled={!pageInfo.next}
        onPress={async () => {
          const chars = await getNextCharacterPage(pageInfo.next)

          setPageInfo(chars.data.info)
          setCharacters([...characters, ...chars.data.results])
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    height: 35,
    padding: 5
  },
  marginVertical: {
    marginVertical: 5
  }
})

export default CharactersScreen
