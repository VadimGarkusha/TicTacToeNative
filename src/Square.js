import React from 'react';
import {SafeAreaView, Text, StatusBar} from 'react-native';

const Game = function () {
  return (
    <Button
      onPress={onPressLearnMore}
      title="Learn More"
      color="#841584"
      accessibilityLabel="Learn more about this purple button"
    />
  );
};

export default Game;
