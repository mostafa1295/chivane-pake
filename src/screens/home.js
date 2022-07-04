import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, Linking, ActivityIndicator, TouchableOpacity, FlatList } from "react-native";
import Btn from '../components/Btn';
import Colors from '../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  getneworder,
  getorderactive,
  sendPakeActive,
  sendIdtoPake,
  sendDeny,
  sendorderaccept
} from "../store/actions/userOrder"
import AsyncStorage from "@react-native-async-storage/async-storage";







function Home(props) {
  const dispatch = useDispatch();

 // const access_token = "edac48386c8d5db65e449f24050abf19c0fe9f853d6fd5f36f3bcde798a1f3792e0c36b11b0fc9114baa17c2105d65458e177d932563f647113075bda4d22715"
  const [Orderactive, setOrderactive] = useState([]);
  const [newOrder, setnewOrder] = useState([]);
  //const [loading, setloading] = useState(true);
  const [load, setload] = useState(false);
  const [loaded, setloaded] = useState(false);
  const [active, setactive] = useState("فعالسازی");
  const [accept, setaccept] = useState("تحویل گرفتم");
  const [isFetching, setIsFetching] = useState(false);
  const [isFetching1, setIsFetching1] = useState(false);
  const [access_token, setTokon] = useState();



  const url = 'geo:37.484847,-122.148386';
  const handleOpenWithLinking = () => {
    Linking.openURL(url);
  };



  useEffect(async () => {
    const token = await AsyncStorage.getItem("access_token");
    await setTokon(token);
    console.log('main token ' + access_token);

    if (access_token !== "") {
      await getorderactiveHandler();
      await getneworderHandler();
    }
  }, [access_token]);




  const getorderactiveHandler = async () => {
    try {
      setIsFetching(true);
      const res = await dispatch(getorderactive(access_token));

      if (Orderactive == "") {
        setIsFetching(false);
      }
      setOrderactive(res.data)
      //console.log(res.data);

      setIsFetching(false);


    } catch (err) {
      console.log(err);
    }
  };





  const getneworderHandler = async () => {
    try {
      setIsFetching1(true);
      const respo = await dispatch(getneworder(access_token));

      console.log(respo.data);
      setnewOrder(respo.data)

      setIsFetching1(false);
    } catch (err) {
      console.log(err);
    }
  };












  const sendOrderAcceptHandler = async () => {
    try {
      setloaded(true);
      await sendorderaccept(access_token);
      setaccept((accept == "تحویل گرفتم") ? "تحویل دادم" : "تحویل گرفتم")
      setloaded(false);
    } catch (err) {
      console.log(err);
    }
  };




  const sendPakeActiveHandler = async () => {
    try {
      setload(true);
      const resp = await sendPakeActive(access_token);

      //  console.log(resp.data);

      setactive((active == "غیرفعالسازی") ? "فعالسازی" : "غیرفعالسازی");

      setload(false);

    } catch (err) {
      console.log(err);
    }
  };



  const output = Object.assign({}, ...newOrder)
  const sendIdtoPakeHandler = async () => {
    try {

      await sendIdtoPake(access_token,
        output.customer.id
      );
    } catch (err) {
      console.log(err);
    }
  };






  const sendDenyHandler = async () => {
    try {

      const resp = await sendDeny(access_token);

      // console.log(resp.data);
    } catch (err) {
      console.log(err);
    }
  };



  return (

    <View style={styles.viewContainer}>

      <View style={styles.viewlogo}>
        <Image source={require("../../assets/image/logo.png")} alt="homes" style={styles.imagelogo} />
        <Text style={{ fontFamily: "Montserrat", fontSize: 15 }}>چیوانه </Text>
      </View>





      <View style={styles.viewBtn}>
        <Btn style={styles.Btnprofile}
          label="مشخصات من"
          nameicon="person-circle"
          coloricon="white"
          styleicon={styles.icon}
          onPress={() => props.navigation.navigate("profile")}
        />



        <Btn style={styles.Btnorder}
          touchableStyle={{ backgroundColor: Colors.secondary }}
          label="سفارشات قبلی"
          nameicon="list"
          coloricon="white"
          styleicon={styles.icon}
          onPress={() => props.navigation.navigate("orders")}
        />

      </View>



      <View style={{
        flexDirection: "row",
        width: "86%",
        height: 50,
        borderRadius: 5,
        left: 25,
        marginTop: 10,
        backgroundColor: (active == "غیرفعالسازی") ? Colors.success : Colors.primary
      }}>
        <Text style={styles.textactivity}>وضعیت فعالیت شما: {(active == "غیرفعالسازی") ? "فعال" : "غیرفعال "}</Text>

        <Btn style={styles.Btnactivity}
          touchableStyle={{ backgroundColor: Colors.background }}
          label={active}
          textStyle={{ color: (active == "غیرفعالسازی") ? Colors.success : Colors.primary, position: "absolute" }}
          onPress={sendPakeActiveHandler}
          loading={load}
          colorspin={Colors.success}
          sizespin={25}
        />

      </View>




      <View style={styles.viewtitle}>
        <Text style={styles.texttitle} >سفارشات فعال</Text>
      </View>








      <FlatList

        onRefresh={getorderactiveHandler}
        refreshing={isFetching}
        data={Orderactive}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) =>
          <TouchableOpacity style={styles.viewcard} onPress={() => props.navigation.navigate("order", {
            ids: item.id
          })}>
            <View style={styles.viewcardRight}>

              <MaterialCommunityIcons name="circle" color={Colors.primary} size={12} style={styles.iconcardRight1} />
              <Text style={styles.textcardRight1}>آدرس فروشنده</Text>
              <Text style={styles.textcardRight2}>{item.seller.address.street_1} </Text>

              <MaterialCommunityIcons name="circle" color={Colors.primary} size={12} style={styles.iconcardRight2} />
              <Text style={styles.textcardRight3}>آدرس خریدار</Text>
              <Text style={styles.textcardRight4}>{item.customer.address_1}</Text>

            </View>


            <View style={styles.viewcardLeft}>
              <Text style={styles.textcode}>کد: {item.code} </Text>
              <Btn style={styles.Btncard1}
                touchableStyle={{ backgroundColor: Colors.success, height: 35 }}
                label={accept}
                textStyle={{ position: "absolute" }}
                onPress={sendOrderAcceptHandler}
                loading={loaded}
                colorspin={Colors.background}
                sizespin={20}
              />

              <Btn style={styles.Btncard2}
                touchableStyle={{ backgroundColor: Colors.secondary, height: 35 }}
                label="لوکیشن"
                textStyle={{ position: "absolute" }}
                onPress={handleOpenWithLinking}
              />

            </View>
          </TouchableOpacity>
        }
        keyExtractor={item => item.id}
      />

      {/* {(loading ?

          <View style={{ width: "100%", height: 20, alignItems: "center" }} >
            <ActivityIndicator
              animating={loading} size={30} color={Colors.primary} />
          </View>
          :


          Orderactive.map((item, i) => {
            return (
              <TouchableOpacity key={i} style={styles.viewcard} onPress={() => props.navigation.navigate("order")}>
                <View style={styles.viewcardRight}>

                  <MaterialCommunityIcons name="circle" color={Colors.primary} size={12} style={styles.iconcardRight1} />
                  <Text style={styles.textcardRight1}>آدرس فروشنده</Text>
                  <Text style={styles.textcardRight2}>{item.seller.address.street_1} </Text>

                  <MaterialCommunityIcons name="circle" color={Colors.primary} size={12} style={styles.iconcardRight2} />
                  <Text style={styles.textcardRight3}>آدرس خریدار</Text>
                  <Text style={styles.textcardRight4}>{item.customer.address_1}</Text>

                </View>


                <View style={styles.viewcardLeft}>
                  <Text style={styles.textcode}>کد: {item.code} </Text>
                  <Btn style={styles.Btncard1}
                    touchableStyle={{ backgroundColor: Colors.success, height: 35 }}
                    label={accept}
                    textStyle={{ position: "absolute" }}
                    onPress={sendOrderAcceptHandler}
                    loading={loaded}
                    colorspin={Colors.background}
                    sizespin={20}
                  />

                  <Btn style={styles.Btncard2}
                    touchableStyle={{ backgroundColor: Colors.secondary, height: 35 }}
                    label="لوکیشن"
                    textStyle={{ position: "absolute" }}
                    onPress={handleOpenWithLinking}
                  />

                </View>
              </TouchableOpacity>

            )

          })
        )} */}





      <View style={styles.viewtitle}>
        <Text style={styles.texttitle} >سفارشات در انتظار تایید</Text>
      </View>

      <FlatList

        onRefresh={getneworderHandler}
        refreshing={isFetching1}
        data={newOrder}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) =>
          <View style={styles.viewcard}>

            <View style={styles.viewcardRight}>

              <MaterialCommunityIcons name="circle" color={Colors.primary} size={12} style={styles.iconcardRight1} />
              <Text style={styles.textcardRight1}>آدرس فروشنده</Text>
              <Text style={styles.textcardRight2}></Text>

              <MaterialCommunityIcons name="circle" color={Colors.primary} size={12} style={styles.iconcardRight2} />
              <Text style={styles.textcardRight3}>آدرس خریدار</Text>
              <Text style={styles.textcardRight4}>{item.customer.address_1}</Text>

            </View>


            <View style={styles.viewcardLeft}>
              <Text style={styles.textcode}>کد: {item.code} </Text>
              <Btn style={styles.Btncard1}
                touchableStyle={{ backgroundColor: Colors.success, height: 35 }}
                label="قبول"
                textStyle={{ position: "absolute" }}
                onPress={sendIdtoPakeHandler}
              />
              <Btn style={styles.Btncard2}
                touchableStyle={{ backgroundColor: Colors.primarydark, height: 35 }}
                label="رد"
                textStyle={{ position: "absolute" }}
                onPress={sendDenyHandler}
              />
            </View>
          </View>
        }
        keyExtractor={item => item.id}
      />


      {/* {newOrder.map((item, i) => {
          return (
            <View key={i} style={styles.viewcard}>

              <View style={styles.viewcardRight}>

                <MaterialCommunityIcons name="circle" color={Colors.primary} size={12} style={styles.iconcardRight1} />
                <Text style={styles.textcardRight1}>آدرس فروشنده</Text>
                <Text style={styles.textcardRight2}></Text>

                <MaterialCommunityIcons name="circle" color={Colors.primary} size={12} style={styles.iconcardRight2} />
                <Text style={styles.textcardRight3}>آدرس خریدار</Text>
                <Text style={styles.textcardRight4}>{item.customer.address_1}</Text>

              </View>


              <View style={styles.viewcardLeft}>
                <Text style={styles.textcode}>کد: {item.code} </Text>
                <Btn style={styles.Btncard1}
                  touchableStyle={{ backgroundColor: Colors.success, height: 35 }}
                  label="قبول"
                  textStyle={{ position: "absolute" }}
                  onPress={sendIdtoPakeHandler}
                />
                <Btn style={styles.Btncard2}
                  touchableStyle={{ backgroundColor: Colors.primarydark, height: 35 }}
                  label="رد"
                  textStyle={{ position: "absolute" }}
                  onPress={sendDenyHandler}
                />
              </View>
            </View>
          )
        })} */}
















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
    marginRight: "10%",
    marginBottom: 5
  },
  viewBtn: {
    flexDirection: "row-reverse",
    width: "100%",
    height: 150,
  },
  Btnprofile: {
    width: "45%",
    height: 100,
    marginTop: 30,
    marginRight: 15
  },
  Btnorder: {
    width: "45%",
    height: 100,
    marginTop: 30
  },
  icon: {
    position: "absolute",
    bottom: "65%",
    left: "80%"
  },
  viewactivity: {
    flexDirection: "row",
    width: "86%",
    height: 50,
    borderRadius: 5,
    left: 25,
    marginTop: 10,

  },
  textactivity: {
    fontFamily: "Montserrat",
    fontSize: 13,
    position: "absolute",
    right: 20,
    marginTop: 13,
    color: Colors.background
  },
  Btnactivity: {
    width: "35%",
    height: 40,
    marginTop: 8,
    position: "absolute",
    left: 18
  },
  viewtitle: {
    width: "100%",
    height: 30,
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10
  },
  texttitle: {
    fontFamily: "MontserratBold",
    fontSize: 18,
    color: "black",
    marginRight: "7%",
  },
  viewcard: {
    flexDirection: "row-reverse",
    width: "86%",
    height: 250,
    borderWidth: 3,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    left: 27,
    marginBottom: 15,
    borderColor: Colors.secondText2

  },
  viewcardRight: {
    width: "50%",
    height: "100%"
  },
  iconcardRight1: {
    position: "absolute",
    right: 20,
    top: 30
  },
  textcardRight1: {
    fontFamily: "MontserratBold",
    fontSize: 15,
    color: "black",
    position: "absolute",
    top: 23,
    right: 40
  },
  textcardRight2: {
    fontFamily: "MontserratLight",
    fontSize: 15,
    position: "absolute",
    top: 55,
    right: 40
  },
  iconcardRight2: {
    position: "absolute",
    right: 20,
    bottom: 100
  },
  textcardRight3: {
    fontFamily: "MontserratBold",
    fontSize: 15,
    color: "black",
    position: "absolute",
    bottom: 93,
    right: 40
  },
  textcardRight4: {
    fontFamily: "MontserratLight",
    fontSize: 15,
    position: "absolute",
    bottom: 40,
    right: 40
  },
  viewcardLeft: {
    width: "50%",
    height: "100%",
    flexDirection: "column"
  },
  textcode: {
    fontFamily: "MontserratLight",
    fontSize: 13,
    position: "absolute",
    left: 30,
    top: 60
  },
  Btncard1: {
    width: "60%",
    position: "absolute",
    top: 95,
    left: 20
  },
  Btncard2: {
    width: "60%",
    position: "absolute",
    bottom: 50,
    left: 20
  }



})
export default Home