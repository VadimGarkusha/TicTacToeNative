import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  Animated,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faRedo} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

const GameHeader = function ({
  playerOne,
  playerTwo,
  isXTurn,
  restartGame,
  isGameOver,
  winnerName,
}) {
  const navigation = useNavigation();
  const [animation, setAnimation] = useState(new Animated.Value(0));

  if (isGameOver)
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

  return (
    <View style={styles.gameHeaderView}>
      <View style={styles.topHeaderView}>
        <TouchableHighlight
          style={[styles.iconView, styles.sectionView]}
          onPress={() => {
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
          onPress={restartGame}
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
    </View>
  );
};

const styles = StyleSheet.create({
  gameHeaderView: {
    marginHorizontal: 10,
    height: 130,
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
