import {
  STATUS_WAITING,
  STATUS_CLASSES,
  STATUS_TEXT,
  isStatus,
} from "utils/status";

function StatusLabel({ value, style = {}, classes = "" }) {
  const status = isStatus(value) ? value : STATUS_WAITING;
  return (
    <span
      style={{ ...style }}
      class={`br2 f5 pv1 ttu ${STATUS_CLASSES[status]} white ph2 tc ${classes}`}
    >
      {STATUS_TEXT[status]}
    </span>
  );
}

export default StatusLabel;
