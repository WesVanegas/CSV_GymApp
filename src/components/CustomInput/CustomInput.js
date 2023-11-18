import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';

const CustomInput = ({
  control,
  name,
  value,
  rules = {},
  placeholder,
  secureTextEntry,
  keyboardType,
}) => {
  //const [text, onChangeText] = React.useState('');
  return (
    <View style={styles.container}>
      {/*<TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
        */}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
          <>
            <View
              style={[
                styles.container,
                {borderColor: error ? 'red' : '#e8e8e8'},
              ]}>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
              />
            </View>
            {error && (<Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>)}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  input: {
    //height: 40,
    //margin: 12,
    //borderWidth: 1,
    //padding: 10,
  },
});

export default CustomInput;
