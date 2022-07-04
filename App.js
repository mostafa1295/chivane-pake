import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigate from './src/navigation/navigate';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import userReducers from './src/store/redusers/userReducers';
import userOrder  from "./src/store/redusers/userOrder"
import { LogBox } from 'react-native';
import thunk from "redux-thunk";




function App() {
  LogBox.ignoreLogs(['Remote debugger']);
  const [loaded] = useFonts({
    Montserrat: require('./assets/font/IRANSansMobile.ttf'),
    MontserratBold: require('./assets/font/IRANSansMobileBold.ttf'),
    MontserratLight: require('./assets/font/IRANSansMobileLight.ttf'),
  });
  if (!loaded) {
    return null;
  }

  
  const appReducer=  combineReducers({
    reducer:userReducers,
     userorder:userOrder
})




const store=createStore(appReducer,applyMiddleware(thunk))

  return (
    <Provider store={store}>
    <NavigationContainer>
      <MainNavigate />
    </NavigationContainer>
     </Provider>
  );
}

export default App;
