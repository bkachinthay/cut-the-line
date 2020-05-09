import { route } from "preact-router";
import { placeOrder } from "api";
import sum from "utils/sum";
import pusher from "../../pusher";

const actions = ({ setState }) => ({
  setItemCount({ cart }, id, count) {
    const prevItem = cart[id];
    return { cart: { ...cart, [id]: { ...prevItem, count } } };
  },
  setOrder(state, price) {
    const {
      cart,
      currOrders,
      currVendor: { id: vendorId, name: vendorName },
    } = state;
    const items = Object.values(cart);
    // only pass necessary value to api: vendorId items { id count }
    return placeOrder({ vendorId, items })
      .then(({ orderId, tokenNo, status }) => {
        const itemCount = sum(items.map(({ count }) => count || 0));
        const order = {
          orderId,
          vendorId,
          vendorName,
          itemCount,
          price,
          items,
          status,
          tokenNo,
        };
        pusher.trigger("client-order-placed", { order });
        order.ordersBefore = null;
        setState({ cart: {}, currOrders: [order, ...currOrders] });
        route("/orders");
      })
      .catch(() => console.log("could not place order"));
  },
});

export default actions;
