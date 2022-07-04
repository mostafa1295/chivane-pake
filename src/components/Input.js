import React from "react";
import {
  View,
  Text,
  TextInput
} from "react-native";
import Colors from "../constants/Colors";




const INPU=(props)=> {
    const [focuse,setfocuse]=React.useState(false)
 
  

  return (
    



   
    <View  style={{width:"100%",height:50,alignItems:"center",...props.styleview}} >
   
    <TextInput   onFocus={() => setfocuse(true)} value={props.value} onChangeText={props.onChangeText} maxLength={props.maxLength} placeholder={props.placeholder}
        onBlur={() => setfocuse(false)} keyboardType={props.keyboardType}   style={{width:"90%",height:50,borderWidth:1,borderRadius:5,padding:10,borderColor:(focuse==true?Colors.primary:Colors.secondText3)}}/>
  
  
  <View style={{width:90,height:25,backgroundColor:"white",top:-13,position:"absolute",right:"8%",...props.stylelabel}}><Text style={{fontFamily:"Montserrat",marginRight:5,color:(focuse==true?Colors.primary:Colors.secondText3)}}>{props.label}</Text></View>
  
   </View>
 
   
  );
 }

export default INPU











 