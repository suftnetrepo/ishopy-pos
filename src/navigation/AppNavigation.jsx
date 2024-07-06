/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/login';
import Keypad from '../screens/lock';
import TabScreen from '../screens/tab';
import SignUp from '../screens/signUp';

// import Test from '../screens/test';

const Stack = createStackNavigator();
function Navigator() {
  return (
    <Stack.Navigator initialRouteName="sign-up">
      <Stack.Screen
        name="home"
        component={TabScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="keypad"
        component={Keypad}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-up"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default Navigator;
