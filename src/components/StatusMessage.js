import { isStatus, STATUS_MESSAGE, STATUS_WAITING } from "utils/status";
import { Fragment } from "preact";
import { Text } from "utils/intl";

function StatusMessage({ value, ordersBefore }) {
  const status = isStatus(value) ? value : STATUS_WAITING;
  return (
    <Fragment>
      {STATUS_MESSAGE[status]}
      {status === STATUS_WAITING && typeof ordersBefore === "number" ? (
        <Text
          id="statusMessage.ordersBefore"
          plural={ordersBefore}
          fields={{ count: ordersBefore }}
        >
          {`There ${
            ordersBefore === 1 ? "is 1 order" : `are ${ordersBefore} orders`
          } before this.`}
        </Text>
      ) : (
        ""
      )}
    </Fragment>
  );
}

export default StatusMessage;
