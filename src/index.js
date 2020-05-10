import Router from "preact-router";
import { Provider } from "redux-zero/preact";
import { IntlProvider } from "preact-i18n";
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

const englishDefinition = {
  search: {
    search: "Search",
    loading: "Loading...",
    vendorLoadingFailed: "Failed to fetch vendors",
    noVendorFound: "No vendors found.",
  },
  counter: {
    add: "Add",
  },
  cartPreview: {
    itemCount: "{{count}} Items",
    viewCart: "View Cart",
  },
  cart: {
    billDetails: "Bill Details",
    itemTotal: "Item Total",
    taxesAndCharges: "Taxes and Charges",
    toPay: "To Pay",
    pay: "Pay ₹ {{amount}}",
  },
  token: {
    tokenNo: "Token no",
  },
  status: {
    text: {
      waiting: "Waiting",
      preparing: "Preparing",
      ready: "Ready",
      completed: "Completed",
    },
    messages: {
      waiting: "This order is yet to be started on.",
      preparing: "This order is being prepared.",
      ready: "This order is ready. Please pick it up.",
      completed: "This order is picked up.",
    },
  },
  statusMessage: {
    ordersBefore: {
      singular: "There is 1 order before this.",
      plural: "There are {{count}} orders before this.",
    },
  },
  order: {
    reorder: "Reorder",
  },
  accordian: {
    collapsed: "Show more",
    expanded: "Show less",
  },
  queueItem: {
    orderBy: "Order by <span class='ttc'>{{name}}</span>",
    start: "Start",
    ready: "Ready",
    pickedUp: "Picked Up",
  },
};

const hindiDefinition = {
  search: {
    search: "सर्च",
    loading: "लोड हो रहा है...",
    vendorLoadingFailed: "वेंडरों को लोड करने में विफल।",
    noVendorFound: "कोई वेंडर नहीं मिला।",
  },
  counter: {
    add: "जोड़ें",
  },
  cartPreview: {
    itemCount: "{{count}} आइटम",
    viewCart: "कार्ट देखें",
  },
  cart: {
    billDetails: "बिल का विवरण",
    itemTotal: "कुल मूल्य",
    taxesAndCharges: "कर और शुल्क",
    toPay: "भुगतान करने के लिए",
    pay: "₹ {{amount}} पे करे",
  },
  token: {
    tokenNo: "टोकन नं",
  },
  status: {
    text: {
      waiting: "प्रतीक्षा में",
      preparing: "तैयारी में",
      ready: "तैयार",
      completed: "संपूर्ण",
    },
    messages: {
      waiting: "यह आर्डर अभी शुरू किया जाना है।",
      preparing: "यह आर्डर तैयार किया जा रहा है।",
      ready: "यह आर्डर तैयार है। कृपया इसे उठाये।",
      completed: "इस आर्डर को उठाया गया है",
    },
  },
  statusMessage: {
    ordersBefore: {
      singular: "इससे पहले 1 आर्डर है।",
      plural: "इस से पहले {{count}} आर्डर हैं।",
    },
  },
  order: {
    reorder: "पुन आर्डर",
  },
  accordian: {
    collapsed: "ज्यादा दिखाएं",
    expanded: "कम दिखाएं",
  },
  queueItem: {
    orderBy: "<span class='ttc'>{{name}}</span> द्वारा आर्डर",
    start: "शुरू करें",
    ready: "तैयार",
    pickedUp: "संपूर्ण",
  },
};

function App() {
  return (
    <Provider store={store}>
      <IntlProvider definition={hindiDefinition}>
        <div class="sans-serif mw7 center bg-white black pt5">
          <Header />
          <Router>
            <Home path="/" />
            <Menu path="/v/:vendorId" />
            <Cart path="/cart" />
            <OrderList path="/orders" />
            <Queue path="/vendor/queue/:vendorId" />
            <PastOrders path="vendor/orders" />
            <Error type={404} default />
          </Router>
        </div>
      </IntlProvider>
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
