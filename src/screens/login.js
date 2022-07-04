import React, { useState } from 'react';
import { Image, NativeBaseProvider, } from 'native-base';
import { View, Text, Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Btn from '../components/Btn';
import INPU from "../components/Input";
import Colors from '../constants/Colors';
import { sendOtp } from '../store/actions/userReducers';





const Login = (props) => {


  const [task, setTask] = useState("");




  const sendOtpHandler = async () => {
    try {
      await sendOtp(task)
    } catch (err) {
      console.log(err);
    }
  };
























  return (
    <NativeBaseProvider>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.viewContainer}>

          <View style={styles.viewlogo}>

            <Image source={require('../../assets/image/logo.png')} alt="image"
              style={styles.imagelogo} />


            <Text style={styles.textlogo}>چیوانه </Text>
          </View>


          <INPU
            label="شماره موبایل"
            styleview={{ marginTop: 100, }}
            keyboardType="number-pad"
            value={task}
            onChangeText={task => setTask(task)}
            maxLength={10}
            placeholder="9xx xxxxxxx"

          />




          <Btn
            label="ورود"
            style={{ marginLeft: "5%", marginTop: 150, }}
            textStyle={{ bottom: 20 }}
            onPress={
              () => {
                if (task.length === 10) {
                  sendOtpHandler();
                  props.navigation.replace("otp", {
                    number: task

                  });
                } else {
                  alert("شماره تلفن را صحیح وارد کنید")
                }
              }}
          />



        </View>
      </TouchableWithoutFeedback>
    </NativeBaseProvider>
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
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80
  },
  imagelogo: {
    width: 110,
    height: 140,
  },
  textlogo: {
    fontFamily: "Montserrat",
    fontSize: 24,
    position: "absolute",
    top: "90%"
  }
})




export default Login

