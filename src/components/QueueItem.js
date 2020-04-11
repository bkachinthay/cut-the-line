import Token from "./Token";
import Price from "./Price";
import OrderDetails from "./OrderDetails";

const STATUS_ORDER = ["start", "ready", "complete"];

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
  status = "waiting",
}) {
  return (
    <div class="b--silver br2 pa2 shadow-1">
      <div class="flex">
        <Token value={99} />
        <div class="ml2 flex-auto">
          <h2 class="ma0 f4 lh-title">
            <span>Order by {customerName}</span>
            <span class="fr ph2 pv1 bg-blue white">{status}</span>
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
              isCovered(status, "start")
                ? "bg-dark-red white"
                : "bg-white dark-red"
            }`}
            onClick={() => setStatus(orderId, "start")}
          >
            Preparing
          </button>
          <button
            class={`flex-auto w-third button-reset fl pv2 tc b pointer ba bw1 b--dark-red ${
              isCovered(status, "ready")
                ? "bg-dark-red white"
                : "bg-white dark-red"
            }`}
            onClick={() => setStatus(orderId, "ready")}
          >
            Ready
          </button>
          <button
            class={`flex-auto w-third button-reset fl pv2 tc b pointer ba bl-0 bw1 b--dark-red br--right br3 ${
              isCovered(status, "complete")
                ? "bg-dark-red white"
                : "bg-white dark-red"
            }`}
            onClick={() => setStatus(orderId, "complete")}
          >
            Picked up
          </button>
        </div>
      </div>
    </div>
  );
}

export default QueueItem;
