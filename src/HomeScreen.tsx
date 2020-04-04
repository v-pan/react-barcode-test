import React, {useEffect, useState, useRef} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { HomeScreenNavigationProp, HomeScreenRouteProp } from './data/RouteTypes';
import { TakePictureResponse } from 'react-native-camera';
import { FoodFactsEntry } from './data/FoodFactsEntry';
import { PendingView } from './components/common/PendingView';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-material-ui';
import { IngredientsView } from './components/item/IngredientsView';

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

export const HomeScreen = ({navigation, route} : Props ) => {
  const [cameraData, setCameraData] : [TakePictureResponse, any] = useState(undefined)
  const [entry, setEntry] : [FoodFactsEntry, any] = useState(undefined)
  const [loadingProduct, setLoadingProduct] = useState(false)
  const _isMounted = useRef(true)

  const fetchEntry = async (barcode: number) => {
    if(_isMounted) {
      const value = await fetch("https://world.openfoodfacts.org/api/v0/product/" + barcode + ".json");
      setEntry(await value.json());
      setLoadingProduct(false);
    }
  }

  useEffect(() => {
    if (route.params?.cameraData) {
      const result = route.params.cameraData;

      setCameraData(result);
      setLoadingProduct(true);
      fetchEntry(737628064502);
    }

    return () => {
      _isMounted.current = false
    }
  }, [route.params?.cameraData]);

  return (
    <View style={viewStyles.rootView}>
      <View style={viewStyles.body}>
        { (entry !== undefined) ? 
          <ScrollView style={viewStyles.entryView}>
              <View style={entryStyles.title}>
                <Text style={textStyles.headerText}>
                  {entry.product.product_name}
                </Text>
              </View>
              <Card style={entryStyles.description}>
                <IngredientsView />
              </Card>
          </ScrollView>
        : (loadingProduct == true) ?
          <PendingView />
        :
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Please scan a barcode</Text>
          </View>
        }
        <View>
          <Text>Uri: {cameraData?.uri ? cameraData.uri : "None"}</Text>
        </View>
        <View>
          <Text>Entry: {entry?.code ? entry.code : "None"}</Text>
        </View>
      </View>
      <View style={viewStyles.footer}>
        <Button
          title="Open camera"
          onPress={() => {
            navigation.push('Camera');
          }}
        />
      </View>
    </View>
  );
};

const viewStyles = StyleSheet.create({
  rootView: {
    flex: 1,
    // padding: 15,
    // backgroundColor: '#DDDDDD'
  },
  body: {
    flex: 1,
    // backgroundColor: '#DDFFFF'
  },
  footer: {
    // backgroundColor: '#FFFFDD'
  },

  entryView: {
    flex: 1
  },
});

const textStyles = StyleSheet.create({
  headerText: {
    fontSize: 24
  },
})

const entryStyles = StyleSheet.create({
  title: {
    alignItems: 'center',
  },
  description: {
    
  }
})