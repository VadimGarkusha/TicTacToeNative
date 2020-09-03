import React from 'react';
import {StyleSheet, View, TouchableHighlight, Text} from 'react-native';

const GameConfiguration = function ({
  optionOne,
  optionTwo,
  isFirstOptionSelected,
  toggleOption,
}) {
  const toggleSelectedOption = (isCallerFirstOption) => {
    if (
      !(isCallerFirstOption && isFirstOptionSelected) &&
      (isCallerFirstOption || isFirstOptionSelected)
    ) {
      toggleOption();
    }
  };

  return (
    <View style={styles.configurationView}>
      <TouchableHighlight
        style={
          isFirstOptionSelected
            ? [styles.configurationOption, styles.purpleBackground]
            : styles.configurationOption
        }
        onPress={() => toggleSelectedOption(true)}>
        <Text style={styles.configurationOptionText}>{optionOne}</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={
          !isFirstOptionSelected
            ? [styles.configurationOption, styles.purpleBackground]
            : styles.configurationOption
        }
        onPress={() => toggleSelectedOption(false)}>
        <Text style={styles.configurationOptionText}>{optionTwo}</Text>
      </TouchableHighlight>
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
  configurationOption: {
    flex: 1,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
  },
  configurationOptionText: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
  },
  purpleBackground: {
    backgroundColor: '#8966E3',
  },
});

export default GameConfiguration;
