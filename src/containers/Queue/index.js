import { useEffect } from "preact/hooks";
import { connect } from "redux-zero/preact";
import QueueItem from "components/QueueItem";
import vendorPusher from "../../vendorPusher";
import actions from "./actions";

function Queue({ queue, vendorId, setOrder, setStatus, getQueueOrders }) {
  useEffect(() => {
    getQueueOrders();
  }, [getQueueOrders]);
  useEffect(() => {
    if (vendorId) {
      vendorPusher.init(vendorId, `presence-${vendorId}`, [
        ["client-order-placed", ({ order }) => setOrder(order)],
      ]);
    }
    return vendorPusher.destroy;
  }, [vendorId, setOrder]);
  return (
    <ul class="list pl0 measure center">
      {queue.length === 0 && (
        <li class="black-70 tc f4">{"No active Orders"}</li>
      )}
      {queue.map(
        ({
          orderId,
          customerId,
          itemCount,
          price,
          items,
          status,
          creationTime,
          tokenNo,
        }) => (
          <li key={orderId} class="mv3">
            <QueueItem
              orderId={orderId}
              customerName={customerId}
              itemCount={itemCount}
              price={price}
              items={items}
              setStatus={setStatus}
              status={status}
              tokenNo={tokenNo}
              creationTime={creationTime}
            />
          </li>
        )
      )}
    </ul>
  );
}

export default connect(
  ({ queue, vendorId }) => ({ queue, vendorId }),
  actions
)(Queue);
