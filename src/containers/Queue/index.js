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
    vendorPusher.init(vendorId, `presence-${vendorId}`, [
      [
        "client-order-placed",
        ({ order, userId, userName }) =>
          setOrder({ ...order, customerId: userId, customerName: userName }),
      ],
    ]);
    return vendorPusher.destroy;
  }, [vendorId, setOrder]);
  return (
    <ul class="list pl0 measure center">
      {queue.length === 0 && (
        <li class="black-70 tc f4">{"No active Orders"}</li>
      )}
      {queue.map(
        ({ orderId, customerId, itemCount, price, items, status, tokenNo }) => (
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
            />
          </li>
        )
      )}
    </ul>
  );
}

export default connect(({ queue }) => ({ queue }), actions)(Queue);
