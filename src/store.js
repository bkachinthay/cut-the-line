import createStore from "redux-zero";

const intialState = {
  vendors: { loading: false, payload: [], error: false },
  menu: { loading: true, payload: [], error: false },
  cart: {},
  orders: [],
  currVendor: {},
  queue: [],
};

const store = createStore(intialState);

export default store;
