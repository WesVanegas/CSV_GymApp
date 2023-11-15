import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import React from 'react';

const LogInScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={{fontSize: 25}}>LogInScreen</Text>

        <Text style={styles.text}>Username:</Text>
        <TextInput style={styles.input}></TextInput>

        <Text style={styles.text}>Password:</Text>
        <TextInput style={styles.input} secureTextEntry={true}></TextInput>

        <Pressable style={styles.pressable}>
          <Text style={styles.textPressable}> Log in</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    padding: 20,
    height:725,
  },
  text: {
    fontSize: 20,
    paddingTop: 50,
  },
  input: {
    textAlign:"center",
    width: '80%',
    backgroundColor: 'white',
    margin: 5,
    borderWidth: 2,
    borderColor: "#819FF7",
    borderRadius:10,
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
    fontSize:20,
  },
});

export default LogInScreen;
