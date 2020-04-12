import { connect } from "redux-zero/preact";
import Order from "components/Order";

function OrderList({ orders }) {
  return (
    <ul class="list pl0 measure center">
      {orders.length === 0 && (
        <li class="black-70 tc f4">{"No active Orders"}</li>
      )}
      {orders.map(
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
              vendorId={vendorId}
              vendorName={vendorName}
              status={status}
              itemCount={itemCount}
              price={price}
              ordersBefore={ordersBefore}
              items={items}
              tokenNo={tokenNo}
            />
          </li>
        )
      )}
    </ul>
  );
}

export default connect(({ orders }) => ({ orders }))(OrderList);
