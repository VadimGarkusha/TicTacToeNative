import React, {useState} from 'react';
import {StyleSheet, TouchableHighlight, Text} from 'react-native';

const MainButton = function ({text, onClick}) {
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  return (
    <TouchableHighlight
      style={styles.touchableButton}
      underlayColor="#fff"
      onHideUnderlay={() => setIsButtonPressed(false)}
      onShowUnderlay={() => setIsButtonPressed(true)}
      onPress={onClick}>
      <Text
        style={
          isButtonPressed
            ? [styles.buttonText, styles.pressedButtonText]
            : styles.buttonText
        }>
        {text}
      </Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  touchableButton: {
    width: '100%',
    borderColor: '#fff',
    borderWidth: 2,
    paddingVertical: 10,
  },
  pressedButtonText: {
    color: '#D1DF2C',
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default MainButton;
