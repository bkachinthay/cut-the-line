import { connect } from "redux-zero/preact";
import QueueItem from "components/QueueItem";

function PastOrders({ vendorPastOrders }) {
  return (
    <ul class="list pl0 measure center">
      {vendorPastOrders.length === 0 && (
        <li class="black-70 tc f4">{"No past Orders"}</li>
      )}
      {vendorPastOrders.map(
        ({
          orderId,
          customerName,
          itemCount,
          price,
          items,
          status,
          tokenNo,
        }) => (
          <li key={orderId} class="mv3">
            <QueueItem
              orderId={orderId}
              customerName={customerName}
              itemCount={itemCount}
              price={price}
              items={items}
              status={status}
              tokenNo={tokenNo}
            />
          </li>
        )
      )}
    </ul>
  );
}

export default connect(({ vendorPastOrders }) => ({ vendorPastOrders }))(
  PastOrders
);
