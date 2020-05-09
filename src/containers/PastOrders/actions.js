import { fetchVendorCompletedOrders } from "api";

const actions = () => ({
  getPastOrders() {
    return fetchVendorCompletedOrders()
      .then((vendorPastOrders) => ({
        vendorPastOrders,
      }))
      .catch((err) => console.error("failed to fetch past orders : ", err));
  },
});

export default actions;
