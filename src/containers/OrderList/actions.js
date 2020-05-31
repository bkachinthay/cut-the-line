import { route } from "preact-router";
import { fetchPastOrders } from "api";

const actions = ({ setState }) => ({
  reorder({ pastOrders }, orderId) {
    const pastOrderList = (pastOrders && pastOrders.payload) || [];
    const newOrder = pastOrderList.find((o) => o.orderId === orderId);
    if (newOrder) {
      const { vendorId, vendorName, items } = newOrder;
      const currVendor = { id: vendorId, name: vendorName };
      const cart = items.reduce(
        (acc, item) => ({ ...acc, [item.id]: item }),
        {}
      );
      setState({
        currVendor,
        cart,
      });
      route("/cart");
    }
  },
  getOrders() {
    setState({
      pastOrders: { loading: true, payload: [], error: false },
    });
    return fetchPastOrders()
      .then((payload) => ({
        pastOrders: { loading: false, payload, error: false },
      }))
      .catch((err) => {
        if (err && err.tokenIssue) route("/login");
        console.error("failed to fetch orders", err);
        return {
          pastOrders: { loading: false, payload: [], error: err },
        };
      });
  },
});

export default actions;
