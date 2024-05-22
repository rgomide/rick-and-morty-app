import { useEffect, useState } from 'react'
import { View, TextInput, FlatList, StyleSheet } from 'react-native'

import CharacterCard from '../../components/CharacterCard'
import Spinner from '../../components/Spinner'

import {
  getCharacterByName,
  getCharactersByIds,
  getNextCharacterPage
} from '../../services/rickAndMortyApi'

const DEBOUNCE_TIME = 700
const MIN_CHARACTERS_TO_SEARCH = 3
const END_REACHED_THRESHOLD = 0.01

const CharactersScreen = (props) => {
  const { navigation, route: { params: { characterIds } = {} } = {} } = props

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false)
  const [characters, setCharacters] = useState([])
  const [pageInfo, setPageInfo] = useState({})
  const [nameSearch, setNameSearch] = useState('')

  const isLoadingAnyData = isLoading || isLoadingNextPage

  const characterCardPress = (character) => {
    navigation.navigate('CharacterDetail', { character })
  }

  useEffect(() => {
    if (characterIds) {
      const getCharacters = async () => {
        try {
          setIsLoading(true)
          const chars = await getCharactersByIds(characterIds)

          setPageInfo({})
          setCharacters([chars.data].flat())
        } catch (error) {
          setPageInfo({})
          setCharacters([])
        } finally {
          setIsLoading(false)
        }
      }

      getCharacters()
    }
  }, [characterIds])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (nameSearch.length >= MIN_CHARACTERS_TO_SEARCH) {
        loadCharactersByName()
      }
    }, DEBOUNCE_TIME)

    return () => clearTimeout(timer)
  }, [nameSearch])

  const loadCharactersByName = async () => {
    try {
      setIsLoading(true)

      const chars = await getCharacterByName({ name: nameSearch })

      setPageInfo(chars.data.info)
      setCharacters(chars.data.results)
    } catch (error) {
      setPageInfo({})
      setCharacters([])
    } finally {
      setIsLoading(false)
    }
  }

  const loadNextPage = async () => {
    try {
      setIsLoadingNextPage(true)

      const chars = await getNextCharacterPage(pageInfo.next)

      setPageInfo(chars.data.info)
      setCharacters([...characters, ...chars.data.results])
    } catch (error) {
      setPageInfo({})
      setCharacters([])
    } finally {
      setIsLoadingNextPage(false)
    }
  }

  return (
    <FlatList
      style={styles.marginVertical}
      data={isLoading ? [] : characters}
      contentContainerStyle={styles.mainView}
      keyExtractor={(item) => item.id}
      refreshing={isLoading || isLoadingNextPage}
      onEndReached={() => {
        if (pageInfo.next) {
          loadNextPage()
        }
      }}
      onEndReachedThreshold={END_REACHED_THRESHOLD}
      renderItem={(element) => {
        return <CharacterCard onPress={characterCardPress} character={element.item} />
      }}
      ListEmptyComponent={isLoadingAnyData && <Spinner />}
      ListHeaderComponent={
        <View style={styles.headerView}>
          <TextInput
            placeholder="Type a character name..."
            placeholderTextColor={'#888'}
            style={styles.textInput}
            onChangeText={setNameSearch}
            value={nameSearch}
          />
        </View>
      }
      ListFooterComponent={
        <>
          {isLoadingNextPage && (
            <View style={styles.footerView}>
              <Spinner />
            </View>
          )}
        </>
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
    paddingVertical: 20
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
