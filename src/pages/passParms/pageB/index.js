import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const PageB = props => {
  let {source} = props.route.params;
  return (
    <View style={styles.main}>
      <Text>DetailPage-B</Text>
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
      <View style={styles.button}>
        <Button
          title="setParams"
          onPress={e =>
            props.navigation.setParams({
              source: 'pageB by setParams',
            })
          }></Button>
      </View>
      <Text style={{margin: 10}}>the text from others is: {source}</Text>
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
