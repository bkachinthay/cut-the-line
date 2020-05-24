import { route } from "preact-router";
import { fetchVendorDetails, fetchIntl } from "api";
import { STATUS_COMPLETE, STATUS_READY } from "utils/status";
import { displayNotification } from "utils/notifications";

const actions = ({ setState }) => ({
  getMenu({}, vendorId) {
    setState({
      currVendor: { id: vendorId, name: "" },
      menu: { loading: true, payload: [], error: false },
    });

    fetchIntl(vendorId)
      .then((intl) => setState({ intl }))
      .catch((err) => {
        if (err && err.tokenIssue) route("/login");
        console.error("vendor intl fetch err : ", err);
      });

    return fetchVendorDetails(vendorId)
      .then(({ name, description, vendorUsername, id, items }) => ({
        currVendor: { name, description, id, vendorUsername },
        menu: { loading: false, payload: items, error: false },
      }))
      .catch((error) => {
        if (error && error.tokenIssue) route("/login");
        return {
          currVendor: {},
          menu: { loading: false, payload: [], error },
        };
      });
  },

  setOrderStatus({ currOrders, pastOrders }, { orderId, status } = {}) {
    // ignore if updated order is not in users current orders.
    if (currOrders.every((order) => order.orderId !== orderId)) {
      return;
    }

    if (status === STATUS_COMPLETE) {
      let completedOrder = currOrders.find(
        (order) => order.orderId === orderId
      );
      return {
        currOrders: currOrders.filter((order) => order.orderId !== orderId),
        pastOrders: [{ ...completedOrder, status, tokenNo: 0 }, ...pastOrders],
      };
    }

    if (status === STATUS_READY) {
      const readyOrder =
        currOrders.find((order) => order.orderId === orderId) || {};
      displayNotification(
        "Order is ready!",
        `Please pick up order with token no ${readyOrder.tokenNo} from ${readyOrder.vendorName}`
      );
    }

    return {
      currOrders: currOrders.map((order) =>
        order.orderId === orderId ? { ...order, status } : order
      ),
    };
  },
  setOrdersBefore({ currOrders }, queue) {
    return {
      currOrders: currOrders.map((order) => {
        const ordersBefore = queue.indexOf(order.orderId);
        return ordersBefore > -1 ? { ...order, ordersBefore } : order;
      }),
    };
  },
  setConnState({}, updatedState) {
    return { connState: updatedState };
  },
});

export default actions;
