import { useEffect, useState } from 'react'
import { View, TextInput, Button, FlatList, StyleSheet } from 'react-native'

import {
  getCharacterByName,
  getCharactersByIds,
  getNextCharacterPage
} from '../../services/rickAndMortyApi'
import CharacterCard from '../../components/CharacterCard'
import Spinner from '../../components/Spinner'

const CharactersScreen = (props) => {
  const { navigation, route: { params: { characterIds } = {} } = {} } = props

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false)
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
          setIsLoading(true)
          const chars = await getCharactersByIds(characterIds)
          setIsLoading(false)

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

  const loadCharacters = async () => {
    try {
      setIsLoading(true)
      const chars = await getCharacterByName({ name: nameSearch })
      setIsLoading(false)

      setPageInfo(chars.data.info)
      setCharacters(chars.data.results)
    } catch (error) {
      setPageInfo({})
      setCharacters([])
    }
  }

  const loadNextPage = async () => {
    try {
      setIsLoadingNextPage(true)
      const chars = await getNextCharacterPage(pageInfo.next)
      setIsLoadingNextPage(false)

      console.log(chars)

      setPageInfo(chars.data.info)
      setCharacters([...characters, ...chars.data.results])
    } catch (error) {
      setPageInfo({})
      setCharacters([])
    }
  }

  return (
    <FlatList
      style={styles.marginVertical}
      data={isLoading ? [] : characters}
      contentContainerStyle={styles.mainView}
      keyExtractor={(item) => item.id}
      renderItem={(element) => {
        return <CharacterCard onPress={characterCardPress} character={element.item} />
      }}
      ListEmptyComponent={<Spinner />}
      ListHeaderComponent={
        <View style={styles.headerView}>
          <TextInput style={styles.textInput} onChangeText={setNameSearch} value={nameSearch} />
          <Button title="Load Characters" onPress={loadCharacters} />
        </View>
      }
      ListFooterComponent={
        <View style={styles.footerView}>
          {isLoadingNextPage && <Spinner />}
          <Button title="Load More..." disabled={!pageInfo.next} onPress={loadNextPage} />
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  mainView: {
    justifyContent: 'center',
    padding: 10,
    gap: 10
  },
  headerView: {
    gap: 10
  },
  footerView: {
    gap: 10
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
    padding: 10
  },
  marginVertical: {
    marginVertical: 5
  }
})

export default CharactersScreen
