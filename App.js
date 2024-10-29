import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Temperatura" 
          component={HomeScreen} 
          options={{
            headerStyle: {
              backgroundColor: '#00796b',
            },
            headerTintColor: '#ffffff', 
            headerTitleStyle: {
              fontWeight: 'bold', 
              fontSize: 24, 
            },
            headerTitleAlign: 'center', 
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;