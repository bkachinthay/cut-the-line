import Router from "preact-router";
import { Provider } from "redux-zero/preact";
import Header from "containers/Header";
import Queue from "routes/Queue";
import PastOrders from "routes/PastOrders";
import Login from "routes/Login";
import Error from "routes/Error";
import "tachyons/css/tachyons.css";
import "../index.css";
import store from "./store";
import IntlWrapper from "../IntlWrapper";

// "queue" -> "completed"
function backURL(currPath) {
  if (currPath === "/completed") {
    return ["/", "Completed Orders"];
  } else if (currPath === "/") {
    return ["", "Queue"];
  }
  return ["/", ""];
}

const links = [
  { link: "/", label: "Queue" },
  { link: "/completed", label: "Completed Orders" },
];

function App() {
  return (
    <Provider store={store}>
      <IntlWrapper>
        <div class="sans-serif mw7 center bg-white black pt5">
          <Header backURL={backURL} links={links} />
          <Router>
            <Queue path="/" />
            <Login path="/login" />
            <PastOrders path="/completed" />
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
