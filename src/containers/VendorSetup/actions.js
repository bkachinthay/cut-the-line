import { route } from "preact-router";
import { fetchVendorQueueOrders } from "../../vendor/api";
import pusher from "../../vendor/pusher";

const actions = ({ setState }) => ({
  setUp({ queue }) {
    if (queue && !queue.error) return;
    setState({ queue: { loading: true, payload: queue, error: false } });
    return fetchVendorQueueOrders()
      .then(
        ({ queueOrders, username }) => (
          pusher.init(username, username),
          {
            queue: { loading: false, payload: queueOrders, error: false },
            vendorId: username,
          }
        )
      )
      .catch((err) => {
        if (err && err.tokenIssue) route("/login");
        console.error("failed to getch queue orders : ", err);
        return { queue: { loading: false, payload: [], error: err } };
      });
  },
});

export default actions;
