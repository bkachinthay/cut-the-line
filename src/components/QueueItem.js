import Token from "./Token";
import Price from "./Price";
import OrderDetails from "./OrderDetails";
import StatusLabel from "./StatusLabel";
import {
  STATUS_WAITING,
  STATUS_PREPARING,
  STATUS_READY,
  STATUS_COMPLETE,
  STATUS_ORDER,
} from "utils/status";

function isCovered(status, currStatus) {
  return (
    STATUS_ORDER.indexOf(status) !== -1 &&
    STATUS_ORDER.indexOf(status) >= STATUS_ORDER.indexOf(currStatus)
  );
}

function QueueItem({
  orderId,
  customerName,
  itemCount,
  price,
  items,
  setStatus,
  tokenNo,
  status = STATUS_WAITING,
}) {
  return (
    <div class="b--silver ba br2 pa2 shadow-1">
      <div class="flex">
        <Token value={tokenNo} />
        <div class="ml2 flex-auto">
          <h2 class="ma0 f4 lh-title">
            <span>Order by {customerName}</span>
            <StatusLabel classes="fr" value={status} />
          </h2>
          <h3 class="ma0 f5 lh-title black-80">
            {itemCount} Items | <Price value={price} />
          </h3>
        </div>
      </div>
      <div class="mt3 bt b--black-20">
        <OrderDetails items={items} showPrice={false} />
      </div>
      <div class="mt3">
        <div class="flex">
          <button
            class={`flex-auto w-third button-reset fl pv2 tc b pointer ba br-0 bw1 b--dark-red br--left br3 ${
              isCovered(status, STATUS_PREPARING)
                ? "bg-dark-red white"
                : "bg-white dark-red"
            }`}
            onClick={() => setStatus(orderId, STATUS_PREPARING)}
          >
            Preparing
          </button>
          <button
            class={`flex-auto w-third button-reset fl pv2 tc b pointer ba bw1 b--dark-red ${
              isCovered(status, STATUS_READY)
                ? "bg-dark-red white"
                : "bg-white dark-red"
            }`}
            onClick={() => setStatus(orderId, STATUS_READY)}
          >
            Ready
          </button>
          <button
            class={`flex-auto w-third button-reset fl pv2 tc b pointer ba bl-0 bw1 b--dark-red br--right br3 ${
              isCovered(status, STATUS_COMPLETE)
                ? "bg-dark-red white"
                : "bg-white dark-red"
            }`}
            onClick={() => setStatus(orderId, STATUS_COMPLETE)}
          >
            Picked up
          </button>
        </div>
      </div>
    </div>
  );
}

export default QueueItem;
