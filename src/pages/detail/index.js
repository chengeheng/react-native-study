import * as React from 'react';
import {View, Text, Button} from 'react-native';

class DetailsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Details',
    headerRight: () => (
      <Button onPress={() => alert('This is a button!')} title="Info" />
    ),
  };
  componentDidMount() {
    console.log('detailDidMount');
  }
  componentWillUnmount() {
    console.log('detailDidUnMount');
  }
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Details Screen</Text>
        <View style={{margin: 10}}>
          <Button
            title="navigate to Home"
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>
        <View style={{margin: 10}}>
          <Button
            title="push to Home"
            onPress={() => this.props.navigation.push('Home')}
          />
        </View>
        <Button
          title="Go Back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

export default DetailsScreen;
