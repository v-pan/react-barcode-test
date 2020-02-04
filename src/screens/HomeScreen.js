import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {Button} from 'react-native-material-ui';
import { observer } from 'mobx-react';
import barcodeStore from '../data/barcodeStore';

@observer
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.topContainer}>
          { barcodeStore.state == "done" ? 
            <View>
              { (barcodeStore.json.product.image_url != undefined) ? <Image source={barcodeStore.json.product.image_url}/> : <Text>No image</Text> }
              <Text>
                Product name: { barcodeStore.json.product.product_name }
              </Text>
            </View>
          :
            <Text> Please scan a barcode </Text>
          }
          <Text>{barcodeStore.state}</Text>
        </View>
        
        <View>
          <Button text="Scan Barcode" onPress={() => {
            this.props.navigation.navigate('Camera')}
          }/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  topContainer: {
    flex: 1
  },
  bottomContainer: {
    flex: 1
  }
});
