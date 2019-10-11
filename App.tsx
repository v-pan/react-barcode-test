/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
} from 'react-native';
import { Item } from './src/Item';

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="default" />
      <SafeAreaView>
        <View>
          <Item></Item>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};


export default App;
