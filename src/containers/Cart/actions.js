import { route } from "preact-router";
import { placeOrder } from "api";
import sum from "utils/sum";
import pusher from "../../pusher";

const actions = () => ({
  setItemCount({ cart }, id, count) {
    const prevItem = cart[id];
    return { cart: { ...cart, [id]: { ...prevItem, count } } };
  },
  setOrder(state, price) {
    const {
      cart,
      currVendor: { id: vendorId, name: vendorName },
      currOrders,
    } = state;
    const orderList = (currOrders && currOrders.payload) || [];
    const items = Object.values(cart).filter(({ count }) => count !== 0);
    return placeOrder({ vendorId, items })
      .then(
        ({
          orderId,
          tokenNo,
          status,
          username,
          creationTime,
          vendorUsername,
        }) => {
          const itemCount = sum(items.map(({ count }) => count || 0));
          const order = {
            orderId,
            vendorId,
            vendorName,
            vendorUsername,
            itemCount,
            price,
            items,
            status,
            tokenNo,
            customerId: username,
            creationTime,
          };
          pusher.trigger(vendorUsername, "client-order-placed", { order });
          order.ordersBefore = null;
          route("/orders");
          return {
            cart: {},
            currOrders: {
              loading: false,
              error: false,
              payload: [order, ...orderList],
            },
          };
        }
      )
      .catch((err) => {
        if (err && err.tokenIssue) route("/login");
        console.error("could not place order : ", err);
      });
  },
});

export default actions;
