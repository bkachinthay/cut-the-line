import { fetchVendors } from "api";
import { route } from "preact-router";

const actions = ({ setState }) => ({
  getVendors(state, q) {
    setState({
      vendors: { loading: true, payload: [], error: false },
    });

    return fetchVendors(q)
      .then((payload) => ({
        vendors: { loading: false, payload, error: false },
      }))
      .catch((error) => {
        if (error && error.tokenIssue) route("/login");
        return {
          vendors: { loading: false, payload: [], error },
        };
      });
  },
});

export default actions;
