
export const LOGIN = "LOGIN"; 
export const GET_USER="GET_USER"
export const SET_TOKEN="SET_TOKEN"


import config from "../../constants/config";
import axios from "axios";
import FormData from "form-data";

 export const sendOtp = async (task) => {
  var formdata = new FormData();
 formdata.append("countrycode", "+98");
 formdata.append("mobileNo", task);
 formdata.append("type", "login");

 var requestOptions = {
   method: 'POST',
   body: formdata,
 };

 fetch("https://chivane.com/wp-json/digits/v1/send_otp", requestOptions)
     .then(response => response.json())
     .then(result => console.log(result))
     .catch(error => console.log('error', error));
};




export const login = (task,otp) => {
  return async (dispatch)=>{
  var formdata = new FormData();
 formdata.append("countrycode", "+98");
 formdata.append("mobileNo", task);
 formdata.append("otp", otp);

 var requestOptions = {
   method: 'POST',
   body: formdata,
 };

return fetch("https://chivane.com/wp-json/digits/v1/one_click", requestOptions)
  .then(response => response.json())
 .then(res=>{
// console.log(res);

const data = res
  dispatch({ type: LOGIN, data});
     return res;
})
       
     .catch(error => console.log('error', error));
};
}




export const getuser = (access_token) => {
  return async (dispatch) => {
    const url = config.baseUrl + "/wp-json/chivane/v1/user";
    let Header = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    };

    return  axios({
      method: "get",
      url: url,
      headers: Header,
    })
      .then((response) => {
          // console.log(response);
          const resData = response;
          const data = resData.data;
          // console.log(data);
          dispatch({ type: GET_USER, data });
          return response;
        })
      .catch((error) => {
          console.log(error.name);
          console.log(error.message);
          console.log(error);
        });
  };
};
 








export const setAccessToken = (token) => {
  return async (dispatch) => {
    dispatch({ type: SET_TOKEN, access_token: token });
  };
};

