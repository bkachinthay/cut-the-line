import { Text } from "utils/intl";
// Waiting :- This order is yet to be started on. There are {n} orders before you.
// In Progress(Preparing) :- This order is being prepared.
// Ready :- This order is ready to be Picked up. | Please pick up your order.
// Completed(Picked up) :- This order is Completed.

export const STATUS_WAITING = "STATUS_WAITING";
export const STATUS_PREPARING = "STATUS_PREPARING";
export const STATUS_READY = "STATUS_READY";
export const STATUS_COMPLETE = "STATUS_COMPLETE";

export const STATUS_ORDER = [
  STATUS_WAITING,
  STATUS_PREPARING,
  STATUS_READY,
  STATUS_COMPLETE,
];

export function isStatus(value) {
  return STATUS_ORDER.indexOf(value) > -1;
}

export const STATUS_MESSAGE = {
  STATUS_WAITING: (
    <Text id="status.messages.waiting">
      This order is yet to be started on.
    </Text>
  ),
  STATUS_PREPARING: (
    <Text id="status.messages.preparing">This order is being prepared.</Text>
  ),
  STATUS_READY: (
    <Text id="status.messages.ready">
      This order is ready. Please pick it up.
    </Text>
  ),
  STATUS_COMPLETE: (
    <Text id="status.messages.completed">This order is picked up.</Text>
  ),
};

export const STATUS_TEXT = {
  STATUS_WAITING: <Text id="status.text.waiting">Waiting</Text>,
  STATUS_PREPARING: <Text id="status.text.preparing">Preparing</Text>,
  STATUS_READY: <Text id="status.text.ready">Ready</Text>,
  STATUS_COMPLETE: <Text id="status.text.completed">Completed</Text>,
};

export const STATUS_CLASSES = {
  STATUS_WAITING: "bg-blue",
  STATUS_PREPARING: "bg-gold",
  STATUS_READY: "bg-orange",
  STATUS_COMPLETE: "bg-green",
};
