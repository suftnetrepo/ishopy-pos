/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/navigation/AppNavigation';
import { RealmProvider } from './src/model/store'
import { seedData } from './src/model/seed'

function App(): React.JSX.Element {

  useEffect(()=>{
    async function init() {
      await seedData()
    }
    init()
  },[])
   
  return (
    <RealmProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </RealmProvider>
  );
}

export default App;
