import React from 'react';
import {TouchableHighlight, StyleSheet, View, Text} from 'react-native';

const Square = function () {
  const [state, setState] = React.useState({
    isPressed: false,
    isDisabled: false,
  });

  const toggleIsPressed = (isPressed) => {
    setState({...state, isPressed});
  };

  const buttonClick = () => {
    if (!state.isDisabled) {
      console.log('HELLO');
      setState({...state, isDisabled: true});
    }
  };

  return (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor={!state.isDisabled ? '#d2db63' : '#D1DF2C'}
      style={[
        styles.touchable,
        state.isPressed && !state.isDisabled
          ? styles.touchablePress
          : styles.touchableNormal,
      ]}
      onHideUnderlay={() => toggleIsPressed(false)}
      onShowUnderlay={() => toggleIsPressed(true)}
      onPress={buttonClick}>
      <Text> </Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    borderWidth: 2,
    aspectRatio: 1,
    borderRadius: 10,
    margin: 2,
  },
  touchablePress: {
    borderColor: '#8966E3',
  },
  touchableNormal: {
    borderColor: '#fff',
  },
  button: {
    width: '100%',
    height: '100%',
  },
});

export default Square;
