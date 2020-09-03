import React from 'react';
import {SafeAreaView, Text, StatusBar, StyleSheet, View} from 'react-native';
import Square from './Square';
import GameHeader from './GameHeader';

const Game = function ({route}) {
  const [state, setState] = React.useState({
    isXTurn: true,
  });

  const {playerOneName, playerTwoName} = route.params;

  const toggleTurnChar = () => {
    setState({...state, isXTurn: !state.isXTurn});
    return state.isXTurn ? 'X' : 'O';
  };

  const isSomebodyWon = () => {};

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <GameHeader
        playerOne={playerOneName}
        playerTwo={playerTwoName}
        isXTurn={state.isXTurn}
      />
      <View style={styles.gameArea}>
        {[...Array(3)].map((e, i) => (
          <View style={styles.gameRow} key={i}>
            {[...Array(3)].map((e, j) => (
              <Square isXTurn toggleTurnChar={toggleTurnChar} key={j} />
            ))}
          </View>
        ))}
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
