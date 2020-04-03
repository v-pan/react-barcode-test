import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"

export type RootStackParamList = {
    Home: { data: any } | undefined;
    Camera: undefined;
}

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>
