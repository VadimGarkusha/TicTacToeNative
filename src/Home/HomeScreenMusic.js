import React, {useEffect, useContext} from 'react';
import Video from 'react-native-video';
import BackgroundMusic from '../../assets/sfx/back.mp4';
import NewGameSound from '../../assets/sfx/new_game.mp4';
import ChangeConfigSound from '../../assets/sfx/change_config.mp4';
import AppContext from '../AppContext';

const HomeScreenMusic = function ({
  isNewGameSoundPaused,
  resetNewGameSound,
  isPlayerConfigSoundPaused,
  resetPlayerConfigSound,
  isFieldConfigSoundPaused,
  resetFieldConfigSound,
}) {
  let newGameSound, playerConfigSound, fieldConfigSound;

  const userContext = useContext(AppContext);
  const {musicEnabled, sfxEnabled} = userContext;

  useEffect(() => {
    if (isNewGameSoundPaused) {
      newGameSound.seek(0);
    }
  }, [isNewGameSoundPaused]);

  useEffect(() => {
    if (isPlayerConfigSoundPaused) {
      playerConfigSound.seek(0);
    }
  }, [isPlayerConfigSoundPaused]);

  useEffect(() => {
    if (isFieldConfigSoundPaused) {
      fieldConfigSound.seek(0);
    }
  }, [isFieldConfigSoundPaused]);

  return (
    <>
      <Video
        source={BackgroundMusic} // Can be a URL or a local file.
        audioOnly={true}
        playWhenInactive={true}
        repeat={true}
        muted={!musicEnabled}
      />
      <Video
        source={NewGameSound}
        audioOnly={true}
        ref={(ref) => {
          newGameSound = ref;
        }}
        onEnd={resetNewGameSound}
        paused={isNewGameSoundPaused}
        muted={!sfxEnabled}
      />
      <Video
        source={ChangeConfigSound}
        audioOnly={true}
        ref={(ref) => {
          playerConfigSound = ref;
        }}
        onEnd={resetPlayerConfigSound}
        paused={isPlayerConfigSoundPaused}
        muted={!sfxEnabled}
      />
      <Video
        source={ChangeConfigSound}
        audioOnly={true}
        ref={(ref) => {
          fieldConfigSound = ref;
        }}
        onEnd={resetFieldConfigSound}
        paused={isFieldConfigSoundPaused}
        muted={!sfxEnabled}
      />
    </>
  );
};

export default HomeScreenMusic;
