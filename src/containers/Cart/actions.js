import { route } from "preact-router";
// import { placeOrder } from "api";
import { sum } from "utils";
import pusher from "../../pusher";

const actions = ({ setState }) => ({
  setItemCount({ cart }, id, count) {
    const prevItem = cart[id];
    return { cart: { ...cart, [id]: { ...prevItem, count } } };
  },
  setOrder(state, price) {
    console.log("order state : ", state);
    const {
      cart,
      orders,
      currVendor: { id: vendorId, name: vendorName },
    } = state;
    const itemCount = sum(Object.values(cart).map(({ count }) => count || 0));
    const order = {
      orderId: `${Math.random()}`,
      vendorId,
      vendorName,
      itemCount,
      price,
      items: Object.values(cart),
      status: "Waiting",
    };
    pusher.trigger("client-order-placed", { order });
    order.ordersBefore = null;
    setState({ orders: [order, ...orders] });
    route("/orders");
    // placeOrder(cart)
    //   .then(({ status }) => {
    //     console.log("here", status);
    //     if (status === "sucess") {
    //     }
    //   })
    //   .catch(() => console.log("could not place order"));
  },
});

export default actions;
