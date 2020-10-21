import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import DoubleRadioButtons from '../components/DoubleRadioButtons';

const GameRadioSettings = function ({
  isFirstOptionSelected,
  toggleOption,
  title,
}) {
  return (
    <View style={styles.configurationView}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.radioView}>
        <DoubleRadioButtons
          optionOne="On"
          optionTwo="Off"
          isFirstOptionSelected={isFirstOptionSelected}
          toggleOption={toggleOption}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  configurationView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 25,
  },
  titleText: {
    color: '#fff',
    fontSize: 24,
    flex: 1,
    fontWeight: '500',
  },
  radioView: {
    flex: 1,
  },
});

export default GameRadioSettings;
