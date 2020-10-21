import React from 'react';
import {View, StyleSheet} from 'react-native';
import {_homeBannerId} from '../Constants';
import DoubleRadioButtons from '../components/DoubleRadioButtons';
import MultipleRadioButtons from '../components/MultipleRadioButtons';

const NewGameSettings = function ({
  isThreeByThree,
  isAgainstAi,
  aiDifficulty,
  toggleFieldSize,
  togglePlayerSetting,
  toggleDifficulty,
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
        <MultipleRadioButtons
          optionOne="Easy"
          optionTwo="Medium"
          optionThree="Hard"
          selectedOption={aiDifficulty}
          viewStyles={styles.radioButtonsView}
          selectOption={toggleDifficulty}
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
