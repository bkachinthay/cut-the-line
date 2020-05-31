import createStore from "redux-zero";
// import { applyMiddleware } from "redux-zero/middleware";

// const logger = (store) => (next, args) => (action) => {
//   console.log("current state : ", store.getState());
//   console.log("action : ", action.name, args);
//   return next(action);
// };

const intialState = {
  vendors: { loading: false, payload: [], error: false },
  intl: { hindi: {}, english: {} },
  language: "english",
  menu: { loading: true, payload: [], error: false },
  cart: {},
  pastOrders: null,
  currOrders: null,
  currVendor: {},
  login: { loading: false, message: "" },
};

// const middlewares = applyMiddleware(logger);
// const store = createStore(intialState, middlewares);
const store = createStore(intialState);

export default store;
