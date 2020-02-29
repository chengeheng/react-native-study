import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

class DetailScreen extends React.Component {
  static navigationOptions = {
    title: () => '我才是详情',
  };
  render() {
    return (
      <View style={styles.main}>
        <Text>DetailScreen</Text>
        <View style={styles.button}>
          <Button
            title="navigate to Home"
            onPress={e => this.props.navigation.navigate('home')}></Button>
        </View>
        <View style={styles.button}>
          <Button
            title="push to Home"
            onPress={e => this.props.navigation.push('home')}></Button>
        </View>
        <View style={styles.button}>
          <Button
            onPress={e => this.props.navigation.navigate('passParams')}
            title="show detailPage-A"></Button>
        </View>
      </View>
    );
  }
}

export default DetailScreen;

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
