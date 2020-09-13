import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View, TouchableHighlight, Text} from 'react-native';
import Video from 'react-native-video';
import ChangeConfigSound from '../../assets/sfx/change_config.mp4';
import AppContext from '../AppContext';

const GameRadioSettings = function ({
  isFirstOptionSelected,
  toggleOption,
  title,
}) {
  const [isChangedConfigSoundPaused, setIsChangedConfigSoundPaused] = useState(
    true,
  );
  let changeConfigSound;

  const userContext = useContext(AppContext);
  const {sfxEnabled} = userContext;

  useEffect(() => {
    if (isChangedConfigSoundPaused) {
      changeConfigSound.seek(0);
    }
  }, [isChangedConfigSoundPaused]);

  const toggleSelectedOption = (isCallerFirstOption) => {
    if (
      !(isCallerFirstOption && isFirstOptionSelected) &&
      (isCallerFirstOption || isFirstOptionSelected)
    ) {
      setIsChangedConfigSoundPaused(false);
      toggleOption();
    }
  };

  return (
    <View style={styles.configurationView}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.radioView}>
        <TouchableHighlight
          style={
            isFirstOptionSelected
              ? [styles.configurationOption, styles.purpleBackground]
              : styles.configurationOption
          }
          onPress={() => toggleSelectedOption(true)}>
          <Text style={styles.configurationOptionText}>On</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={
            !isFirstOptionSelected
              ? [styles.configurationOption, styles.purpleBackground]
              : styles.configurationOption
          }
          onPress={() => toggleSelectedOption(false)}>
          <Text style={styles.configurationOptionText}>Off</Text>
        </TouchableHighlight>
      </View>
      <Video
        source={ChangeConfigSound}
        audioOnly={true}
        ref={(ref) => {
          changeConfigSound = ref;
        }}
        onEnd={() => {
          setIsChangedConfigSoundPaused(true);
        }}
        paused={isChangedConfigSoundPaused}
        muted={!sfxEnabled}
      />
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
  titleText: {
    color: '#fff',
    fontSize: 24,
    flex: 1,
  },
  radioView: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default GameRadioSettings;
