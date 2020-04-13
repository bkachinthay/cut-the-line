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
  STATUS_WAITING: "This order is yet to be started on.",
  STATUS_PREPARING: "This order is being prepared.",
  STATUS_READY: "This order is ready. Please pick it up.",
  STATUS_COMPLETE: "This order is picked up.",
};

export const STATUS_TEXT = {
  STATUS_WAITING: "Waiting",
  STATUS_PREPARING: "Preparing",
  STATUS_READY: "Ready",
  STATUS_COMPLETE: "Completed",
};

export const STATUS_CLASSES = {
  STATUS_WAITING: "bg-blue",
  STATUS_PREPARING: "bg-gold",
  STATUS_READY: "bg-orange",
  STATUS_COMPLETE: "bg-green",
};
