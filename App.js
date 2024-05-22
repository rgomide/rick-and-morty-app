import { StatusBar } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import CharactersScreen from './src/screens/CharactersScreen'
import CharacterDetailScreen from './src/screens/CharacterDetailScreen'
import EpisodeDetailScreen from './src/screens/EpisodeDetailScreen'
import LocationDetailScreen from './src/screens/LocationDetailScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Characters" screenOptions={{ contentStyle: { backgroundColor: "#eee" } }}>
        <Stack.Screen name="Characters" component={CharactersScreen} options={{ title: 'Characters' }} />
        <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} options={{ title: 'Character Detail' }} />
        <Stack.Screen name="EpisodeDetail" component={EpisodeDetailScreen} options={{ title: 'Episodes' }} />
        <Stack.Screen name="LocationDetail" component={LocationDetailScreen} options={{ title: 'Location' }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}