import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './src/HomeScreen';
import { CameraScreen } from './src/CameraScreen';
import { RootStackParamList } from './src/data/RouteTypes';

const RootStack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Camera" component={CameraScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
