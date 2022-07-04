import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home';
import Login from '../screens/login';
import Order from '../screens/order';
import Orders from '../screens/orders';
import Profile from '../screens/profile';
import Splash from '../screens/splash';
import OTPscreen from '../screens/otp';




const MainNavigate = () => {

  const Stack = createNativeStackNavigator();

  return (


    <Stack.Navigator initialRouteName="splash">
      <Stack.Screen name="splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="otp" component={OTPscreen} options={{ headerShown: false }} />
      <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="order" component={Order} options={{ headerShown: false }} />
      <Stack.Screen name="profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="orders" component={Orders} options={{ headerShown: false }} />
    </Stack.Navigator>

  );

}
export default MainNavigate