import { isStatus, STATUS_MESSAGE, STATUS_WAITING } from "utils/status";

function StatusMessage({ value, ordersBefore }) {
  const status = isStatus(value) ? value : STATUS_WAITING;
  return (
    STATUS_MESSAGE[status] +
    (status === STATUS_WAITING && typeof ordersBefore === "number"
      ? ` There ${
          ordersBefore === 1 ? "is 1 order" : `are ${ordersBefore} orders`
        } before this.`
      : "")
  );
}

export default StatusMessage;
