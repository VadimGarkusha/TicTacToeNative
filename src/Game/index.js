import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {TestIds, BannerAd, BannerAdSize} from '@react-native-firebase/admob';
import {_gameBannerId} from '../Constants';
import Square from './Square';
import GameHeader from './GameHeader';
import MinMaxAi from './MiniMaxAi';
import {isAnyPlayerWon} from './GameUtilities';

const defaultState = (fieldSize) => ({
  isXTurn: true,
  playedSquares: [],
  isGameOver: false,
  wonSquares: [],
  winnerName: '',
  minMaxAi: new MinMaxAi(fieldSize),
});

const Game = function ({route}) {
  const {playerOneName, playerTwoName, fieldSize, isAgainstAi} = route.params;

  const [state, setState] = React.useState(defaultState(fieldSize));

  const toggleTurnChar = (squareId) => {
    let newPlayedSquares = [
      ...state.playedSquares,
      [...squareId, state.isXTurn ? 'X' : 'O'],
    ];
    let winnerName = '';

    let isPlayerWon = isAnyPlayerWon(newPlayedSquares, fieldSize);
    if (isPlayerWon) {
      winnerName = state.isXTurn ? playerOneName : playerTwoName;
    }
    let isGameOver =
      isPlayerWon || newPlayedSquares.length === fieldSize * fieldSize;

    if (!isAgainstAi) {
      setState({
        ...state,
        isXTurn: !state.isXTurn,
        playedSquares: newPlayedSquares,
        isGameOver,
        wonSquares: isPlayerWon || [],
        winnerName,
      });
    } else {
      console.log(state.minMaxAi.getNextAiTurn(newPlayedSquares));

      if (!isGameOver) {
        const nextTurn = state.minMaxAi.getNextAiTurn(newPlayedSquares);
        newPlayedSquares = [...newPlayedSquares, [...nextTurn, 'O']];

        isPlayerWon = isAnyPlayerWon(newPlayedSquares, fieldSize);
        if (isPlayerWon) {
          winnerName = playerTwoName;
        }
        isGameOver =
          isPlayerWon || newPlayedSquares.length === fieldSize * fieldSize;
      }

      setState({
        ...state,
        playedSquares: newPlayedSquares,
        isGameOver,
        wonSquares: isPlayerWon || [],
        winnerName,
      });
    }
  };

  const restartGame = () => {
    setState(defaultState(fieldSize));
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
        winnerName={state.winnerName}
      />
      <View style={styles.gameArea}>
        {[...Array(fieldSize)].map((e, i) => (
          <View style={styles.gameRow} key={i}>
            {[...Array(fieldSize)].map((e, j) => (
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
      <BannerAd
        unitId={__DEV__ ? TestIds.BANNER : _gameBannerId}
        size={BannerAdSize.SMART_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdFailedToLoad={(error) => {
          console.error('Advert failed to load: ', error);
        }}
      />
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
