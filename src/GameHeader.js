import React from 'react';
import {SafeAreaView, Text, StatusBar, StyleSheet, View} from 'react-native';
import Square from './Square';

const GameHeader = function () {
  return (
    <View style={styles.gameHeaderView}>
      <Text>header</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  gameHeaderView: {
    marginHorizontal: 10,
    height: 100,
  },
});

export default GameHeader;
