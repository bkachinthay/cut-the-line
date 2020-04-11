import { fetchVendors } from "api";

const actions = ({ setState }) => ({
  getVendors(state, q) {
    setState({
      vendors: { loading: true, payload: [], error: false },
    });

    return fetchVendors(q)
      .then((payload) => ({
        vendors: { loading: false, payload, error: false },
      }))
      .catch((error) => ({
        vendors: { loading: false, payload: [], error },
      }));
  },
});

export default actions;
