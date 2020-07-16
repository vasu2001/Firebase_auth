import * as React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export interface CustomInputProps {
  value: string;
  labelText: string;
  onChangeText: (text: string) => void;
  isPassword?: boolean;
  setRef?: (ref: TextInput) => void;
  validated: boolean;
}

const CustomInput: React.SFC<CustomInputProps> = ({
  value,
  labelText,
  onChangeText,
  isPassword = false,
  validated,
  setRef = (ref) => {},
}) => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.labelText}>{labelText}</Text>
      <View
        style={[
          styles.textInputContainer,
          {borderColor: validated ? 'black' : 'red'},
        ]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[styles.textInput]}
          secureTextEntry={isPassword}
          ref={setRef}
        />
        {!validated ? (
          <Icon name="ios-alert-circle-outline" size={20} color="red" />
        ) : null}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 20,
  },
  labelText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInputContainer: {
    height: 50,
    borderWidth: 1,
    borderRadius: 15,
    padding: 2,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    flex: 1,
  },
});
