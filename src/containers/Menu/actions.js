import { fetchVendors, fetchMenu } from "api";
import { STATUS_COMPLETE } from "utils/status";

const actions = ({ setState, getState }) => ({
  getMenu({ vendors = [] }, vendorId) {
    setState({
      currVendor: { id: vendorId, name: "" },
      menu: { loading: true, payload: [], error: false },
    });

    const menuPromise = vendors.length
      ? fetchMenu(vendorId)
      : fetchVendors().then((payload) => {
          setState({
            vendors: { loading: false, payload, error: false },
          });
          return fetchMenu(vendorId);
        });

    return menuPromise
      .then((payload) => {
        const { vendors } = getState();
        const currVendor = vendors.payload.filter((v) => v.id === vendorId)[0];
        return { currVendor, menu: { loading: false, payload, error: false } };
      })
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
