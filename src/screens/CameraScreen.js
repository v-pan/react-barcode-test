import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { observer, useObserver } from 'mobx-react-lite';

export const CameraScreen = observer(props => {
  let camera

  return (
    <View style={styles.container}>
      <RNCamera
        ref={ref => {
          camera = ref;
        }}

        style={styles.preview}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}

        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}

        onGoogleVisionBarcodesDetected={({ barcodes }) => {
          let receivedCode = barcodes[0].data;

          if(receivedCode) {
            console.log("ML BARCODE: " + receivedCode);

            barcodeStore.code = receivedCode
            barcodeStore.readJson()
            props.navigation.navigate('Home')
          } else {
            console.err("No data in barcode");
          }
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
