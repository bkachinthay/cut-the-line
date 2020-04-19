import Router from "preact-router";
import { Provider } from "redux-zero/preact";
import store from "./store";
import Header from "containers/Header";
import Home from "containers/Home";
import Menu from "containers/Menu";
import Cart from "containers/Cart";
import OrderList from "containers/OrderList";
import Queue from "containers/Queue";
import PastOrders from "containers/PastOrders";
import Error from "components/Error";
import "tachyons/css/tachyons.css";
import "./index.css";

function App() {
  return (
    <Provider store={store}>
      <div class="sans-serif mw7 center bg-white black pt5">
        <Header />
        <Router>
          <Home path="/" />
          <Menu path="/v/:vendorId" />
          <Cart path="/cart" />
          <OrderList path="/orders" />
          <Queue path="vendor/queue/:vendorId" />
          <PastOrders path="vendor/orders" />
          <Error type={404} default />
        </Router>
      </div>
    </Provider>
  );
}

export default App;

/**
 * TODO:
 *
 * proper redirects to home or main page when data is not available.
 * add location, rating and food categories in vender card.
 * better vendor filter function
 * add dark and light themes through context.
 * sliding animation on page navigation.
 * convert lists in home and menu comps to ul.
 * add intl support for hindi, marathi etc.
 * home page should current and previous orders etc. search should be navigated from search bar
 **/
