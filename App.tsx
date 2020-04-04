import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './src/HomeScreen';
import { CameraScreen } from './src/CameraScreen';
import { RootStackParamList } from './src/data/RouteTypes';
import { Provider as PaperProvider } from "react-native-paper";

const RootStack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <RootStack.Navigator initialRouteName="Home">
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen name="Camera" component={CameraScreen} />
        </RootStack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
