/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from './screens/list'
import Anime from './screens/anime';
import Search from './screens/search';
import SplashScreen from 'react-native-splash-screen'
import Player from './screens/reproductor';
import Home from './screens/home';

const Stack = createNativeStackNavigator()

const App  = () => {

  useEffect(() => {
    SplashScreen.hide()
  })
  return (
    <NavigationContainer>
      
      <Stack.Navigator>
      <Stack.Screen name='Home'component={Home}></Stack.Screen>
        <Stack.Screen name='Search' component={Search}></Stack.Screen>
        <Stack.Screen name='Player' component={Player}></Stack.Screen>
            <Stack.Screen name='Anime' component={Anime}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
