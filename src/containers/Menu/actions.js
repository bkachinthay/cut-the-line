import { fetchVendorDetails, fetchIntl } from "api";
import { STATUS_COMPLETE } from "utils/status";

const actions = ({ setState }) => ({
  getMenu({}, vendorId) {
    setState({
      currVendor: { id: vendorId, name: "" },
      menu: { loading: true, payload: [], error: false },
    });

    fetchIntl(vendorId)
      .then((intl) => setState({ intl }))
      .catch((err) => console.error("vendor intl fetch err : ", err));

    return fetchVendorDetails(vendorId)
      .then(({ name, description, id, items }) => ({
        currVendor: { name, description, id },
        menu: { loading: false, payload: items, error: false },
      }))
      .catch((error) => ({
        currVendor: {},
        menu: { loading: false, payload: [], error },
      }));
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
  setTokenNo({ currOrders }, orderId, tokenNo) {
    return {
      currOrders: currOrders.map((order) =>
        order.orderId === orderId ? { ...order, tokenNo } : order
      ),
    };
  },
  setConnState({}, updatedState) {
    return { connState: updatedState };
  },
});

export default actions;
