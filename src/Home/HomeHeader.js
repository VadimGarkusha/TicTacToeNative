import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  Animated,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCog, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

const HomeHeader = function ({}) {
  return (
    <View style={styles.headerView}>
      <TouchableHighlight
        style={[styles.iconView, styles.sectionView]}
        // onPress={() => {
        //   navigation.navigate('Home');
        // }}
        underlayColor="#D1DF2C"
        activeOpacity={0.9}>
        <FontAwesomeIcon size={45} color="white" icon={faCog} />
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.iconView, styles.sectionView]}
        // onPress={restartGame}
        underlayColor="#D1DF2C"
        activeOpacity={0.9}>
        <FontAwesomeIcon size={41} color="white" icon={faShoppingCart} />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    marginHorizontal: '6%',
    height: 130,
    paddingTop: 10,
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
    alignItems: 'center',
  },
  purpleBorder: {
    borderColor: '#8966E3',
  },
  purpleColor: {
    color: '#8966E3',
  },
});

export default HomeHeader;
