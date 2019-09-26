import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { RNCamera } from 'react-native-camera'

export default class Camera extends Component {

    // handlePress() {
    //     if(this.camera != null) {
    //         console.warn(RNCamera.Constants.CameraStatus)
    //     }
    // }

    // componentDidMount() {
    //     Permissions.request('camera').then(response => {
    //         console.log(response)
    //     })

    //     if(this.camera === undefined) {
    //         console.warn("undefined")
    //     }

    //     if(this.camera != null) {
    //         console.warn(this.camera.state)
    //     } 
    // }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ (ref) => {
                        this.camera = ref
                    } }
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    onStatusChange={ (camera) => {
                        console.warn(camera.cameraStatus)
                    }}
                    onMountError={ (error) => {
                        console.warn(error.message)
                    }}
                    onCameraReady={this.takePicture}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    captureAudio={false}
                />

                {/* { this.camera != null &&
                    <Text>Has camera: {this.camera.state}</Text>
                }

                { this.camera === null &&
                    <Text>
                        No camera
                    </Text>
                } */}

                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> SNAP </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    takePicture = async() => {
        if (this.camera) {
          const options = { quality: 0.5, base64: true };
          const data = await this.camera.takePictureAsync(options);
          console.log(data.uri);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "black"
    },
    preview: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    }
})