import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
import ChangeConfigSound from '../../assets/sfx/change_config.mp4';
import AppContext from '../AppContext';
import RadioButton from './RadioButton';

const DoubleRadioButtons = function ({
  optionOne,
  optionTwo,
  isFirstOptionSelected,
  toggleOption,
  viewStyles,
}) {
  let sound;

  const [isSoundPaused, setIsSoundPaused] = useState(true);
  const userContext = useContext(AppContext);
  const {sfxEnabled} = userContext;

  const toggleSelectedOption = (isCallerFirstOption) => {
    if (
      !(isCallerFirstOption && isFirstOptionSelected) &&
      (isCallerFirstOption || isFirstOptionSelected)
    ) {
      setIsSoundPaused(false);
      toggleOption();
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
        isSelected={isFirstOptionSelected}
        onClick={() => toggleSelectedOption(true)}
      />
      <RadioButton
        text={optionTwo}
        isSelected={!isFirstOptionSelected}
        onClick={() => toggleSelectedOption(false)}
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

export default DoubleRadioButtons;
