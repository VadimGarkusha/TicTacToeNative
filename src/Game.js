import React from 'react';
import {SafeAreaView, Text, StatusBar, StyleSheet, View} from 'react-native';
import Square from './Square';
import GameHeader from './GameHeader';
import {isAnyPlayerWon} from './GameUtilities';

const defaultState = {
  isXTurn: true,
  playedSquares: [],
  isGameOver: false,
  wonSquares: [],
};

const Game = function ({route}) {
  const [state, setState] = React.useState(defaultState);

  const {playerOneName, playerTwoName} = route.params;

  const toggleTurnChar = (squareId) => {
    const newPlayedSquares = [
      ...state.playedSquares,
      [...squareId, state.isXTurn ? 'X' : 'O'],
    ];

    const isPlayerWon = isAnyPlayerWon(newPlayedSquares);
    const isGameOver = isPlayerWon || newPlayedSquares === 9;

    setState({
      ...state,
      isXTurn: !state.isXTurn,
      playedSquares: newPlayedSquares,
      isGameOver,
      wonSquares: isPlayerWon || [],
    });
  };

  const restartGame = () => {
    setState(defaultState);
  };

  const getDisplayedChar = (i, j) =>
    state.playedSquares.find((s) => s[0] === i && s[1] === j)
      ? state.playedSquares.find((s) => s[0] === i && s[1] === j)[2]
      : '';
  const isWonSquare = (i, j) =>
    state.wonSquares.some((e) => e[0] === i && e[1] === j);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <GameHeader
        playerOne={playerOneName}
        playerTwo={playerTwoName}
        isXTurn={state.isXTurn}
        restartGame={restartGame}
        isGameOver={state.isGameOver}
      />
      <View style={styles.gameArea}>
        {[...Array(3)].map((e, i) => (
          <View style={styles.gameRow} key={i}>
            {[...Array(3)].map((e, j) => (
              <Square
                isXTurn
                toggleTurnChar={toggleTurnChar}
                displayedChar={getDisplayedChar(i, j)}
                squareId={[i, j]}
                isGameOver={state.isGameOver}
                isWonSquare={isWonSquare(i, j)}
                key={j}
              />
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
