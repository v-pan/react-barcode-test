import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { HomeScreenNavigationProp, HomeScreenRouteProp } from './data/RouteTypes';
import { CameraResponse } from './data/CameraResponse';

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

export const HomeScreen = ({navigation, route} : Props ) => {
  const [data, setData] : [CameraResponse, any] = useState(undefined)

  useEffect(() => {
    if (route.params?.data) {
      const result = route.params.data;

      setData(result);
    }
  }, [route.params?.data]);

  return (
    <View style={styles.root}>
      <View>
        <Text>Home Screen</Text>
        <Button
          title="Open camera"
          onPress={() => {
            navigation.push('Camera');
          }}
        />
      </View>
      <View>
      { data?.uri ?
          <>
            <Text>Uri: {data.uri}</Text>
          </>
        :
          <Text>None</Text>
      }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
});
