import {View, Text, Pressable, StyleSheet} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {FirebaseContext} from '../firebase';
import {LoginContext} from '../helper/LoginContext';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import CustomInput from '../components/CustomInput';

const LogInScreen = () => {
  const navigation = useNavigation();

  const {loggedIn, setLoggedIn, idUser, setIdUser} = useContext(LoginContext);

  const {firebase} = useContext(FirebaseContext);
  const [userData, setUserData] = useState([]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  useEffect(() => {
    firebase.db.collection('user').onSnapshot(snapshot => {
      setUserData(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        })),
      );
    });
  }, []);

  const onLoginPressed = data => {
    const username = data.username;
    const password = data.password;
    const user = userData.find(user => user.data.username === username);

    //console.log(data.username);
    //console.log(data.password);

    if (user) {
      if (user.data.userState) {
        if (user.data.password == password) {
          console.warn('Successful Login');
          setLoggedIn(true);
          setIdUser(user.id);
          navigation.navigate('HomeScreen');
        } else {
          console.warn('Password Error.');
        }
      } else {
        console.warn('User banned for: ', user.data.banReason);
      }
    } else {
      console.warn('User not found.');
    }
  };

  const onShowUsers = () => {
    const usernames = userData.map(item => item.data.username);
    console.log(usernames);
  };

  return (
    <>
      <View style={styles.container}>
        <Text>{loggedIn}</Text>
        <Text style={{fontSize: 25}}>LogInScreen</Text>

        <Text style={styles.text}>Username:</Text>
        <CustomInput
          name="username"
          placeholder="Enter your username"
          value={username}
          onChangeText={text => setUsername(text)}
          control={control}
          rules={{required: 'Username is required'}}
        />

        <Text style={styles.text}>Password:</Text>
        <CustomInput
          name="password"
          placeholder="Enter your password"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
          control={control}
          rules={{
            required: 'Password is required',
          }}
        />

        <Pressable
          style={styles.pressable}
          onPress={handleSubmit(onLoginPressed)}>
          <Text style={styles.textPressable}> Log in</Text>
        </Pressable>
        {/* 
        <Pressable style={styles.pressable} onPress={onShowUsers}>
          <Text style={styles.textPressable}> show users</Text>
        </Pressable>
        */}

        {/*loggedIn ? (
          <Text>Estás logueado</Text>
        ) : (
          <Text>No estás logueado</Text>
        )*/}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    padding: 20,
    height: 725,
  },
  text: {
    fontSize: 20,
    paddingTop: 50,
  },
  input: {
    textAlign: 'center',
    width: '80%',
    backgroundColor: 'white',
    margin: 5,
    borderWidth: 2,
    borderColor: '#819FF7',
    borderRadius: 10,
  },
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
});

export default LogInScreen;
