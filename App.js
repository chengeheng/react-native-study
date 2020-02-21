import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './src/pages/home';
import DetailsScreen from './src/pages/detail';
import PassingParams from './src/pages/PassingParams';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: '首页',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        gestureEnabled: true,
      },
    },
    Details: DetailsScreen,
    PassingParams: {
      screen: PassingParams,
      navigationOptions: {
        title: '参数传递',
      },
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    navigationOptions: {
      tabBarLabel: 'Home!',
    },
  },
);
const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
