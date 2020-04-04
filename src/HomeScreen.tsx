import React, {useEffect, useState, useRef, Dispatch} from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { HomeScreenNavigationProp, HomeScreenRouteProp } from './data/RouteTypes';
import { TakePictureResponse } from 'react-native-camera';
import { FoodFactsEntry } from './data/FoodFactsEntry';
import { PendingView } from './components/common/PendingView';
import { ScrollView } from 'react-native-gesture-handler';
import { IngredientsCard } from './components/item/IngredientsCard';
import { Text, Divider, Banner } from 'react-native-paper';
import { ProductInfoCard } from './components/item/ProductInfoCard';
import { LocalFoodEntry, newLocalFoodEntry } from './data/LocalFoodEntry';
const translate = require('google-translate-api')

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

type LanguageMode = "original" | "translated";

export const HomeScreen = ({navigation, route} : Props ) => {
  const [cameraData, setCameraData] : [TakePictureResponse, Dispatch<TakePictureResponse>] = useState(undefined);

  const [derivedEntry, setDerivedEntry] : [FoodFactsEntry, Dispatch<FoodFactsEntry>] = useState(undefined);
  const [localEntry, setLocalEntry] : [LocalFoodEntry, Dispatch<LocalFoodEntry>] = useState(undefined);

  const [langMode, setLangMode]: [LanguageMode, Dispatch<LanguageMode>] = useState("original" as LanguageMode);

  // Visibility flags
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [langWarn, setLangWarn] = useState(false);

  const _isMounted = useRef(true);

  useEffect(() => {
    if (route.params?.cameraData) {
      const result = route.params.cameraData;

      setCameraData(result);
      setLoadingProduct(true);
      fetchEntry(5902180550113);
    }

    return () => {
      _isMounted.current = false;
    }
  }, [route.params?.cameraData]);

  useEffect(() => {
    if(derivedEntry !== undefined) {
      const data = newLocalFoodEntry(derivedEntry)

      if(langMode === 'translated') {
        let toTranslate = []
        const sourceText = [data.info.product_name, data.ingredients.ingredients_text]
        for(const text of sourceText) {
          toTranslate.push(translate(text, {to: 'en'}))
        }

        Promise.all(toTranslate).then(result => {
          console.log(sourceText)
          console.log(result)
        })
      }

      console.log(data)
      setLocalEntry(data)
    }
  }, [derivedEntry, langMode, setLocalEntry])

  const fetchEntry = async (barcode: number) => {
    if(_isMounted) {
      const value = await fetch("https://world.openfoodfacts.org/api/v0/product/" + barcode + ".json");

      value.json().then(result => {
        setDerivedEntry(result);
        setLoadingProduct(false);

        if(!(result.product.languages_codes.hasOwnProperty("en"))) {
          console.log("Language: ", result.product.lang);
          setLangWarn(true);
        } else {
          setLangMode('original');
          setLangWarn(false);
        }
      })
    }
  }

  const langAction = (action: LanguageMode) => {
    console.log("User chose " + action + " text")
    setLangMode(action)
    setLangWarn(false)
  }

  return (
    <View style={viewStyles.rootView}>
      <Banner
        visible={langWarn}
        actions={[{
          label: 'Show original', onPress: () => langAction('original')}, {
          label: 'Translate', onPress: () => langAction('translated')}
        ]}>
        This product is not available in your langauge.
      </Banner>

      <View style={viewStyles.body}>
        { (derivedEntry !== undefined) ? 
          <ScrollView style={viewStyles.entryView}>
            <ProductInfoCard entry={localEntry} />

            <Divider style={{marginBottom: 10}}/>

            <IngredientsCard entry={localEntry} />
          </ScrollView>
        : (loadingProduct == true) ?
          <PendingView />
        :
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Please scan a barcode</Text>
          </View>
        }
      </View>
      <View style={viewStyles.footer}>
        <View>
          <Text>Uri: {cameraData?.uri ? cameraData.uri : "None"}</Text>
        </View>
        <View>
          <Text>Entry: {derivedEntry?.code ? derivedEntry.code : "None"}</Text>
        </View>
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
    // backgroundColor: '#DDDDDD'
  },
  body: {
    flex: 1,
    margin: 15,
    backgroundColor: '#DDFFFF'
  },
  footer: {
    backgroundColor: '#FFFFDD'
  },

  entryView: {
    flex: 1
  },
});

const entryStyles = StyleSheet.create({
  title: {
    alignItems: 'center',
  },
  description: {
    
  }
})