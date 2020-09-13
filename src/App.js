import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Game from './Game';
import Home from './Home';
import AppContext from './AppContext';

const Stack = createStackNavigator();

const App = function () {
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [sfxEnabled, setSfxEnabled] = useState(true);

  const toggleMusicEnabled = () => {
    setMusicEnabled(!musicEnabled);
  };

  const toggleSfxEnabled = () => {
    setSfxEnabled(!sfxEnabled);
  };

  const userSettings = {
    musicEnabled,
    sfxEnabled,
    toggleMusicEnabled,
    toggleSfxEnabled,
  };

  return (
    <AppContext.Provider value={userSettings}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Home'}}
          />
          <Stack.Screen name="Game" component={Game} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default App;
