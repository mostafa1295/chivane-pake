import * as React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { View, Image, Text, StatusBar } from 'react-native';
import Colors from '../constants/Colors';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAccessToken } from '../store/actions/userReducers';
import { useDispatch } from 'react-redux';


function Splash(props) {
  const dispatch = useDispatch();
  const [animating, setAnimating] = React.useState(true);


  const chivane =async () => {

// try {
//   const access_token = await AsyncStorage.getItem("access_token");
//   if (access_token) {
//     await dispatch(setAccessToken(access_token));
//     props.navigation.replace('home')
//   }else{
//     setAnimating(false);
//      props.navigation.replace('login')
//   }
// } catch (error) {
//   console.log(e)
// }





    AsyncStorage.getItem("access_token")
      .then(Token => {
        console.log(Token);
        if (Token == null) {
          setAnimating(false);
          props.navigation.replace('login')
        } else {
          dispatch(setAccessToken(Token))
          props.navigation.replace('home')
        }
      }).catch(err => {

      });


  }





  React.useEffect(() => {
    const ac = new AbortController();


    setTimeout(() => {
      chivane();
    }, 3000);



    return () => ac.abort();
  }, []);




  return (



    <View style={styles.viewContainer}>
      <StatusBar backgroundColor="white" />
      <Image source={require('../../assets/image/logo.png')} alt="image" style={styles.image} />
      <Text style={styles.text}>
        چیوانه
      </Text >
      <ActivityIndicator color={Colors.primary} size={40} animating={animating} />

    </View>

  );
}

const styles = StyleSheet.create({
  viewContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.background,
    justifyContent: "flex-start",
    alignItems: 'center'
  },
  text: {
    color: 'black',
    fontSize: 50,
    fontFamily: "Montserrat",
    bottom: 40
  },
  image: {
    width: 150,
    height: 150,
    marginTop: "20%"
  }

})
export default Splash
