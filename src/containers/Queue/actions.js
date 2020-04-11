import vendorPusher from "../../vendorPusher";

const actions = () => ({
  setOrder({ queue }, order) {
    const updatedQueue = [...queue, order];
    vendorPusher.trigger("client-queue-length-updated", {
      queue: updatedQueue.map(({ orderId }) => orderId),
    });
    return { queue: updatedQueue };
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
