import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export const parseRoutes = routes => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      {routes.map((item, index) => (
        <Stack.Screen
          key={index + 1}
          name={item.path}
          title={item.title}
          options={item.options ? {...item.options} : {title: item.title}}
          component={item.component}
        />
      ))}
    </Stack.Navigator>
  );
};
