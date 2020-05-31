import { STATUS_COMPLETE, STATUS_READY } from "utils/status";
import { displayNotification } from "utils/notifications";
import pusher from "./index";

const actions = () => ({
  setOrderStatus({ currOrders, pastOrders }, { orderId, status } = {}) {
    const currOrderList = (currOrders && currOrders.payload) || [];
    const pastOrderList = (pastOrders && pastOrders.payload) || [];
    // ignore if updated order is not in users current orders.
    if (currOrderList.every((order) => order.orderId !== orderId)) {
      return;
    }

    if (status === STATUS_COMPLETE) {
      const completedOrder = currOrderList.find(
        (order) => order.orderId === orderId
      );
      const updatedCurrOrderList = currOrderList.filter(
        (order) => order.orderId !== orderId
      );
      // unsubscribe from vendor of completed order if, no other orders in queue from that vendor.
      if (
        updatedCurrOrderList.every(
          (order) => order.vendorUsername !== completedOrder.vendorUsername
        )
      ) {
        pusher.unsubscribe(completedOrder.vendorUsername);
      }
      return {
        currOrders: {
          loading: false,
          error: false,
          payload: updatedCurrOrderList,
        },
        pastOrders: {
          loading: false,
          error: false,
          payload: [
            { ...completedOrder, status, tokenNo: 0 },
            ...pastOrderList,
          ],
        },
      };
    }

    if (status === STATUS_READY) {
      const readyOrder =
        currOrderList.find((order) => order.orderId === orderId) || {};
      displayNotification(
        "Order is ready!",
        `Please pick up order with token no ${readyOrder.tokenNo} from ${readyOrder.vendorName}`
      );
    }

    return {
      currOrders: {
        loading: false,
        error: false,
        payload: currOrderList.map((order) =>
          order.orderId === orderId ? { ...order, status } : order
        ),
      },
    };
  },
  setOrdersBefore({ currOrders }, queue) {
    const currOrderList = (currOrders && currOrders.payload) || [];
    return {
      currOrders: {
        loading: false,
        error: false,
        payload: currOrderList.map((order) => {
          const ordersBefore = queue.indexOf(order.orderId);
          return ordersBefore > -1 ? { ...order, ordersBefore } : order;
        }),
      },
    };
  },
  setConnState({}, updatedState) {
    return { connState: updatedState };
  },
});

export default actions;
