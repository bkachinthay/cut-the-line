import { connect } from "redux-zero/preact";
import QueueItem from "components/QueueItem";
import actions from "./actions";

function Queue({ queue, setStatus }) {
  let orders = null;
  if (!queue || queue.loading) {
    orders = <li class="black-70 tc f4">{"Loading Orders..."}</li>;
  } else if (queue.error) {
    orders = <li class="black-70 tc f4">{"Failed to fetch orders."}</li>;
  } else if (queue.payload && queue.payload.length === 0) {
    orders = <li class="black-70 tc f4">{"No active Orders"}</li>;
  } else if (queue.payload && queue.payload.length) {
    orders = queue.payload.map(
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
    );
  }
  return <ul class="list pl0 measure center">{orders}</ul>;
}

export default connect(
  ({ queue, vendorId }) => ({ queue, vendorId }),
  actions
)(Queue);
