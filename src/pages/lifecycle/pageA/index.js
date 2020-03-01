import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

class PageA extends React.Component {
  componentDidMount() {
    console.log('a didMount');
    this.foucuSubscribe = this.props.navigation.addListener('focus', () => {
      console.log('a is focus');
    });
    this.blurSubscribe = this.props.navigation.addListener('blur', () => {
      console.log('a is blur');
    });
  }

  componentWillUnmount() {
    this.foucuSubscribe();
    this.blurSubscribe();
    console.log('a willUnmount');
  }

  render() {
    return (
      <View style={styles.main}>
        <Text>lifecycle-A</Text>
        <View style={styles.button}>
          <Button
            title="navigate to pageB"
            onPress={e => this.props.navigation.navigate('pageB')}></Button>
        </View>
        <View style={styles.button}>
          <Button
            title="push to home"
            onPress={e => this.props.navigation.push('home')}></Button>
        </View>
      </View>
    );
  }
}

export default PageA;

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
