import React, { useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import { PendingView } from './components/common/PendingView';
import { PendingModal } from './components/common/PendingModal';

export const CameraScreen = ({navigation}) => {
  const [takingPicture, setTakingPicture] : [boolean, any] = useState(false);

  const takePicture = async (camera: RNCamera) => {
    setTakingPicture(true);
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);

    console.log(data.uri);
    setTakingPicture(false);
    navigation.navigate('Home', {cameraData: data});
  };

  return (
    <View style={styles.container}>

      <PendingModal loading={takingPicture} />

      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        captureAudio={false}>
        {({camera, status}) => {
          if (status !== 'READY') {
            return <PendingView />;
          }
          return (
            <View
              style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.capture}>
                <Text style={{fontSize: 14}}> SNAP </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};

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
