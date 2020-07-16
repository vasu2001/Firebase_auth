import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

interface CustomButtonProps {
  text: string;
  callback: () => void;
  active?: boolean;
}

const CustomButton: React.SFC<CustomButtonProps> = ({
  text,
  callback,
  active = true,
}) => {
  return (
    <TouchableOpacity
      style={{marginVertical: 10}}
      onPress={callback}
      disabled={!active}>
      <View
        style={[
          styles.buttonContainer,
          {backgroundColor: active ? 'black' : 'grey'},
        ]}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 20,
    color: 'white',
    paddingHorizontal: 5,
  },
  buttonContainer: {
    padding: 15,
    borderRadius: 20,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default CustomButton;
