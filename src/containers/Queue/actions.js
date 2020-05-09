import vendorPusher from "../../vendorPusher";
import { STATUS_COMPLETE } from "utils/status";
import { fetchVendorQueueOrders, setOrderStatus } from "api";

const actions = ({ getState }) => ({
  getQueueOrders() {
    return fetchVendorQueueOrders()
      .then((queue) => ({
        queue,
      }))
      .catch((err) => console.error("failed to getch queue orders : ", err));
  },
  setOrder({ queue, tokenNo }, order) {
    const updatedQueue = [...queue, { ...order, tokenNo }];
    vendorPusher.trigger("client-queue-length-updated", {
      queue: updatedQueue.map(({ orderId }) => orderId),
    });
    vendorPusher.trigger("client-token-assigned", {
      orderId: order.orderId,
      tokenNo,
    });
    return { tokenNo: tokenNo + 1, queue: updatedQueue };
  },
  setStatus({}, id, newStatus) {
    return setOrderStatus(id, newStatus)
      .then(({ orderId, status }) => {
        const { queue } = getState();
        vendorPusher.trigger("client-order-status-updated", {
          order: { orderId, status },
        });
        const updatedQueue =
          status === STATUS_COMPLETE
            ? queue.filter((order) => order.orderId !== orderId)
            : queue.map((order) =>
                order.orderId === orderId ? { ...order, status } : order
              );
        if (status === STATUS_COMPLETE) {
          vendorPusher.trigger("client-queue-length-updated", {
            queue: updatedQueue.map(({ orderId }) => orderId),
          });
        }
        return {
          queue: updatedQueue,
        };
      })
      .catch((err) => console.error("Failed to udpate order status : ", err));
  },
});

export default actions;
