import React from 'react';
import {StatusBar} from 'react-native';
import Game from './src/Game';

const App = function () {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Game />
    </>
  );
};

export default App;
