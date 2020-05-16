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
  getOrders({ currOrders }) {
    if (!currOrders || currOrders.length === 0) {
      return fetchOrders()
        .then((allOrders) =>
          allOrders.reduce(
            ({ currOrders, pastOrders }, order) =>
              order.status === STATUS_COMPLETE
                ? { currOrders, pastOrders: [order, ...pastOrders] }
                : { currOrders: [order, ...currOrders], pastOrders },
            { currOrders: [], pastOrders: [] }
          )
        )
        .catch((error) => console.error("failed to fetch orders", error));
    }
  },
});

export default actions;