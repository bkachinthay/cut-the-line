import { useEffect } from "preact/hooks";
import { connect } from "redux-zero/preact";
import Order from "components/Order";
import actions from "./actions";

function OrderList({ pastOrders = [], currOrders = [], reorder, getOrders }) {
  useEffect(() => getOrders(), [getOrders]);
  return (
    <ul class="list pl0 measure center">
      {/* {orders.length === 0 && (
        <li class="black-70 tc f4">{"No active Orders"}</li>
      )} */}
      {[...currOrders, ...pastOrders].map(
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
            />
          </li>
        )
      )}
    </ul>
  );
}

export default connect(
  ({ pastOrders, currOrders }) => ({
    pastOrders,
    currOrders,
  }),
  actions
)(OrderList);
