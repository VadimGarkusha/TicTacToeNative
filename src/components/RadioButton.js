import React from 'react';
import {StyleSheet, TouchableHighlight, Text} from 'react-native';

const RadioButton = function ({text, isSelected, onClick}) {
  return (
    <TouchableHighlight
      underlayColor="rgba(139, 104, 227, 0.72)"
      activeOpacity={1}
      style={
        isSelected
          ? [styles.touchableButton, styles.purpleBackground]
          : styles.touchableButton
      }
      onPress={onClick}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  touchableButton: {
    flex: 1,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    marginHorizontal: '1%',
  },
  buttonText: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
  },
  purpleBackground: {
    backgroundColor: '#8966E3',
  },
});

export default RadioButton;
