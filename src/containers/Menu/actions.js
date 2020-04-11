import { fetchVendors, fetchMenu } from "api";

const actions = ({ setState, getState }) => ({
  getMenu({ vendors = [] }, vendorId) {
    setState({
      currVendor: null,
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
        currVendor: null,
        menu: { loading: false, payload: [], error },
      }));
  },
  setOrderStatus({ orders }, { orderId, status } = {}) {
    return {
      orders: orders.map((order) =>
        order.orderId === orderId ? { ...order, status } : order
      ),
    };
  },
  setOrdersBefore({ orders }, queue) {
    return {
      orders: orders.map((order) => {
        const ordersBefore = queue.indexOf(order.orderId);
        return ordersBefore > -1 ? { ...order, ordersBefore } : order;
      }),
    };
  },
});

export default actions;
