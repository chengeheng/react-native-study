import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const HomeScreen = props => {
  return (
    <View style={styles.main}>
      <Text>HomeScreen</Text>
      <View style={styles.button}>
        <Button
          onPress={e => {
            props.navigation.navigate('Details');
          }}
          title={'navigate to Details'}></Button>
      </View>
      <View style={styles.button}>
        <Button
          onPress={e => {
            props.navigation.push('Details');
          }}
          title={'push to Details'}></Button>
      </View>
      <View style={styles.button}>
        <Button
          onPress={e => {
            props.navigation.goBack();
          }}
          title={'go Back'}></Button>
      </View>
      <View style={styles.button}>
        <Button
          onPress={e => {
            props.navigation.popToTop();
          }}
          title={'popToTop'}></Button>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10,
  },
});
