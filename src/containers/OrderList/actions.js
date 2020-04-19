import { route } from "preact-router";

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
});

export default actions;
