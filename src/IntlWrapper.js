import { connect } from "redux-zero/preact";
import { IntlProvider } from "utils/intl";

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

function IntlWrapper({ children, language, intl: { hindi, english } }) {
  const value =
    language === "hindi"
      ? { ...hindiDefinition, vendorIntl: hindi }
      : { ...englishDefinition, vendorIntl: english };
  return <IntlProvider value={value}>{children}</IntlProvider>;
}

export default connect(({ intl, language }) => ({
  intl,
  language,
}))(IntlWrapper);
