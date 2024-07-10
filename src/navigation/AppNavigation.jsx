/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/login';
import Keypad from '../screens/lock';
import BottomTabs from '../screens/tab';
import SignUp from '../screens/signUp';
import SignUpCompleted from '../screens/signUp/signUpCompleted';
import Printer from '../screens/account/printer';
import User from '../screens/account/user'
import Discount from '../screens/account/discount'
import Tax from '../screens/account/tax'
import Shop from '../screens/account/shop'
import AddUser from '../screens/account/user/add'

const Stack = createStackNavigator();
function Navigator() {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="bottom-tabs"
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add-user"
        component={AddUser}
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
      <Stack.Screen
        name="sign-up-completed"
        component={SignUpCompleted}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="printer"
        component={Printer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="user"
        component={User}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="tax"
        component={Tax}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="discount"
        component={Discount}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="shop"
        component={Shop}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export { Navigator }
