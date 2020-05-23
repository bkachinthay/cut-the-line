import createStore from "redux-zero";
import { applyMiddleware } from "redux-zero/middleware";

const logger = (store) => (next, args) => (action) => {
  console.log("current state : ", store.getState());
  console.log("action : ", action.name, args);
  return next(action);
};

const intialState = {
  intl: { hindi: {}, english: {} },
  language: "english",
  queue: [], // move to vendor app
  vendorPastOrders: [], // move to vendor app
  login: { loading: false, message: "" },
  vendorId: "",
};

const middlewares = applyMiddleware(logger);
const store = createStore(intialState, middlewares);

export default store;
