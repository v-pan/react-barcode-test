import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import AppNavigator from './src/Navigator';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <AppNavigator style={styles.navigator}/>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  }
});

export default App;
