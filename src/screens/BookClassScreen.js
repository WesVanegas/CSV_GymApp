import {View, Text,StyleSheet, Pressable} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {LoginContext} from '../helper/LoginContext';
import {useNavigation} from '@react-navigation/native';
import {FirebaseContext} from '../firebase';
import SelectDropdown from 'react-native-select-dropdown';

const BookClassScreen = () => {
  const navigation = useNavigation();
  const {loggedIn, setLoggedIn, idUser, setIdUser} = useContext(LoginContext);
  const {firebase} = useContext(FirebaseContext);
  const [userData, setUserData] = useState([]);
  const [trainingData, setTrainingData] = useState([]);
  const [userLoggedInData, setUserLoggedInData] = useState([]);
  const [trainingNames, setTrainingNames] = useState([]);
  const [selectTraining, setSelectTraining] = useState(false);
  const [trainingUpdate, setTrainingUpdate] = useState('');

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

    firebase.db.collection('Trainings').onSnapshot(snapshot => {
      setTrainingData(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        })),
      );
      const trainingNames = trainingData.map(item => item.data.trainingName);
      setTrainingNames(trainingNames);
    });
  }, []);

  const onCancelPressed = e => {
    e.preventDefault();
    firebase.db.collection('user').doc(idUser).update({trainingAssigned: ''});
    console.warn('Canceled Training');
    navigation.navigate('HomeScreen');
  };

  const onHandleUserData = () => {
    //const Loguser = firebase.db.collection('user').doc(id).get();
    console.log(userLoggedInData);
  };

  const onTrainingUpdatePressed = e => {
    e.preventDefault();
    firebase.db
      .collection('user')
      .doc(idUser)
      .update({trainingAssigned: trainingUpdate});
    setTrainingUpdate('');
    console.warn('Updated Training');
    navigation.navigate('HomeScreen');
  };

  const showSelectTraining = () => {
    const trainingNames = trainingData.map(item => item.data.trainingName);
    setTrainingNames(trainingNames);
    setSelectTraining(!selectTraining);
  };

  return (
    <>
      <View style={style.container}>
        {loggedIn ? (
          <>
            {/* <Text>Estás logueado: {idUser}</Text>*/}

            {userLoggedInData.trainingAssigned === '' ? (
              <>
                <Text style={{fontWeight:'bold', fontSize:15}}>Agendar entrenamiento: </Text>

                {selectTraining ? (
                  <>
                    <SelectDropdown
                      defaultButtonText="Seleccione"
                      data={trainingNames}
                      onSelect={(selectItem, index) => {
                        console.log(selectItem, index);
                        setTrainingUpdate(selectItem);
                      }}
                      buttonTextAfterSelection={(selectItem, index) => {
                        return selectItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                      buttonStyle={style.dropdown1BtnStyle}
                      buttonTextStyle={style.dropdown1BtnTxtStyle}
                    />

                    <Pressable
                      style={style.pressable}
                      onPress={onTrainingUpdatePressed}>
                      <Text style={style.textPressable}>Update Training</Text>
                    </Pressable>
                  </>
                ) : (
                  <Pressable
                    style={style.pressable}
                    onPress={showSelectTraining}>
                    <Text style={style.textPressable}>Select training</Text>
                  </Pressable>
                )}
              </>
            ) : (
              <>
                <Text>
                  Entrenamiento asignado: {userLoggedInData.trainingAssigned}
                </Text>
                <Pressable style={style.pressable} onPress={onCancelPressed}>
                  <Text style={style.textPressable}>Cancel training</Text>
                </Pressable>
              </>
            )}
            {/*
            <Button title="UserLogData" onPress={onHandleUserData} />
             */}

            <Pressable
              style={style.pressable}
              onPress={() => {
                setLoggedIn(false);
                setIdUser('');
                navigation.navigate('LogInScreen');
              }}>
              <Text style={style.textPressable}>Log Out</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text>No estás logueado</Text>
          </>
        )}
      </View>
    </>
  );
};

const style = StyleSheet.create({
  dropdown1BtnStyle: {
    width: '70%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00A897',
    marginRight: 20,
  },
  dropdown1BtnTxtStyle: {color: 'grey', textAlign: 'center'},
  containerPressable: {
    backgroundColor: '#B9C0D5',
    width: '45%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  pressable: {
    backgroundColor: '#819FF7',
    width: '45%',
    padding: 15,
    marginVertical: 25,
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

export default BookClassScreen;
