import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {FirebaseContext} from '../firebase';
import {LoginContext} from '../helper/LoginContext';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {loggedIn, setLoggedIn, idUser, setIdUser} = useContext(LoginContext);
  const {firebase} = useContext(FirebaseContext);
  const [userData, setUserData] = useState([]);
  const [userLoggedInData, setUserLoggedInData] = useState([]);

  async function loadUserData() {
    try {
      const Loguser = await firebase.db.collection('user').doc(idUser).get();
      if (Loguser) {
        const dataUser = Loguser.data();
        console.log('Datos del documento: ', dataUser);
        setUserLoggedInData(dataUser);
        return dataUser;
      } else {
        console.log('No encontrado');
        return null;
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadUserData();
    firebase.db.collection('user').onSnapshot(snapshot => {
      setUserData(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        })),
      );
    });
  }, []);

  const onHandleUserData = () => {
    //const Loguser = firebase.db.collection('user').doc(id).get();
    console.log(userLoggedInData);
  };

  return (
    <>
      {loggedIn ? (
        <>
          <View style={styles.container}>
            <View style={{padding: 15}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: 10,
                }}>
                Welcome
              </Text>
              <Text>User Logged in: {userLoggedInData.name}</Text>
              <Text>Username: {userLoggedInData.username}</Text>
              <Text>Email: {userLoggedInData.email}</Text>
              <Text>CC: {userLoggedInData.cc}</Text>
            </View>
            {/*
          <View>
            {userData?.map(({id, data}) => (
              <Text key={id}>{data.name}</Text>
            ))}
          </View>
            */}

            <Pressable
              style={styles.pressable}
              onPress={() => {
                navigation.navigate('BookClassScreen');
              }}>
              <Text style={styles.textPressable}>
                Book Class or Cancel Class
              </Text>
            </Pressable>

            <Pressable
              style={styles.pressable}
              onPress={() => {
                navigation.navigate('TrainingListScreen');
              }}>
              <Text style={styles.textPressable}>Training List</Text>
            </Pressable>
            {/* 
          <Button
            title="UserLogData"
            onPress={onHandleUserData}
          />
          */}

            <Pressable
              style={styles.pressable}
              onPress={() => {
                setLoggedIn(false);
                setIdUser('');
                navigation.navigate('LogInScreen');
              }}>
              <Text style={styles.textPressable}>Log Out</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <Text>No estás logueado</Text>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: '#819FF7',
    width: '45%',
    padding: 15,
    marginVertical: 25,
    alignItems: 'center',
    borderRadius: 5,
  },
  textPressable: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  container: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    padding: 20,
    height: 725,
  },
});

export default HomeScreen;
