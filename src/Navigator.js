import HomeScreen from './screens/HomeScreen';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import CameraScreen from './screens/CameraScreen';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Camera: CameraScreen
  },
  {
    initialRouteName: 'Home'
  }
);

export default createAppContainer(AppNavigator)
