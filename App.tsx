import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import firebase, {FirebaseContext} from './src/firebase';
import {LoginContext} from './src/helper/LoginContext.js';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BookClassScreen from './src/screens/BookClassScreen';
import HomeScreen from './src/screens/HomeScreen';
import LogInScreen from './src/screens/LogInScreen';
import TrainingListScreen from './src/screens/TrainingListScreen';

const Stack = createNativeStackNavigator();
//Title: Ignacio

function App(): JSX.Element {
  const [loggedIn, setLoggedIn] = useState(false);
  const [idUser, setIdUser] = useState('algo');
  return (
    <FirebaseContext.Provider value={{firebase}}>
      <LoginContext.Provider value={{loggedIn, setLoggedIn, idUser, setIdUser}}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="LogInScreen" screenOptions={{headerShown:false}}
          >
            <Stack.Screen name="LogInScreen" component={LogInScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="BookClassScreen" component={BookClassScreen} />
            <Stack.Screen
              name="TrainingListScreen"
              component={TrainingListScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </LoginContext.Provider>
    </FirebaseContext.Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
