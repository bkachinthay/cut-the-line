import createStore from "redux-zero";
import { applyMiddleware } from "redux-zero/middleware";

const logger = (store) => (next, args) => (action) => {
  console.log("current state : ", store.getState());
  console.log("action : ", action.name, args);
  return next(action);
};

const intialState = {
  vendors: { loading: false, payload: [], error: false },
  menu: { loading: true, payload: [], error: false },
  cart: {},
  orders: [],
  currVendor: {},
  queue: [],
};

const middlewares = applyMiddleware(logger);
const store = createStore(intialState, middlewares);

export default store;
