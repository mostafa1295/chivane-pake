export const ORDER_ACTIVE = "ORDER_ACTIVE"
export const ORDER_COMPELET = "ORDER_COMPELET"
export const ORDER_DETAILS = "ORDER_DETAILS"
export const ORDER_NEW = "ORDER_NEW"


import config from "../../constants/config";
import axios from "axios";
import FormData from "form-data";


export const getorderactive = (access_token) => {
    return async (dispatch) => {
      const url = config.baseUrl + "/wp-json/chivane/v1/pake/orders";
      let Header = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      };

      return axios({
        method: "get",
        url: url,
        headers: Header,
      })
        .then(function (response) {

          const resData = response;
          const data = resData.data;
        //    console.log(data);
          dispatch({ type:ORDER_ACTIVE, data });
          return response;
        })
        .catch(function (error) {
          // console.log(error.name);
          // console.log(error.message);
          console.log(error);
        });
    };
  };





export const getordercompelet = (access_token) => {
  return async (dispatch) => {
    const url = config.baseUrl + "/wp-json/chivane/v1/pake/complete";
    const Header = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    };

    return axios({
      method: "get",
      url: url,
      headers: Header,
    })

      .then(function (response) {

        const resData = response;
        const data = resData.data;

        dispatch({ type: ORDER_COMPELET, data });
        return response;
      })
      .catch(function (error) {
        // console.log(error.name);
        // console.log(error.message);
        console.log(error);
      });
  };
};







export const getorderdetails = (access_token,ids) => {
  return async (dispatch) => {
   
    let Header = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    };
 const url = config.baseUrl + "/wp-json/chivane/v1/pake/"+ids+"/order";
    return axios({
      method: "get",
      url: url,
      headers: Header,
    })
      .then(function (response) {

        const resData = response;
        const data = resData.data;
        //    console.log(data);
        dispatch({ type: ORDER_DETAILS, data });
        return response;
      })
      .catch(function (error) {
        console.log(error.name);
        console.log(error.message);
        console.log(error);
      });
  };
};



export const getneworder = (access_token) => {
  return async (dispatch) => {
    const url = config.baseUrl + "/wp-json/chivane/v1/pake/neworder";
    let Header = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    };

    return axios({
      method: "get",
      url: url,
      headers: Header,
    })
      .then(function (response) {


        const data = response.data;
        console.log(data);
        dispatch({ type: ORDER_NEW, data });
        return response;
      })
      .catch(function (error) {
        console.log(error.name);
        console.log(error.message);
        console.log(error);
      });
  };
};




export const sendorderaccept = async (access_token,ids) => {

  const Header = {
    'Content-Type': 'application/json',
    Authorization: "Bearer " + access_token,
  }

  const url = config.baseUrl + "/wp-json/chivane/v1/pake/"+ids+"/accept"
  try {
    const response = await axios({
      method: "post",
      url: url,
      headers: Header,
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
  }
}


export const sendPakeActive = async (access_token) => {

  const Header = {
    'Content-Type': 'application/json',
    Authorization: "Bearer " + access_token,
  }

  const url = config.baseUrl + "/wp-json/chivane/v1/pake/toggle"
  try {
    const response = await axios({
      method: "post",
      url: url,
      headers: Header,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}


export const sendIdtoPake = async (access_token, ids) => {

  const Header = {
    'Content-Type': 'application/json',
    Authorization: "Bearer " + access_token,
  }

  const url = config.baseUrl + "/wp-json/chivane/v1/pake/neworder/" + ids
  try {
    const response = await axios({
      method: "post",
      url: url,
      headers: Header,
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
  }
}




export const sendTypePay = async (access_token, SwitchOn) => {

  const Header = {
    'Content-Type': 'application/json',
    Authorization: "Bearer " + access_token,
  }
  var formdata = new FormData();
  formdata.append("inlocation_way", SwitchOn);
  const url = config.baseUrl + "/wp-json/chivane/v1/pake/332/acceptcustomer"
  try {
    const response = await axios({
      method: "post",
      url: url,
      data: formdata,
      headers: Header,
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
  }
}




export const sendDeny = async (access_token) => {

  const Header = {
    'Content-Type': 'application/json',
    Authorization: "Bearer " + access_token,
  }

  const url = config.baseUrl + "/wp-json/chivane/v1/pake/338/deny"
  try {
    const response = await axios({
      method: "post",
      url: url,
      headers: Header,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}