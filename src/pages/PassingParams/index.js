import {createStackNavigator} from 'react-navigation-stack';

import PageA from '@/src/pages/PassingParams/pageA';
import PageB from './pageB';

const AppNavigator = createStackNavigator(
  {
    PageA: {
      screen: PageA,
    },
    PageB: PageB,
  },
  {
    initialRouteName: 'PageB',
    navigationOptions: {
      headerShown: false,
    },
  },
);
export default AppNavigator;
