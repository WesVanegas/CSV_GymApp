import {
  View,
  Text,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {LoginContext} from '../helper/LoginContext';
import {useNavigation} from '@react-navigation/native';
import {FirebaseContext} from '../firebase';

const TrainingListScreen = () => {
  const navigation = useNavigation();
  const {loggedIn, setLoggedIn, idUser, setIdUser} = useContext(LoginContext);

  const {firebase} = useContext(FirebaseContext);
  const [trainingsData, setTrainingsData] = useState([]);

  useEffect(() => {
    firebase.db.collection('Trainings').onSnapshot(snapshot => {
      setTrainingsData(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        })),
      );
    });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={trainingsData}
          renderItem={({item}) => (
            <View
              style={{
                height: '80%',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
              }}>
              <Text style={{fontWeight: 'bold'}}>{item.data.trainingName}</Text>
              <Text>category: {item.data.category}</Text>
              <Text>Description: {item.data.description}</Text>
              <Text>Date: {item.data.trainingDate}</Text>
              <Text>Time: {item.data.trainingTime}</Text>
            </View>
          )}
        />
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

export default TrainingListScreen;
