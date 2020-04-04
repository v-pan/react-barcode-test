import React from 'react'
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'

export const PendingView: React.FC = () => {
    return (
        <View style={styles.root}>
            <ActivityIndicator animating={true} />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})