import React from 'react';
import {SafeAreaView, Text, StatusBar, StyleSheet, View} from 'react-native';
import Square from './Square';
import GameHeader from './GameHeader';

const Game = function () {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <GameHeader />
      <View style={styles.gameArea}>
        <View style={styles.gameRow}>
          <Square />
          <Square />
          <Square />
        </View>
        <View style={styles.gameRow}>
          <Square />
          <Square />
          <Square />
        </View>
        <View style={styles.gameRow}>
          <Square />
          <Square />
          <Square />
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
  gameArea: {
    borderWidth: 4,
    borderColor: '#20232a',
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
