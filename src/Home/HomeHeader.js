import React, {useState, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  Modal,
  Linking,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCog, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {_contentRightsUrl} from '../Constants';
import GameRadioSettings from './GameRadioSettings';
import AppContext from '../AppContext';
import MainButton from '../components/MainButton';

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

  const showContentRights = () => {
    Linking.canOpenURL(_contentRightsUrl).then((supported) => {
      if (supported) {
        Linking.openURL(_contentRightsUrl);
      } else {
        console.log("Don't know how to open URI: " + _contentRightsUrl);
      }
    });
  };

  return (
    <View style={styles.headerView}>
      <TouchableHighlight
        style={styles.iconView}
        onPress={openModal}
        underlayColor="#D1DF2C"
        activeOpacity={0.9}>
        <FontAwesomeIcon size={45} color="white" icon={faCog} />
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.iconView, styles.noDisplay]}
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
              style={styles.contentRightsContainer}
              onPress={showContentRights}>
              <Text style={styles.contentRightsText}>Content Rights</Text>
            </TouchableHighlight>
            <MainButton
              text="Close"
              onClick={() => {
                playHeaderCloseButtonSound();
                setModalVisible(!modalVisible);
              }}
            />
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
    alignItems: 'center',
  },
  noDisplay: {
    display: 'none',
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
  contentRightsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
    marginBottom: 40,
  },
  contentRightsText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});

export default HomeHeader;
