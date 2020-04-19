import vendorPusher from "../../vendorPusher";
import { STATUS_COMPLETE } from "utils/status";

const actions = () => ({
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
  setStatus({ queue, vendorPastOrders }, orderId, status) {
    vendorPusher.trigger("client-order-status-updated", {
      order: { orderId, status },
    });
    if (status === STATUS_COMPLETE) {
      const updatedQueue = queue.filter((order) => order.orderId !== orderId);
      const completedOrder = queue.find((order) => order.orderId === orderId);
      vendorPusher.trigger("client-queue-length-updated", {
        queue: updatedQueue.map(({ orderId }) => orderId),
      });
      return {
        queue: updatedQueue,
        vendorPastOrders: [
          { ...completedOrder, status, tokenNo: 0 },
          ...vendorPastOrders,
        ],
      };
    }
    return {
      queue: queue.map((order) =>
        order.orderId === orderId ? { ...order, status } : order
      ),
    };
  },
});

export default actions;
