import React from 'react';
import {SafeAreaView, Text, StatusBar, StyleSheet, View} from 'react-native';
import Square from './Square';
import GameHeader from './GameHeader';
import {isGameOverCheck} from './GameUtilities';

const Game = function ({route}) {
  const [state, setState] = React.useState({
    isXTurn: true,
    playedSquares: [],
    isGameOver: false,
  });

  const {playerOneName, playerTwoName} = route.params;

  const toggleTurnChar = (squareId) => {
    const newPlayedSquares = [
      ...state.playedSquares,
      [...squareId, state.isXTurn ? 'X' : 'O'],
    ];

    const isGameOver =
      isGameOverCheck(newPlayedSquares) || newPlayedSquares === 9;

    setState({
      ...state,
      isXTurn: !state.isXTurn,
      playedSquares: newPlayedSquares,
      isGameOver,
    });
  };

  const restartGame = () => {
    setState({
      isXTurn: true,
      playedSquares: [],
      isGameOver: false,
    });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <GameHeader
        playerOne={playerOneName}
        playerTwo={playerTwoName}
        isXTurn={state.isXTurn}
        restartGame={restartGame}
      />
      <View style={styles.gameArea}>
        {[...Array(3)].map((e, i) => (
          <View style={styles.gameRow} key={i}>
            {[...Array(3)].map((e, j) => (
              <Square
                isXTurn
                toggleTurnChar={toggleTurnChar}
                displayedChar={
                  state.playedSquares.find((s) => s[0] === i && s[1] === j)
                    ? state.playedSquares.find(
                        (s) => s[0] === i && s[1] === j,
                      )[2]
                    : ''
                }
                squareId={[i, j]}
                isGameOver={state.isGameOver}
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
