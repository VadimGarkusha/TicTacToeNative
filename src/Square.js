import React from 'react';
import {TouchableHighlight, StyleSheet, Text} from 'react-native';

const Square = function ({
  toggleTurnChar,
  squareId,
  displayedChar,
  isGameOver,
}) {
  const [state, setState] = React.useState({
    isPressed: false,
  });

  const toggleIsPressed = (isPressed) => {
    setState({...state, isPressed});
  };

  const buttonClick = () => {
    if (!displayedChar && !isGameOver) {
      toggleTurnChar(squareId);
    }
  };

  return (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor={!displayedChar ? '#d2db63' : '#D1DF2C'}
      style={[
        styles.touchable,
        state.isPressed && !displayedChar
          ? styles.touchablePress
          : styles.touchableNormal,
      ]}
      onHideUnderlay={() => toggleIsPressed(false)}
      onShowUnderlay={() => toggleIsPressed(true)}
      onPress={buttonClick}>
      <Text style={styles.char}>{displayedChar}</Text>
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
    justifyContent: 'center',
  },
  touchablePress: {
    borderColor: '#8966E3',
  },
  touchableNormal: {
    borderColor: '#fff',
  },
  char: {
    color: '#fff',
    fontSize: 70,
    textAlign: 'center',
  },
});

export default Square;
