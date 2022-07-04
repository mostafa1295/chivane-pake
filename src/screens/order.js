import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Switch, StyleSheet, Linking, ActivityIndicator } from 'react-native';
import Btn from '../components/Btn';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getorderdetails, sendorderaccept, sendTypePay } from '../store/actions/userOrder';
import AsyncStorage from "@react-native-async-storage/async-storage";

function Order(props) {

  const dispatch = useDispatch();
 // const access_token = "edac48386c8d5db65e449f24050abf19c0fe9f853d6fd5f36f3bcde798a1f3792e0c36b11b0fc9114baa17c2105d65458e177d932563f647113075bda4d22715"
  const [Customer, setCustomer] = useState("");
  const [Order_items, setOrder_items] = useState([]);
  const [DETAILS, setDETAILS] = useState("");
  const [loading, setloading] = useState(true);
  const [loaded, setloaded] = useState(false);
  const [SwitchOn, setSwitchOn] = useState(true);
  const [accept, setaccept] = useState("تحویل گرفتم");
  const [access_token, setTokon] = useState();


 
useEffect(async () => {
  const token = await AsyncStorage.getItem("access_token");
  await setTokon(token);
  console.log('main token ' + access_token);

  if (access_token !== "") {
    await getorderdetailsHandler();
    
  }
}, [access_token]);



console.log(props.route.params.ids);

  const getorderdetailsHandler = async () => {
    try {
      
      const res = await dispatch(getorderdetails(access_token,
        props.route.params.ids,
        ));

      // console.log(reducer);
      setCustomer(res.data.customer);
      setOrder_items(res.data.order_items);
      setDETAILS(res.data)
      setloading(false);
    } catch (err) {
      console.log(err);
    }
  };




  const sendOrderAcceptHandler = async () => {
    try {
      setloaded(true);
      await sendorderaccept(access_token,
        props.route.params.ids
        );
      setaccept(((accept == "تحویل گرفتم") ? "تحویل دادم" : "تحویل گرفتم"))
      setloaded(false);
    } catch (err) {
      console.log(err);
    }
  };










  const sendIdtoPakeHandler = async () => {
    try {

      await sendTypePay(access_token,
        SwitchOn

      );
    
    } catch (err) {
      console.log(err);
    }
  };




  const toggleSwitch = (value) => {

    setSwitchOn(value);

  };


  const url = 'geo:37.484847,-122.148386';
  const handleOpenWithLinking = () => {
    Linking.openURL(url);
  };
  const handleOpencall = () => {
    Linking.openURL(`tel:${Customer.phone}`);
  };

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

      <TouchableOpacity style={{ position: "absolute", left: 20, top: 15 }} onPress={() => props.navigation.goBack()}>
        <Ionicons name="arrow-back-outline" color={Colors.primary} size={30} />
      </TouchableOpacity>


      {loading ?
        <View style={{ width: "100%", height: 50, alignItems: "center", marginTop: 20 }} >
          <ActivityIndicator
            animating={loading} size={50} color={Colors.primary} />
        </View>
        :


        <ScrollView>




          <View style={styles.viewcardaddress}>
            <View style={{ width: "65%", }}>
              <Text style={{ fontFamily: "MontserratBold", fontSize: 15, }}>{Customer.first_name} {Customer.last_name}  </Text>
              <Text style={styles.textaddress} >{Customer.address_1}</Text>
            </View>

            <View style={{ width: "35%" }}>
              <Btn style={styles.Btnnumber}
                label={Customer.phone}
                textStyle={styles.textBtn}
                onPress={handleOpencall}

              />
              <Btn style={styles.Btnnumber}
                touchableStyle={{ backgroundColor: Colors.secondary }}
                label="لوکیشن"
                textStyle={styles.textBtn}
                onPress={handleOpenWithLinking}
              />
            </View>
          </View>

          <View style={styles.viewtitle}>
            <Text style={styles.texttitle} >اقلام سفارش </Text>
          </View>



          <ScrollView horizontal={true}
            showsHorizontalScrollIndicator={false}  >
            {Order_items.map((item, i) => {
              return (
                <View key={i} style={styles.viewscroll}>

                  <Image source={require('../../assets/image/food.png')} style={styles.imagescroll} />

                  <View style={styles.viewx2scroll}>
                    <Text style={styles.textx2scroll}>x{item.qty}</Text>
                  </View>

                  <View style={{ flexDirection: "column", alignItems: "center", }}>
                    <Text style={styles.texthotscroll}>{item.name}</Text>
                    <Text style={styles.textpricescroll}>{separate( item.total)} تومان</Text>
                  </View>
                </View>
              )
            })}




          </ScrollView>



         {accept == "تحویل گرفتم"?
          <View style={styles.viewreciev}>
            
            <Text style={styles.textreciev}>سفارش درانتظاردریافت توسط شما </Text>
            <Btn style={styles.Btnreciev}
              touchableStyle={{ backgroundColor: Colors.background }}
              label={accept}
              textStyle={{ color: Colors.primary, position: "absolute" }}
              onPress={sendOrderAcceptHandler}
              loading={loaded}
              colorspin={Colors.primary}
            sizespin={20}
            />

          </View>
          :
          <View></View>
}




          <View style={styles.viewtitle}>
            <Text style={styles.texttitle} >مشخصات سفارش </Text>
          </View>




          <View style={styles.viewboxContainer}>

            <View style={styles.viewBox1}>
              <Text style={styles.textboxRight}>شماره سفارش</Text>
              <Text style={styles.textboxLeft}>{DETAILS.code}</Text>
            </View>


            <View style={styles.viewBox}>
              <Text style={styles.textboxRight}>هزینه پیک </Text>
              <Text style={styles.textboxLeft}>{separate( DETAILS.pake_price)} تومان</Text>
            </View>



            <View style={styles.viewBox1}>
              <Text style={styles.textboxRight}>قیمت کل سفارش</Text>
              <Text style={styles.textboxLeft}>{separate (DETAILS.total_price)} تومان</Text>
            </View>


            <View style={styles.viewBox}>
              <Text style={styles.textboxRight}>نوع پرداخت</Text>
              <Text style={styles.textboxLeft}>{DETAILS.payment_type}</Text>
            </View>

            <View style={styles.viewBox1}>
              <Text style={styles.textboxRight}>وضعیت پرداخت</Text>
              <Text style={styles.textboxLeft}>{DETAILS.payment_status}</Text>
            </View>

          </View>






{accept == "تحویل گرفتم" 
?<View ></View>

:
<View>
          <View style={styles.viewtitle}>
            <Text style={styles.texttitle} >عملیات پرداخت</Text>
          </View>


          <View style={styles.viewpayment}>
            <Btn style={styles.Btnpayment}
              touchableStyle={{ backgroundColor: Colors.background }}
              label="تحویل دادم"
              textStyle={{ color: Colors.primary, position: "absolute" }}
              onPress={sendIdtoPakeHandler}
            />
            <Text style={styles.textpayment}>مبلغ قابل دریافت : { separate(DETAILS.total_price)} تومان</Text>

            {SwitchOn ? <Text style={styles.textnaghd}>نقدی</Text> : <Text style={styles.textcart}>کارتخوان</Text>}

            <Text style={styles.textnaghd}>نقدی</Text>

            <Text style={styles.textcart}>کارتخوان</Text>

            <Switch

              value={SwitchOn}
              onValueChange={toggleSwitch}
              thumbColor={Colors.secondary}
              trackColor={{ false: Colors.background, true: Colors.background }}
              style={styles.switch}
            />


          </View>

</View>

}



        </ScrollView>
      }
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
    marginRight: "5%",
    marginBottom: 5
  },
  viewcardaddress: {
    flexDirection: "row-reverse",
    width: "90%",
    height: 120,
    marginRight: "5%",
    marginTop: 40
  },
  textaddress: {
    fontFamily: "MontserratLight",
    fontSize: 15,
    marginTop: 10
  },
  Btnnumber: {
    width: "100%",
    height: 40,
    marginBottom: 5
  },
  textBtn: {
    color: Colors.background,
    position: "absolute",
    fontSize: 13
  },
  viewtitle: {
    width: "100%",
    justifyContent: "center",
    marginBottom: 15
  },
  texttitle: {
    fontFamily: "MontserratBold",
    fontSize: 18,
    color: "black",
    marginRight: "5%",
  },
  viewscroll: {
    width: 150,
    height: 190,
    flexDirection: "column",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 3,
    marginRight: 5,
    marginLeft: 5,
    overflow: "hidden",
    borderColor: Colors.secondText2


  },
  imagescroll: {
    width: 148,
    height: 120,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    left: 1,
    top: 1

  },
  viewx2scroll: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primary, position: "absolute",
    right: 12,
    top: 8
  },
  textx2scroll: {
    fontFamily: "MontserratBold",
    fontSize: 12,
    color: Colors.background, position: "absolute",
    left: 10,
    top: 2
  },
  texthotscroll: {
    fontFamily: "MontserratLight",
    fontSize: 12,
    marginTop: 8,

  },
  textpricescroll: {
    fontFamily: "Montserrat",
    fontSize: 12,
    marginTop: 6,

    color: Colors.primary
  },
  viewreciev: {
    flexDirection: "row",
    width: "90%",
    height: 50,
    borderRadius: 5,
    position: "relative",
    left: 20,
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: Colors.primary
  },
  textreciev: {
    fontFamily: "Montserrat",
    fontSize: 12,
    position: "absolute",
    right: 20,
    marginTop: 13,
    color: Colors.background
  },
  Btnreciev: {
    width: "30%",
    height: 40,
    marginTop: 7,
    position: "absolute",
    left: 18
  },
  viewboxContainer: {
    width: "90%",
    height: 290,
    left: 20
  },
  viewBox: {
    flexDirection: "row-reverse",
    width: "100%",
    height: 50,
    backgroundColor: Colors.secondText2,
  },
  viewBox1: {
    flexDirection: "row-reverse",
    width: "100%",
    height: 50,
    backgroundColor: Colors.secondText,
  },
  textboxRight: {
    fontFamily: "Montserrat",
    fontSize: 15,
    position: "absolute",
    top: 13,
    left: 25
  },
  textboxLeft: {
    fontFamily: "Montserrat",
    fontSize: 15,
    position: "absolute",
    right: 20,
    top: 13
  },
  viewpayment: {
    width: "90%",
    height: 100,
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 20,
    position: "relative",
    left: 20,
    marginBottom: 20,
    backgroundColor: Colors.primary
  },
  Btnpayment: {
    width: "30%",
    height: 40,
    position: "absolute",
    top: 30,
    left: 20
  },
  textpayment: {
    fontFamily: "Montserrat",
    fontSize: 13,
    position: "absolute",
    right: 20,
    top: 23,
    color: Colors.background
  },
  textnaghd: {
    fontFamily: "Montserrat",
    position: "absolute",
    right: 40,
    bottom: 23,
    fontSize: 13,
    color: Colors.background,
  },
  textcart: {
    fontFamily: "Montserrat",
    fontSize: 13,
    position: 'absolute',
    right: 115,
    bottom: 23,
    color: Colors.background
  },
  switch: {
    position: "absolute",
    right: 70,
    bottom: 10
  }


})
export default Order