import React, {useState, useContext} from 'react';
import {Text, StyleSheet, View, TouchableHighlight, Modal} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCog, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import GameRadioSettings from './GameRadioSettings';
import AppContext from '../AppContext';

const HomeHeader = function ({
  playSettingsButtonSound,
  playHeaderCloseButtonSound,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    playSettingsButtonSound();
    setModalVisible(true);
  };

  const userContext = useContext(AppContext);
  const {
    musicEnabled,
    sfxEnabled,
    toggleSfxEnabled,
    toggleMusicEnabled,
  } = userContext;

  return (
    <View style={styles.headerView}>
      <TouchableHighlight
        style={[styles.iconView, styles.sectionView]}
        onPress={openModal}
        underlayColor="#D1DF2C"
        activeOpacity={0.9}>
        <FontAwesomeIcon size={45} color="white" icon={faCog} />
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.iconView, styles.sectionView]}
        // onPress={restartGame}
        underlayColor="#D1DF2C"
        activeOpacity={0.9}>
        <FontAwesomeIcon size={41} color="white" icon={faShoppingCart} />
      </TouchableHighlight>
      <Modal animationType="slide" visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalBody}>
            <Text style={styles.settingsText}>Settings</Text>
            <GameRadioSettings
              isFirstOptionSelected={musicEnabled}
              toggleOption={toggleMusicEnabled}
              title="Music"
            />
            <GameRadioSettings
              isFirstOptionSelected={sfxEnabled}
              toggleOption={toggleSfxEnabled}
              title="SFX"
            />
            <TouchableHighlight
              style={styles.closeTouchable}
              onPress={() => {
                playHeaderCloseButtonSound();
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    marginHorizontal: '6%',
    height: 130,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconView: {
    paddingTop: 5,
  },
  sectionView: {
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D1DF2C',
  },
  modalBody: {
    width: '90%',
    marginBottom: '5%',
  },
  settingsText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 20,
  },
  closeTouchable: {
    marginTop: 40,
    borderColor: '#fff',
    borderWidth: 2,
    paddingVertical: 10,
  },
  closeText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
  },
});

export default HomeHeader;
