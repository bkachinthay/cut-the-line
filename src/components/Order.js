import { STATUS_COMPLETE } from "utils/status";
import { Text } from "utils/intl";
import Token from "./Token";
import ItemCount from "./ItemCount";
import Price from "./Price";
import OrderDetails from "./OrderDetails";
import Accordian from "./Accordian";
import StatusLabel from "./StatusLabel";
import StatusMessage from "./StatusMessage";

function Order({
  orderId,
  // vendorId,
  vendorName,
  status,
  itemCount,
  price,
  ordersBefore,
  items,
  tokenNo,
  reorder,
}) {
  return (
    <div class="b--silver ba br2 pa2 shadow-1">
      <div class="flex">
        {tokenNo ? <Token value={tokenNo} /> : null}
        <div class="ml2 flex-auto">
          <h2 class="ma0 f4 lh-title">
            <span>{vendorName}</span>
            <StatusLabel classes="fr" value={status} />
          </h2>
          <h3 class="ma0 f5 lh-title black-80">
            <ItemCount count={itemCount} /> | <Price value={price} />
          </h3>
          <p class="ma0 mt2 lh-copy f5">
            <StatusMessage value={status} ordersBefore={ordersBefore} />{" "}
            {status === STATUS_COMPLETE ? (
              <button
                class="fr button-reset pv2 ph3 ba bw1 b--dark-red bg-white dark-red f5 fw5 grow pointer ttu"
                onClick={() => reorder(orderId)}
              >
                <Text id="order.reorder">Reorder</Text>
              </button>
            ) : null}
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
