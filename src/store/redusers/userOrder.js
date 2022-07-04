import { ORDER_ACTIVE, ORDER_COMPELET, ORDER_DETAILS, ORDER_NEW } from "../actions/userOrder"


const initialState = {

  code: null,
  name: null,
  address: null,
  address_1: null,
  address_2: null,

  total: null,
  persian_date: null,

  pake_price: null,
  payment_type: null,
  payment_status: null,
  first_name: null,
  last_name: null,
  qty: null,
  id: null
}


export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_ACTIVE:
      return { ...state, orderdata: action.data };
    case ORDER_COMPELET:
      return { ...state, orderdatacompelet: action.data };
    case ORDER_DETAILS:
      return { ...state, details: action.data };
    case ORDER_NEW:
      return { ...state, new: action.data };






    default:
      return state
  }
}