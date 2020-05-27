import { useEffect } from "preact/hooks";
import Router from "preact-router";
import { Provider } from "redux-zero/preact";
import Header from "containers/Header";
import Home from "routes/Home";
import Menu from "routes/Menu";
import Cart from "routes/Cart";
import OrderList from "routes/OrderList";
import Error from "routes/Error";
import Login from "routes/Login";
import { askNotificationPermission } from "utils/notifications";
import "tachyons/css/tachyons.css";
import "./index.css";
import store from "./store";
import IntlWrapper from "./IntlWrapper";

// "home" -> "menu" -> "cart" -> "orders"
function backURL(currPath, vendorId) {
  if (currPath === "/orders") {
    return [vendorId ? `/v/${vendorId}` : "/", "Orders"];
  } else if (currPath === "/cart") {
    return [vendorId ? `/v/${vendorId}` : "/", "Cart"];
  } else if (/^\/v\/\w+\/?$/.test(currPath)) {
    return ["/", "Vendor"];
  } else if (currPath === "/login") {
    return ["", "Login"];
  } else if (currPath === "/") {
    return ["", "Home"];
  }
  return ["/", ""];
}

const links = [
  { link: "/", label: "Home" },
  { link: "/orders", label: "All Orders" },
];

function App() {
  useEffect(() => askNotificationPermission());
  return (
    <Provider store={store}>
      <IntlWrapper>
        <div class="sans-serif mw7 center bg-white black pt5">
          <Header backURL={backURL} links={links} />
          <Router>
            <Home path="/" />
            <Login path="/login" />
            <Menu path="/v/:vendorId" />
            <Cart path="/cart" />
            <OrderList path="/orders" />
            <Error type={404} default />
          </Router>
        </div>
      </IntlWrapper>
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
