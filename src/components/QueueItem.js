import { useState, useEffect } from "preact/hooks";
import { Text, MarkupText } from "utils/intl";
import formatDate from "utils/formatDate";
import Token from "./Token";
import ItemCount from "./ItemCount";
import Price from "./Price";
import OrderDetails from "./OrderDetails";
import StatusLabel from "./StatusLabel";
import Spinner from "./Spinner";
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
  creationTime,
  status = STATUS_WAITING,
}) {
  const [loadingStatus, updateLoadingStatus] = useState(null);
  const toggleStatus = (orderId, buttonStatus) => {
    updateLoadingStatus(buttonStatus);
    setStatus(
      orderId,
      buttonStatus === status
        ? STATUS_ORDER[STATUS_ORDER.indexOf(buttonStatus) - 1]
        : buttonStatus
    );
  };
  useEffect(() => {
    updateLoadingStatus(null);
  }, [status]);

  return (
    <div class="b--silver ba br2 pa2 shadow-1">
      <div class="flex">
        {tokenNo ? <Token value={tokenNo} /> : null}
        <div class="ml2 flex-auto">
          <h2 class="ma0 f4 lh-title">
            <MarkupText id="queueItem.orderBy" fields={{ name: customerName }}>
              Order by <span class="ttc">{customerName}</span>
            </MarkupText>
            <StatusLabel classes="fr" value={status} />
          </h2>
          <h3 class="ma0 f5 lh-title black-80">
            <ItemCount count={itemCount} /> | <Price value={price} />
          </h3>
          <h5 class="ma0 mt1 lh-title f6 silver">
            <date>{formatDate(creationTime)}</date>
          </h5>
          {/* <p class="ma0 mt2 lh-copy f5">
            <button
              class={`button-reset pv2 ph3 ba bw1 b--dark-red bg-white dark-red f5 fw5 grow pointer ttu fr`}
            >
              Restore
            </button>
          </p> */}
        </div>
      </div>
      <div class="mt3 bt b--black-20">
        <OrderDetails items={items} showPrice={false} />
      </div>
      {status !== STATUS_COMPLETE ? (
        <div class="mt3">
          <div class={`flex br3 bar ${STATUSBAR_CLASS[status]}`}>
            <button
              class={`flex-auto w-third button-reset fl pv2 tc b pointer ba br-0 bw1 b--red br--left br3 bg-transparent z-2 ${
                isCovered(status, STATUS_PREPARING) ? "white" : "red"
              }`}
              onClick={() => toggleStatus(orderId, STATUS_PREPARING)}
            >
              {loadingStatus === STATUS_PREPARING ? (
                <Spinner isSelected={isCovered(status, STATUS_PREPARING)} />
              ) : (
                <Text id="queueItem.start">Start</Text>
              )}
            </button>
            <button
              class={`flex-auto w-third button-reset fl pv2 tc b pointer ba bw1 b--red bg-transparent z-2 ${
                isCovered(status, STATUS_READY) ? "white" : "red"
              }`}
              onClick={() => toggleStatus(orderId, STATUS_READY)}
            >
              {loadingStatus === STATUS_READY ? (
                <Spinner isSelected={isCovered(status, STATUS_READY)} />
              ) : (
                <Text id="queueItem.ready">Ready</Text>
              )}
            </button>
            <button
              class={`flex-auto w-third button-reset fl pv2 tc b pointer ba bl-0 bw1 b--red br--right br3 bg-transparent z-2 ${
                isCovered(status, STATUS_COMPLETE) ? "white" : "red"
              }`}
              onClick={() => toggleStatus(orderId, STATUS_COMPLETE)}
            >
              {loadingStatus === STATUS_COMPLETE ? (
                <Spinner isSelected={isCovered(status, STATUS_COMPLETE)} />
              ) : (
                <Text id="queueItem.pickedUp">Picked Up</Text>
              )}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default QueueItem;
