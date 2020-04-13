import Token from "./Token";
import Price from "./Price";
import OrderDetails from "./OrderDetails";
import Accordian from "./Accordian";
import StatusLabel from "./StatusLabel";
import StatusMessage from "./StatusMessage";

function Order({
  // vendorId,
  vendorName,
  status,
  itemCount,
  price,
  ordersBefore,
  items,
  tokenNo,
}) {
  return (
    <div class="b--silver ba br2 pa2 shadow-1">
      <div class="flex">
        <Token value={tokenNo} />
        <div class="ml2 flex-auto">
          <h2 class="ma0 f4 lh-title">
            <span>{vendorName}</span>
            <StatusLabel classes="fr" value={status} />
          </h2>
          <h3 class="ma0 f5 lh-title black-80">
            {itemCount} Items | <Price value={price} />
          </h3>
          <p class="ma0 mt2 lh-copy f5">
            <StatusMessage value={status} ordersBefore={ordersBefore} />
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
