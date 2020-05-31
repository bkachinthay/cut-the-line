import { useEffect } from "preact/hooks";
import { connect } from "redux-zero/preact";
import Order from "components/Order";
import actions from "./actions";

function OrderList({ pastOrders, currOrders, reorder, getOrders }) {
  useEffect(() => getOrders(), [getOrders]);
  let orders = null;
  if (!currOrders || currOrders.loading || !pastOrders || pastOrders.loading) {
    orders = <li class="black-70 tc f4">{"Loading Orders..."}</li>;
  } else if (currOrders.error || pastOrders.error) {
    orders = <li class="black-70 tc f4">{"Failed to fetch Orders"}</li>;
  } else if (
    Array.isArray(currOrders.payload) &&
    Array.isArray(pastOrders.payload)
  ) {
    orders = [...currOrders.payload, ...pastOrders.payload].map(
      ({
        orderId,
        vendorId,
        vendorName,
        status,
        itemCount,
        price,
        ordersBefore,
        items,
        tokenNo,
        creationTime,
      }) => (
        <li key={orderId} class="mv3">
          <Order
            orderId={orderId}
            vendorId={vendorId}
            vendorName={vendorName}
            status={status}
            itemCount={itemCount}
            price={price}
            ordersBefore={ordersBefore}
            items={items}
            tokenNo={tokenNo}
            reorder={reorder}
            creationTime={creationTime}
          />
        </li>
      )
    );
  }
  return <ul class="list pl0 measure center">{orders}</ul>;
}

export default connect(
  ({ pastOrders, currOrders }) => ({
    pastOrders,
    currOrders,
  }),
  actions
)(OrderList);
