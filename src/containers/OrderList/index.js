import { connect } from "redux-zero/preact";
import Order from "components/Order";

function OrderList({ orders }) {
  return (
    <ul class="list pl0 measure center">
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
        }) => (
          <li key={orderId}>
            <Order
              vendorId={vendorId}
              vendorName={vendorName}
              status={status}
              itemCount={itemCount}
              price={price}
              ordersBefore={ordersBefore}
              items={items}
            />
          </li>
        )
      )}
    </ul>
  );
}

export default connect(({ orders }) => ({ orders }))(OrderList);
