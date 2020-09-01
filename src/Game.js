import React from 'react';
import {SafeAreaView, Text, StatusBar, StyleSheet, View} from 'react-native';
import Square from './Square';
import GameHeader from './GameHeader';

const Game = function () {
  const [state, setState] = React.useState({
    isXTurn: true,
  });

  const toggleTurnChar = () => {
    setState({...state, isXTurn: !state.isXTurn});
    return state.isXTurn ? 'X' : 'O';
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <GameHeader playerOne="Player" playerTwo="AI" isXTurn={state.isXTurn} />
      <View style={styles.gameArea}>
        <View style={styles.gameRow}>
          <Square isXTurn toggleTurnChar={toggleTurnChar} />
          <Square isXTurn toggleTurnChar={toggleTurnChar} />
          <Square isXTurn toggleTurnChar={toggleTurnChar} />
        </View>
        <View style={styles.gameRow}>
          <Square isXTurn toggleTurnChar={toggleTurnChar} />
          <Square isXTurn toggleTurnChar={toggleTurnChar} />
          <Square isXTurn toggleTurnChar={toggleTurnChar} />
        </View>
        <View style={styles.gameRow}>
          <Square isXTurn toggleTurnChar={toggleTurnChar} />
          <Square isXTurn toggleTurnChar={toggleTurnChar} />
          <Square isXTurn toggleTurnChar={toggleTurnChar} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#D1DF2C',
  },
  gameArea: {
    marginHorizontal: 10,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  gameRow: {
    flexDirection: 'row',
  },
});

export default Game;
