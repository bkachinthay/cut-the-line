import Token from "./Token";
import Price from "./Price";
import OrderDetails from "./OrderDetails";
import Accordian from "components/Accordian";
// Waiting :- This order is yet to be started on. There are {n} orders before you.
// In Progress(Preparing) :- This order is being prepared.
// Ready :- This order is ready to be Picked up. | Please pick up your order.
// Completed(Picked up) :- This order is Completed.

function Order({
  // vendorId,
  vendorName,
  status,
  itemCount,
  price,
  ordersBefore,
  items,
}) {
  console.log("order ordersbefore : ", ordersBefore);
  return (
    <div class="b--silver br2 pa2 shadow-1">
      <div class="flex">
        <Token value={99} />
        <div class="ml2">
          <h2 class="ma0 f4 lh-title">
            <span>{vendorName}</span>
            <span class="fr ph2 pv1 bg-blue white">{status}</span>
          </h2>
          <h3 class="ma0 f5 lh-title black-80">
            {itemCount} Items | <Price value={price} />
          </h3>
          <p class="ma0 mt2 lh-copy f5">
            This order is yet to be started on. There are {ordersBefore} orders
            before this.
          </p>
        </div>
      </div>
      <Accordian classes="mt2">
        <div class="mt2 bt b--black-20">
          <OrderDetails items={items} />
        </div>
      </Accordian>
    </div>
  );
}

export default Order;
