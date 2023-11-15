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
import LogInScreen from './src/screens/LogInScreen';
import HomeScreen from './src/screens/HomeScreen';

//Title: Ignacio


function App(): JSX.Element {

  return (
    <FirebaseContext.Provider value={{firebase}}>
      <SafeAreaView>
        <ScrollView>
          <HomeScreen/>
        </ScrollView>
      </SafeAreaView>
    </FirebaseContext.Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
