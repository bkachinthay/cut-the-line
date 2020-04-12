import vendorPusher from "../../vendorPusher";

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
  setStatus({ queue }, orderId, status) {
    const updatedQueue = queue.map((order) =>
      order.orderId === orderId ? { ...order, status } : order
    );
    vendorPusher.trigger("client-order-status-updated", {
      order: { orderId, status },
    });
    return { queue: updatedQueue };
  },
});

export default actions;
