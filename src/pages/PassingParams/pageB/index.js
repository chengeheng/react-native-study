import * as React from 'react';
import {View, Text, Button} from 'react-native';

const PageB = props => {
  let source = props.navigation.getParam('source', 'nothing');
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>This is PageB</Text>
      <Button
        title="Go To PageA"
        onPress={() => props.navigation.navigate('PageA')}
      />
      <Text style={{margin: 10}}>the text from others is:{source}</Text>
    </View>
  );
};

export default PageB;
