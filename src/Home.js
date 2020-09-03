import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';
import GameConfiguration from './GameConfiguration';

const Home = function ({navigation}) {
  const [state, setState] = React.useState({
    isAgainstAi: true,
    isThreeByThree: true,
    isNewGamePressed: false,
  });

  const togglePlayerSetting = () => {
    setState({...state, isAgainstAi: !state.isAgainstAi});
  };

  const toggleFieldSize = () => {
    setState({...state, isThreeByThree: !state.isThreeByThree});
  };

  const toggleNewGameIsPressed = (isNewGamePressed) => {
    setState({...state, isNewGamePressed});
  };

  const navigateToGame = () => {
    const players = {
      playerOneName: state.isAgainstAi ? 'Player' : 'Player 1',
      playerTwoName: state.isAgainstAi ? 'AI' : 'Player 2',
    };

    navigation.navigate('Game', players);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.newGameArea}>
        <TouchableHighlight
          style={
            state.isNewGamePressed
              ? [styles.newGameButton, styles.pressedButtonText]
              : styles.newGameButton
          }
          underlayColor="#fff"
          onHideUnderlay={() => toggleNewGameIsPressed(false)}
          onShowUnderlay={() => toggleNewGameIsPressed(true)}
          onPress={navigateToGame}>
          <Text
            style={
              state.isNewGamePressed
                ? [styles.newGameText, styles.pressedButtonText]
                : styles.newGameText
            }>
            New Game
          </Text>
        </TouchableHighlight>
        <View style={styles.configurationContainerView}>
          <GameConfiguration
            isFirstOptionSelected={state.isAgainstAi}
            toggleOption={togglePlayerSetting}
            optionOne="AI"
            optionTwo="2 Players"
          />
          <GameConfiguration
            isFirstOptionSelected={state.isThreeByThree}
            toggleOption={toggleFieldSize}
            optionOne="3X3"
            optionTwo="4X4"
          />
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
  newGameArea: {
    marginHorizontal: 10,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  newGameButton: {
    width: '90%',
    borderColor: '#fff',
    borderWidth: 2,
    paddingVertical: 10,
  },
  pressedButtonText: {
    color: '#D1DF2C',
  },
  newGameText: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
  },
  configurationContainerView: {
    flexDirection: 'column',
    marginTop: 20,
    width: '90%',
  },
});

export default Home;
