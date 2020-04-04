import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './src/HomeScreen';
import { CameraScreen } from './src/CameraScreen';
import { RootStackParamList } from './src/data/RouteTypes';
import { ThemeContext, getTheme} from 'react-native-material-ui'

const RootStack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    // <ThemeContext.Provider value={getTheme(light)}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Home">
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen name="Camera" component={CameraScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    // </ThemeContext.Provider>
  );
};

export default App;
