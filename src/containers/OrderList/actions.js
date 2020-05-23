import { route } from "preact-router";
import { fetchOrders } from "api";
import { STATUS_COMPLETE } from "utils/status";

const actions = ({ setState }) => ({
  reorder({ pastOrders }, orderId) {
    const newOrder = pastOrders.find((o) => o.orderId === orderId);
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
  getOrders({}) {
    return fetchOrders()
      .then((allOrders) =>
        allOrders.reduce(
          ({ currOrders, pastOrders }, order) =>
            order.status === STATUS_COMPLETE
              ? { currOrders, pastOrders: [...pastOrders, order] }
              : { currOrders: [...currOrders, order], pastOrders },
          { currOrders: [], pastOrders: [] }
        )
      )
      .catch((err) => {
        if (err && err.tokenIssue) route("/login");
        console.error("failed to fetch orders", err);
      });
  },
});

export default actions;
