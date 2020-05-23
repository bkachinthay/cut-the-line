import { route } from "preact-router";
import { fetchVendorCompletedOrders } from "../../vendor/api";

const actions = () => ({
  getPastOrders() {
    return fetchVendorCompletedOrders()
      .then((vendorPastOrders) => ({
        vendorPastOrders,
      }))
      .catch((err) => {
        if (err && err.tokenIssue) route("/login");
        console.error("failed to fetch past orders : ", err);
      });
  },
});

export default actions;
