import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
import ChangeConfigSound from '../../assets/sfx/change_config.mp4';
import AppContext from '../AppContext';
import RadioButton from './RadioButton';

const MultipleRadioButtons = function ({
  optionOne,
  optionTwo,
  optionThree,
  selectedOption,
  selectOption,
  viewStyles,
}) {
  let sound;

  const [isSoundPaused, setIsSoundPaused] = useState(true);
  const userContext = useContext(AppContext);
  const {sfxEnabled} = userContext;

  const toggleSelectedOption = (newSelectedOption) => {
    if (selectOption !== selectedOption) {
      setIsSoundPaused(false);
      selectOption(newSelectedOption);
    }
  };

  const resetSound = () => {
    setIsSoundPaused(true);
  };

  useEffect(() => {
    if (isSoundPaused) {
      sound.seek(0);
    }
  }, [isSoundPaused]);

  return (
    <View style={[styles.configurationView, viewStyles]}>
      <Video
        source={ChangeConfigSound}
        audioOnly={true}
        ref={(ref) => {
          sound = ref;
        }}
        onEnd={resetSound}
        paused={isSoundPaused}
        muted={!sfxEnabled}
      />
      <RadioButton
        text={optionOne}
        isSelected={selectedOption === 0}
        onClick={() => toggleSelectedOption(0)}
      />
      <RadioButton
        text={optionTwo}
        isSelected={selectedOption === 1}
        onClick={() => toggleSelectedOption(1)}
      />
      <RadioButton
        text={optionThree}
        isSelected={selectedOption === 2}
        onClick={() => toggleSelectedOption(2)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  configurationView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default MultipleRadioButtons;
