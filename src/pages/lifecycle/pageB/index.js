import React, {useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Text, Button, StyleSheet} from 'react-native';

const PageB = props => {
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log('useFocusEffect didMount');
      props.navigation.setOptions({
        title: 'new title',
        headerRight: () => (
          <Button onPress={() => alert('This is a button!')} title="Info" />
        ),
      });
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        console.log('useFocusEffect willunMount');
      };
    }, []),
  );
  useEffect(() => {
    console.log('effect didMount');
    return () => {
      console.log('effect willunMount');
    };
  }, []);
  return (
    <View style={styles.main}>
      <Text>lifecycle-B</Text>
      <View style={styles.button}>
        <Button
          onPress={e => {
            props.navigation.navigate('pageA');
          }}
          title={'navigate to pageA'}></Button>
      </View>
      <View style={styles.button}>
        <Button
          onPress={e => {
            props.navigation.push('pageA');
          }}
          title={'push to pageA'}></Button>
      </View>
    </View>
  );
};

export default PageB;

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
