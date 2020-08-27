import React from 'react';
import {SafeAreaView, Text, StatusBar, StyleSheet, View} from 'react-native';

const Game = function () {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.mainView}>
        <View style={styles.gameArea}>
          <Text>Tic Tac Toe</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {
    padding: 30,
    flex: 1,
    justifyContent: 'space-between',
  },
  gameArea: {
    flex: 0.9,
    borderWidth: 4,
    borderColor: '#20232a',
  },
});

export default Game;
