import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {TestIds, BannerAd, BannerAdSize} from '@react-native-firebase/admob';
import {_homeBannerId, _difficultyLevel} from '../Constants';
import NewGameSettings from './NewGameSettings';
import HomeScreenMusic from './HomeScreenMusic';
import HomeHeader from './HomeHeader';
import MainButton from '../components/MainButton';

const Home = function ({navigation}) {
  const [state, setState] = useState({
    isAgainstAi: true,
    isThreeByThree: true,
    isAiBasicLevel: true,
    isNewGamePressed: false,
    isNewGameSoundPaused: true,
    isSettingsButtonSoundPaused: true,
    isHeaderCloseButtonPaused: true,
    aiDifficulty: 0,
  });

  const togglePlayerSetting = () => {
    setState({
      ...state,
      isAgainstAi: !state.isAgainstAi,
    });
  };

  const toggleFieldSize = () => {
    setState({
      ...state,
      isThreeByThree: !state.isThreeByThree,
    });
  };

  const toggleDifficulty = (selectedDifficulty) => {
    setState({
      ...state,
      aiDifficulty: selectedDifficulty,
    });
  };

  const navigateToGame = () => {
    setState({...state, isNewGameSoundPaused: false});

    const configuration = {
      playerOneName: state.isAgainstAi ? 'Player' : 'Player 1',
      playerTwoName: state.isAgainstAi ? 'AI' : 'Player 2',
      fieldSize: state.isThreeByThree ? 3 : 4,
      isAgainstAi: state.isAgainstAi,
      aiDifficulty: state.aiDifficulty,
    };

    navigation.navigate('Game', configuration);
  };

  const resetNewGameSound = () => {
    setState({...state, isNewGameSoundPaused: true});
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
        <MainButton text="New Game" onClick={navigateToGame} />
        <NewGameSettings
          isThreeByThree={state.isThreeByThree}
          isAgainstAi={state.isAgainstAi}
          aiDifficulty={state.aiDifficulty}
          toggleFieldSize={toggleFieldSize}
          togglePlayerSetting={togglePlayerSetting}
          toggleDifficulty={toggleDifficulty}
        />
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
    paddingHorizontal: '5%',
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: '20%',
    width: '100%',
  },
  configurationContainerView: {
    flexDirection: 'column',
    marginTop: 20,
    width: '90%',
  },
});

export default Home;
