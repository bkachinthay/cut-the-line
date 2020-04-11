import { useEffect } from "preact/hooks";
import { connect } from "redux-zero/preact";
import QueueItem from "components/QueueItem";
import vendorPusher from "../../vendorPusher";
import actions from "./actions";

function Queue({ queue, vendorId, setOrder, setStatus }) {
  useEffect(() => {
    console.log("in queue use effect", vendorId, queue);
    vendorPusher.connect(vendorId);
    vendorPusher.subscribe(
      `presence-${vendorId}`,
      () => console.log("subscribe sucess", vendorPusher),
      () => console.log("subcribe failed")
    );
    vendorPusher.bind("client-order-placed", ({ order, userId, userName }) => {
      console.log("queue recieved order : ", order);
      setOrder({ ...order, customerId: userId, customerName: userName });
    });
  }, []);
  console.log("in queue render : ", queue);
  return (
    <ul class="list pl0 measure center">
      {queue.length === 0 && (
        <li class="black-70 tc f4">{"No active Orders"}</li>
      )}
      {queue.map(
        ({ orderId, customerName, itemCount, price, items, status }) => (
          <li key={orderId}>
            <QueueItem
              orderId={orderId}
              customerName={customerName}
              itemCount={itemCount}
              price={price}
              items={items}
              setStatus={setStatus}
              status={status}
            />
          </li>
        )
      )}
    </ul>
  );
}

export default connect(({ queue }) => ({ queue }), actions)(Queue);
