import React from 'react';
import {SafeAreaView, StyleSheet, View, Button} from 'react-native';

const Home = function () {
  const [state, setState] = React.useState({
    isXTurn: true,
  });

  const toggleTurnChar = ({navigation}) => {
    setState({...state, isXTurn: !state.isXTurn});
    return state.isXTurn ? 'X' : 'O';
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.newGameArea}>
        <Button
          title="Go to Jane's profile"
          style={styles.newGameButton}
          onPress={() => navigation.navigate('Profile', {name: 'Jane'})}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#D1DF2C',
  },
  newGameArea: {
    marginHorizontal: 10,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  newGameButton: {
    width: '100%',
    borderColor: '#fff',
    borderWidth: 2,
  },
});

export default Home;
