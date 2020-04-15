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

const STATUSBAR_CLASS = {
  STATUS_PREPARING: "bar-third",
  STATUS_READY: "bar-two-third",
  STATUS_COMPLETE: "bar-complete",
  STATUS_WAITING: "",
};

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
  const toggleStatus = (orderId, buttonStatus) =>
    setStatus(
      orderId,
      buttonStatus === status
        ? STATUS_ORDER[STATUS_ORDER.indexOf(buttonStatus) - 1]
        : buttonStatus
    );

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
        <div class={`flex br3 bar ${STATUSBAR_CLASS[status]}`}>
          <button
            class={`flex-auto w-third button-reset fl pv2 tc b pointer ba br-0 bw1 b--red br--left br3 bg-transparent z-5 ${
              isCovered(status, STATUS_PREPARING) ? "white" : "red"
            }`}
            onClick={() => toggleStatus(orderId, STATUS_PREPARING)}
          >
            Start
          </button>
          <button
            class={`flex-auto w-third button-reset fl pv2 tc b pointer ba bw1 b--red bg-transparent z-5 ${
              isCovered(status, STATUS_READY) ? "white" : "red"
            }`}
            onClick={() => toggleStatus(orderId, STATUS_READY)}
          >
            Ready
          </button>
          <button
            class={`flex-auto w-third button-reset fl pv2 tc b pointer ba bl-0 bw1 b--red br--right br3 bg-transparent z-5 ${
              isCovered(status, STATUS_COMPLETE) ? "white" : "red"
            }`}
            onClick={() => toggleStatus(orderId, STATUS_COMPLETE)}
          >
            Picked up
          </button>
        </div>
      </div>
    </div>
  );
}

export default QueueItem;
