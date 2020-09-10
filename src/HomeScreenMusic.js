import React, {useEffect} from 'react';
import Video from 'react-native-video';
import BackgroundMusic from '../assets/sfx/back.mp4';
import NewGameSound from '../assets/sfx/new_game.mp4';
import ChangeConfigSound from '../assets/sfx/change_config.mp4';

const HomeScreenMusic = function ({
  isNewGameSoundPaused,
  resetNewGameSound,
  isPlayerConfigSoundPaused,
  resetPlayerConfigSound,
  isFieldConfigSoundPaused,
  resetFieldConfigSound,
}) {
  let newGameSound, playerConfigSound, fieldConfigSound;

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
      />
      <Video
        source={NewGameSound}
        audioOnly={true}
        ref={(ref) => {
          newGameSound = ref;
        }}
        onEnd={resetNewGameSound}
        paused={isNewGameSoundPaused}
      />
      <Video
        source={ChangeConfigSound}
        audioOnly={true}
        ref={(ref) => {
          playerConfigSound = ref;
        }}
        onEnd={resetPlayerConfigSound}
        paused={isPlayerConfigSoundPaused}
      />
      <Video
        source={ChangeConfigSound}
        audioOnly={true}
        ref={(ref) => {
          fieldConfigSound = ref;
        }}
        onEnd={resetFieldConfigSound}
        paused={isFieldConfigSoundPaused}
      />
    </>
  );
};

export default HomeScreenMusic;
