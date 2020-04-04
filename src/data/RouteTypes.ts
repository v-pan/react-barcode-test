import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"
import { TakePictureResponse } from "react-native-camera"

export type RootStackParamList = {
    Home: { cameraData: TakePictureResponse } | undefined;
    Camera: undefined;
}

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>
