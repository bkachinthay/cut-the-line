import { route } from "preact-router";
import vendorPusher from "../../vendorPusher";
import { STATUS_COMPLETE } from "utils/status";
import {
  fetchVendorQueueOrders,
  setOrderStatus,
  fetchIdentity,
} from "../../vendor/api";

const actions = ({ getState }) => ({
  getQueueOrders() {
    return fetchVendorQueueOrders()
      .then((queue) =>
        fetchIdentity()
          .then(({ username }) => ({
            queue,
            vendorId: username,
          }))
          .catch((err) => {
            if (err && err.tokenIssue) route("/login");
            console.error("failed to fetch identity : ", err);
          })
      )
      .catch((err) => {
        if (err && err.tokenIssue) route("/login");
        console.error("failed to getch queue orders : ", err);
      });
  },
  setOrder({ queue }, order) {
    const updatedQueue = [...queue, order];
    vendorPusher.trigger("client-queue-length-updated", {
      queue: updatedQueue.map(({ orderId }) => orderId),
    });
    return { queue: updatedQueue };
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
      .catch((err) => {
        if (err && err.tokenIssue) route("/login");
        console.error("Failed to udpate order status : ", err);
      });
  },
});

export default actions;
