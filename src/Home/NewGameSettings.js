import React from 'react';
import {View, StyleSheet} from 'react-native';
import {_homeBannerId} from '../Constants';
import DoubleRadioButtons from '../components/DoubleRadioButtons';

const NewGameSettings = function ({
  isThreeByThree,
  isAgainstAi,
  isAiBasicLevel,
  toggleFieldSize,
  togglePlayerSetting,
}) {
  return (
    <View style={styles.configurationContainerView}>
      <DoubleRadioButtons
        isFirstOptionSelected={isThreeByThree}
        toggleOption={toggleFieldSize}
        optionOne="3X3"
        optionTwo="4X4"
        viewStyles={styles.radioButtonsView}
      />
      <DoubleRadioButtons
        isFirstOptionSelected={isAgainstAi}
        toggleOption={togglePlayerSetting}
        optionOne="AI"
        optionTwo="2 Players"
        viewStyles={styles.radioButtonsView}
      />
      {!isAgainstAi || (
        <DoubleRadioButtons
          isFirstOptionSelected={isAiBasicLevel}
          toggleOption={toggleFieldSize}
          optionOne="Basic"
          optionTwo="Advanced"
          viewStyles={styles.radioButtonsView}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  configurationContainerView: {
    flexDirection: 'column',
    marginTop: 20,
  },
  radioButtonsView: {
    marginTop: 25,
  },
});

export default NewGameSettings;
