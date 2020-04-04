import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"
import { CameraResponse } from "./CameraResponse"

export type RootStackParamList = {
    Home: { data: CameraResponse } | undefined;
    Camera: undefined;
}

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>
