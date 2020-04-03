import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TypeScriptScreen } from './TypeScriptScreen';
import { HomeScreenNavigationProp, HomeScreenRouteProp } from './data/RouteTypes';

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

export const HomeScreen = ({navigation, route} : Props ) => {
  const [data, setData] = useState(undefined)

  useEffect(() => {
    if (route.params?.data) {
      console.log(route.params.data);
    }
  }, [route.params?.data]);

  return (
    <View style={styles.root}>
      <Text>Home Screen</Text>
      <Button
        title="Open camera"
        onPress={() => {
          navigation.push('Camera');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
