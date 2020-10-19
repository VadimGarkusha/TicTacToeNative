import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';
import {TestIds, BannerAd, BannerAdSize} from '@react-native-firebase/admob';
import {_homeBannerId} from '../Constants';
import GameConfiguration from './GameConfiguration';
import HomeScreenMusic from './HomeScreenMusic';
import HomeHeader from './HomeHeader';

const Home = function ({navigation}) {
  const [state, setState] = useState({
    isAgainstAi: true,
    isThreeByThree: true,
    isAiBasicLevel: true,
    isNewGamePressed: false,
    isNewGameSoundPaused: true,
    isPlayerConfigSoundPaused: true,
    isFieldConfigSoundPaused: true,
    isSettingsButtonSoundPaused: true,
    isHeaderCloseButtonPaused: true,
  });

  const togglePlayerSetting = () => {
    setState({
      ...state,
      isAgainstAi: !state.isAgainstAi,
      isPlayerConfigSoundPaused: false,
    });
  };

  const toggleFieldSize = () => {
    setState({
      ...state,
      isThreeByThree: !state.isThreeByThree,
      isFieldConfigSoundPaused: false,
    });
  };

  const toggleNewGameIsPressed = (isNewGamePressed) => {
    setState({...state, isNewGamePressed});
  };

  const navigateToGame = () => {
    setState({...state, isNewGameSoundPaused: false});

    const configuration = {
      playerOneName: state.isAgainstAi ? 'Player' : 'Player 1',
      playerTwoName: state.isAgainstAi ? 'AI' : 'Player 2',
      fieldSize: state.isThreeByThree ? 3 : 4,
      isAgainstAi: state.isAgainstAi,
    };

    navigation.navigate('Game', configuration);
  };

  const resetNewGameSound = () => {
    setState({...state, isNewGameSoundPaused: true});
  };

  const resetPlayerConfigSound = () => {
    setState({...state, isPlayerConfigSoundPaused: true});
  };

  const resetFieldConfigSound = () => {
    setState({...state, isFieldConfigSoundPaused: true});
  };

  const resetSettingsButtonSound = () => {
    setState({...state, isSettingsButtonSoundPaused: true});
  };

  const playSettingsButtonSound = () => {
    setState({...state, isSettingsButtonSoundPaused: false});
  };

  const resetHeaderCloseButtonSound = () => {
    setState({...state, isHeaderCloseButtonPaused: true});
  };

  const playHeaderCloseButtonSound = () => {
    setState({...state, isHeaderCloseButtonPaused: false});
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <HomeScreenMusic
        isNewGameSoundPaused={state.isNewGameSoundPaused}
        resetNewGameSound={resetNewGameSound}
        isPlayerConfigSoundPaused={state.isPlayerConfigSoundPaused}
        resetPlayerConfigSound={resetPlayerConfigSound}
        isFieldConfigSoundPaused={state.isFieldConfigSoundPaused}
        resetFieldConfigSound={resetFieldConfigSound}
        isSettingsButtonSoundPaused={state.isSettingsButtonSoundPaused}
        resetSettingsButtonSound={resetSettingsButtonSound}
        isHeaderCloseButtonPaused={state.isHeaderCloseButtonPaused}
        resetHeaderCloseButtonSound={resetHeaderCloseButtonSound}
      />
      <HomeHeader
        playSettingsButtonSound={playSettingsButtonSound}
        playHeaderCloseButtonSound={playHeaderCloseButtonSound}
      />
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
            isFirstOptionSelected={state.isThreeByThree}
            toggleOption={toggleFieldSize}
            optionOne="3X3"
            optionTwo="4X4"
          />
          <GameConfiguration
            isFirstOptionSelected={state.isAgainstAi}
            toggleOption={togglePlayerSetting}
            optionOne="AI"
            optionTwo="2 Players"
          />
          {!state.isAgainstAi || (
            <GameConfiguration
              isFirstOptionSelected={state.isAiBasicLevel}
              toggleOption={toggleFieldSize}
              optionOne="Basic"
              optionTwo="Advanced"
            />
          )}
        </View>
      </View>
      <BannerAd
        unitId={__DEV__ ? TestIds.BANNER : _homeBannerId}
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
  newGameArea: {
    marginHorizontal: 10,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: '20%',
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
