import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faRedo} from '@fortawesome/free-solid-svg-icons';

const GameHeader = function ({playerOne, playerTwo, isXTurn}) {
  return (
    <View style={styles.gameHeaderView}>
      <View style={[styles.iconView, styles.sectionView]}>
        <FontAwesomeIcon size={45} color="white" icon={faHome} />
      </View>
      <View style={styles.sectionView}>
        <View
          style={[styles.playerCharView, isXTurn ? styles.purpleBorder : null]}>
          <Text
            style={[styles.playerChar, isXTurn ? styles.purpleColor : null]}>
            X
          </Text>
        </View>
        <Text style={styles.playerText}>{playerOne}</Text>
      </View>
      <View style={styles.sectionView}>
        <View
          style={[
            styles.playerCharView,
            !isXTurn ? styles.purpleBorder : null,
          ]}>
          <Text
            style={[styles.playerChar, !isXTurn ? styles.purpleColor : null]}>
            O
          </Text>
        </View>
        <Text style={styles.playerText}>{playerTwo}</Text>
      </View>
      <View style={[styles.iconView, styles.sectionView]}>
        <FontAwesomeIcon size={41} color="white" icon={faRedo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gameHeaderView: {
    marginHorizontal: 10,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  playerText: {
    color: '#fff',
    fontSize: 24,
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
});

export default GameHeader;
