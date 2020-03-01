import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

class PageA extends React.Component {
  render() {
    return (
      <View style={styles.main}>
        <Text>DetailPage-A</Text>
        <View style={styles.button}>
          <Button
            title="navigate to pageB"
            onPress={e =>
              this.props.navigation.navigate('pageB', {
                source: 'navigate from PageA by navigate',
              })
            }></Button>
        </View>
        <View style={styles.button}>
          <Button
            title="push to pageB"
            onPress={e =>
              this.props.navigation.push('pageB', {
                source: 'navigate from PageA by push',
              })
            }></Button>
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
