import pusher from "./index";

const actions = () => ({
  setOrder({ queue, vendorId }, order) {
    const queueOrders = (queue && queue.payload) || [];
    const updatedQueue = [...queueOrders, order];
    pusher.trigger(vendorId, "client-queue-length-updated", {
      queue: updatedQueue.map(({ orderId }) => orderId),
    });
    return { queue: { loading: false, error: false, payload: updatedQueue } };
  },
});

export default actions;
