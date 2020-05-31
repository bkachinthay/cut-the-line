import { route } from "preact-router";
import unique from "utils/unique";
import { fetchQueueOrders } from "../../api";
import pusher from "../../pusher";

const actions = ({ setState }) => ({
  setUp({ currOrders }) {
    if (currOrders && !currOrders.error) return;
    setState({ loading: true, payload: [], error: false });
    return fetchQueueOrders()
      .then(
        ({ queueOrders = [], username }) => (
          pusher.init(
            username,
            unique(queueOrders.map((o) => o.vendorUsername))
          ),
          { currOrders: { loading: false, payload: queueOrders, error: false } }
        )
      )
      .catch((err) => {
        console.error("failed to fetch orders", err);
        if (err && err.tokenIssue) route("/login");
        return { currOrders: { loading: false, payload: [], error: err } };
      });
  },
});

export default actions;
