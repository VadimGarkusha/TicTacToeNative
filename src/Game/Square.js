import React, {useEffect, useState} from 'react';
import {TouchableHighlight, StyleSheet, Text} from 'react-native';
import PopSound from '../../assets/sfx/pop.mp4';
import Video from 'react-native-video';

const Square = function ({
  toggleTurnChar,
  squareId,
  displayedChar,
  isGameOver,
  isWonSquare,
}) {
  const [state, setState] = useState({
    isPressed: false,
    pauseSound: true,
  });
  let popSound;

  const toggleIsPressed = (isPressed) => {
    setState({...state, isPressed});
  };

  useEffect(() => {
    if (state.pauseSound) {
      popSound.seek(0);
    }
  }, [state.pauseSound]);

  const buttonClick = () => {
    if (!displayedChar && !isGameOver) {
      toggleTurnChar(squareId);
      setState({...state, pauseSound: false});
    }
  };

  const resetVideo = () => {
    setState({...state, pauseSound: true});
  };

  return (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor={!displayedChar ? '#d2db63' : '#D1DF2C'}
      style={[
        styles.touchable,
        (state.isPressed && !displayedChar) || isWonSquare
          ? styles.purpleBorder
          : isGameOver
          ? styles.touchanbleDisabled
          : styles.whiteBorder,
      ]}
      onHideUnderlay={() => toggleIsPressed(false)}
      onShowUnderlay={() => toggleIsPressed(true)}
      onPress={buttonClick}>
      <>
        <Video
          source={PopSound}
          ref={(ref) => {
            popSound = ref;
          }}
          audioOnly={true}
          onEnd={resetVideo}
          paused={state.pauseSound}
        />
        <Text
          style={[
            styles.char,
            isGameOver
              ? isWonSquare
                ? styles.purpleColor
                : styles.touchanbleCharDisabled
              : {},
          ]}>
          {displayedChar}
        </Text>
      </>
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
  purpleBorder: {
    borderColor: '#8966E3',
  },
  purpleColor: {
    color: '#8966E3',
  },
  whiteBorder: {
    borderColor: '#fff',
  },
  touchanbleDisabled: {
    borderColor: '#BCBC6B',
  },
  touchanbleCharDisabled: {
    color: '#BCBC6B',
  },
  char: {
    color: '#fff',
    fontSize: 70,
    textAlign: 'center',
  },
});

export default Square;
