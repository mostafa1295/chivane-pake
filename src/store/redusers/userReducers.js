import { LOGIN, GET_USER, SET_TOKEN } from "../actions/userReducers"


const initialState = {

  login_msg: null,
  access_token: null,
  user_id: null,
  first_name: null,
  last_name: null,
  phone: null,
  melicode: null,
  access_token:null,
}




export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, data: action.data }
    case GET_USER:
      return { ...state, datauser: action.data }
    case SET_TOKEN:
      return { ...state, access_token: action.access_token };

    default:
      return state;
  }
}

