import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import Colors from '../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { getordercompelet } from '../store/actions/userOrder';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';


function Orders(props) {
  const dispatch = useDispatch();
  //const access_token = "edac48386c8d5db65e449f24050abf19c0fe9f853d6fd5f36f3bcde798a1f3792e0c36b11b0fc9114baa17c2105d65458e177d932563f647113075bda4d22715"
  const [Ordercompelet, setOrderOrdercompelet] = useState([]);

  const [isFetching, setIsFetching] = useState(false);
  const [access_token, setTokon] = useState("");

  useEffect(async () => {

    const token = await AsyncStorage.getItem("access_token");
    await setTokon(token);


    if (access_token !== "") {
      await getordercompeletHandler();

    }
  }, [access_token]);







  const getordercompeletHandler = async () => {
    try {

      setIsFetching(true);
      const resorder = await dispatch(getordercompelet(access_token));

      if (Ordercompelet == "") {
        setIsFetching(false);
      }
      console.log(resorder.data);

      setOrderOrdercompelet(resorder.data)

      setIsFetching(false);
    } catch (err) {
      console.log(err);
    }
  };











  console.log(access_token + "orders");




  const separate = (num) => {
    let number = num.replace(/\D/g, "");
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };



  return (
    <View style={styles.viewContainer}>

      <View style={styles.viewlogo}>
        <Image source={require("../../assets/image/logo.png")} alt="homes" style={styles.imagelogo} />
        <Text style={{ fontFamily: "Montserrat", fontSize: 15 }}>چیوانه</Text>
      </View>
      <TouchableOpacity style={{ position: "absolute", left: 30, top: 15 }} onPress={() => props.navigation.navigate("home")}>
        <Ionicons name="arrow-back-outline" color={Colors.primary} size={30} />
      </TouchableOpacity>







      <View style={styles.viewtitle}>
        <Text style={styles.texttitle} >سفارشات تکمیل شده قبل </Text>
      </View>
      <FlatList
        onRefresh={getordercompeletHandler}
        refreshing={isFetching}
        data={Ordercompelet}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) =>
          <TouchableOpacity onPress={() => props.navigation.navigate("order", {
            ids: item.id
          })} style={styles.touch}>
            <View style={styles.viewRight}>
              <Text style={styles.textaddress}>
                {item.customer.address_1}
              </Text>
            </View>
            <View style={styles.viewLeft}>
              <Text style={styles.textdate}>{item.persian_date}</Text>
              <Text style={styles.textprice}>{separate(item.total)} ت</Text>
            </View>
            <View style={styles.viewline}></View>
          </TouchableOpacity>
        }
        keyExtractor={item => item.id}

      />



    </View>
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
    marginRight: "8%",
    marginBottom: 5
  },
  viewtitle: {
    width: "100%",
    height: 30,
    justifyContent: "center",
    marginTop: 20
  },
  texttitle: {
    fontFamily: "MontserratBold",
    fontSize: 18,
    color: "black",
    marginRight: "8%",
  },
  touch: {
    flexDirection: "row-reverse",
    marginTop: 20,
    marginLeft: 12,
    marginRight: 12
  },
  viewRight: {
    width: "70%",
    height: 70
  },
  textaddress: {
    fontFamily: "MontserratLight",
    fontSize: 13,
    marginRight: 20,
    marginTop: 7
  },
  viewLeft: {
    width: "30%",
    height: 70
  },
  textdate: {
    fontFamily: "MontserratLight",
    fontSize: 12,
    marginLeft: 20,
    marginTop: 7
  },
  textprice: {
    fontFamily: "MontserratLight",
    fontSize: 12,
    marginRight: 45
  },
  viewline: {
    width: "90%",
    height: 2,
    backgroundColor: Colors.secondText,
    position: "absolute",
    left: 18,
    top: 60,
  }


})
export default Orders