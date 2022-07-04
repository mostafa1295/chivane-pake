
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View, Text, Image, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import INPU from '../components/Input';
import Colors from '../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { getuser } from '../store/actions/userReducers';
import AsyncStorage from "@react-native-async-storage/async-storage";




function Profile(props) {

  const dispatch = useDispatch();
 // const access_token = useSelector((store) => store.reducer.access_token);





  const [name, setname] = useState("");
  const [Family, setFamily] = useState("");
  const [Codemeli, setCodemeli] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Avatar, setAvatar] = useState("");
  const [access_token, setTokon] = useState("");


  
  useEffect(async () => {
    const token = await AsyncStorage.getItem("access_token");
    await setTokon(token);
    //console.log('main token ' + access_token);
  
    if (access_token !== "") {
      await getuserHandler();
      
    }
  }, [access_token]);

  



 

  const getuserHandler = async () => {
    try {
      const respon = await dispatch(getuser(access_token));
        console.log(respon.data);

      setname(respon.data.first_name);
      setFamily(respon.data.last_name);
      setCodemeli(respon.data.melicode);
      setMobile(respon.data.phone);
      setAvatar(respon.data.avatar);

    } catch (err) {
      console.log(err);
    }
  };

 




  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.viewContainer}>

        <View style={styles.viewlogo}>
          <Image source={require("../../assets/image/logo.png")} alt="homes" style={styles.imagelogo} />
          <Text style={{ fontFamily: "Montserrat", fontSize: 15 }}>چیوانه</Text>
        </View>


        <TouchableOpacity style={{ position: "absolute", left: 20, top: 15 }} onPress={() => props.navigation.navigate("home")}>
          <Ionicons name="arrow-back-outline" color={Colors.primary} size={30} />
        </TouchableOpacity>


        <TouchableOpacity style={styles.imagegallery}>
          <Image source={{ uri: Avatar !=="" ? Avatar : undefined }} alt="avat" style={styles.photo} />
        </TouchableOpacity>


        <INPU
          label="نام ونام خانوادگی"
          styleview={{ marginTop: 50 }}
          stylelabel={{ width: 110 }}
          value={name + " " + Family}
          
        />


        <INPU
          label="کدملی"
          styleview={{ marginTop: 40, }}
          stylelabel={{ width: 48 }}
          keyboardType="number-pad"
          value={Codemeli}
        />

        <INPU
          label="شماره موبایل"
          styleview={{ marginTop: 40, }}
          keyboardType="number-pad"
          value={Mobile}
        />


      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.background
  },
  viewlogo: {
    width: "100%",
    height: 50,
    flexDirection: "row-reverse",
    alignItems: "center",
    marginTop: 5
  },
  imagelogo: {
    width: 45,
    height: 62,
    marginRight: "5%",
    marginBottom: 5
  },
  imagegallery: {
    width: 120,
    height: 120,
    marginLeft: "35%",
    marginTop: "5%",
    borderRadius: 120,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 100
  }

})
export default Profile