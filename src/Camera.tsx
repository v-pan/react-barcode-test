import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { Button } from 'react-native-material-ui'
import { observable, flow, action } from 'mobx'
import { observer } from 'mobx-react'
import Permissions from 'react-native-permissions';

@observer
export class Camera extends Component {

    private camera: RNCamera | null | undefined = undefined

    handlePress() {
        if(this.camera != null) {
            console.warn(RNCamera.Constants.CameraStatus)
        }
    }

    componentDidMount() {
        Permissions.request('camera').then(response => {
            console.log(response)
        })

        if(this.camera != null) {
            console.warn(this.camera.state)
        }
    }

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
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        console.warn(barcodes);
                    }}
                    captureAudio={false}
                />

                {/* { this.camera != null &&
                    <Text>Has camera: {this.camera.state}</Text>
                } */}

                { this.camera === null &&
                    <Text>
                        No camera
                    </Text>
                }

                <View style={{flex:1}}>
                    <Button text="Test" onPress={() => this.handlePress}/>
                </View>
            </View>
        )
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