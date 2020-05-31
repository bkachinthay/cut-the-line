import { route } from "preact-router";
import pusher from "../../vendor/pusher";
import { STATUS_COMPLETE } from "utils/status";
import { setOrderStatus } from "../../vendor/api";

const actions = ({ getState }) => ({
  setStatus({}, id, newStatus) {
    return setOrderStatus(id, newStatus)
      .then(({ orderId, status }) => {
        const { queue, vendorId } = getState();
        const queueOrders = (queue && queue.payload) || [];
        pusher.trigger(vendorId, "client-order-status-updated", {
          order: { orderId, status },
        });
        const updatedQueue =
          status === STATUS_COMPLETE
            ? queueOrders.filter((order) => order.orderId !== orderId)
            : queueOrders.map((order) =>
                order.orderId === orderId ? { ...order, status } : order
              );
        if (status === STATUS_COMPLETE) {
          pusher.trigger(vendorId, "client-queue-length-updated", {
            queue: updatedQueue.map(({ orderId }) => orderId),
          });
        }
        return {
          queue: { loading: false, error: false, payload: updatedQueue },
        };
      })
      .catch((err) => {
        if (err && err.tokenIssue) route("/login");
        console.error("Failed to udpate order status : ", err);
      });
  },
});

export default actions;
