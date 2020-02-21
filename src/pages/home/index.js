import * as React from 'react';
import {View, Text, Button} from 'react-native';

const HomeScreen = props => {
  React.useEffect(() => {
    console.log('homeDidMount');
    return () => {
      console.log('homeDidUnMount');
    };
  }, []);
  React.useEffect(() => {
    props.navigation.addListener('didBlur', payload => {
      // console.debug('didBlur', payload);
    });
  }, []);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <View style={{margin: 10}}>
        <Button
          title="navigate to Details"
          onPress={() => props.navigation.navigate('Details')}
        />
      </View>
      <View style={{margin: 10}}>
        <Button
          title="push to Details"
          onPress={() => props.navigation.push('Details')}
        />
      </View>
      <Button title="Go Back" onPress={() => props.navigation.goBack()} />
    </View>
  );
};

export default HomeScreen;
