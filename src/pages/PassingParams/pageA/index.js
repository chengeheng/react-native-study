import * as React from 'react';
import {View, Text, Button} from 'react-native';

class PageA extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>This is PageA</Text>
        <Button
          title="Go To PageB"
          onPress={() =>
            this.props.navigation.navigate('PageB', {
              source: 'from PageA',
            })
          }
        />
      </View>
    );
  }
}

export default PageA;
