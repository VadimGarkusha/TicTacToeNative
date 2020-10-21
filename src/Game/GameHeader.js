import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faRedo} from '@fortawesome/free-solid-svg-icons';
import Video from 'react-native-video';
import DefaultSound from '../../assets/sfx/default.mp4';
import NewGameSound from '../../assets/sfx/new_game.mp4';
import AppContext from '../AppContext';

const GameHeader = function ({
  playerOne,
  playerTwo,
  isXTurn,
  restartGame,
  isGameOver,
  winnerName,
}) {
  let backHomeButtonSound, newGameButtonSound;

  const navigation = useNavigation();
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [state, setState] = useState({
    isBackHomeButtonSoundPaused: true,
    isNewGameButtonSoundPaused: true,
  });

  const userContext = useContext(AppContext);
  const {sfxEnabled} = userContext;

  if (isGameOver) {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 4000,
          delay: 0,
          useNativeDriver: false,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: false,
        }),
      ]),
      {
        iterations: 100,
      },
    ).start();
  }

  const animatedColor = animation.interpolate({
    inputRange: [0.0833, 0.25, 0.4166, 0.5833, 0.75, 0.9166],
    outputRange: [
      'rgb(137,102,227)',
      'rgb(48,173,187)',
      'rgb(48,187,72)',
      'rgb(209,223,44)',
      'rgb(91,56,209)',
      'rgb(204,52,52)',
    ],
  });

  useEffect(() => {
    if (state.isNewGameButtonSoundPaused) {
      newGameButtonSound.seek(0);
    }
  }, [state.isNewGameButtonSoundPaused]);

  useEffect(() => {
    if (state.isBackHomeButtonSoundPaused) {
      backHomeButtonSound.seek(0);
    }
  }, [state.isBackHomeButtonSoundPaused]);

  return (
    <View style={styles.gameHeaderView}>
      <View style={styles.topHeaderView}>
        <TouchableHighlight
          style={[styles.iconView, styles.sectionView]}
          onPress={() => {
            setState({...state, isBackHomeButtonSoundPaused: false});
            navigation.navigate('Home');
          }}
          underlayColor="#D1DF2C"
          activeOpacity={0.9}>
          <FontAwesomeIcon size={45} color="white" icon={faHome} />
        </TouchableHighlight>
        <View style={styles.sectionView}>
          <View
            style={[
              styles.playerCharView,
              isXTurn && !isGameOver ? styles.purpleBorder : {},
            ]}>
            <Text
              style={[
                styles.playerChar,
                isXTurn && !isGameOver ? styles.purpleColor : {},
              ]}>
              X
            </Text>
          </View>
          <Text style={styles.playerText}>{playerOne}</Text>
        </View>
        <View style={styles.sectionView}>
          <View
            style={[
              styles.playerCharView,
              !isXTurn && !isGameOver ? styles.purpleBorder : {},
            ]}>
            <Text
              style={[
                styles.playerChar,
                !isXTurn && !isGameOver ? styles.purpleColor : {},
              ]}>
              O
            </Text>
          </View>
          <Text style={styles.playerText}>{playerTwo}</Text>
        </View>
        <TouchableHighlight
          style={[styles.iconView, styles.sectionView]}
          onPress={() => {
            setState({...state, isNewGameButtonSoundPaused: false});
            restartGame();
          }}
          underlayColor="#D1DF2C"
          activeOpacity={0.9}>
          <FontAwesomeIcon size={41} color="white" icon={faRedo} />
        </TouchableHighlight>
      </View>
      {isGameOver && (
        <View style={styles.bottomHeaderView}>
          <Animated.Text
            style={[styles.winnerText, {backgroundColor: animatedColor}]}>
            {winnerName ? `${winnerName} won` : 'Draw'}
          </Animated.Text>
        </View>
      )}
      <Video
        source={DefaultSound}
        audioOnly={true}
        ref={(ref) => {
          backHomeButtonSound = ref;
        }}
        onEnd={() => {
          setState({...state, isBackHomeButtonSoundPaused: true});
        }}
        paused={state.isBackHomeButtonSoundPaused}
        muted={!sfxEnabled}
      />
      <Video
        source={NewGameSound}
        audioOnly={true}
        ref={(ref) => {
          newGameButtonSound = ref;
        }}
        onEnd={() => {
          setState({...state, isNewGameButtonSoundPaused: true});
        }}
        paused={state.isNewGameButtonSoundPaused}
        muted={!sfxEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  gameHeaderView: {
    marginHorizontal: 10,
    height: 155,
    paddingTop: 10,
    flexDirection: 'column',
  },
  topHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
  },
  playerCharView: {
    borderWidth: 2,
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    borderColor: '#fff',
    justifyContent: 'center',
  },
  playerChar: {
    color: '#fff',
    fontSize: 30,
    borderColor: '#20232a',
    textAlign: 'center',
  },
  iconView: {
    paddingTop: 5,
  },
  sectionView: {
    flex: 1,
    alignItems: 'center',
  },
  purpleBorder: {
    borderColor: '#8966E3',
  },
  purpleColor: {
    color: '#8966E3',
  },
  bottomHeaderView: {
    marginTop: 50,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
  },
  winnerText: {
    textAlign: 'center',
    fontSize: 26,
    paddingVertical: 12,
    textAlignVertical: 'center',
    color: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default GameHeader;
