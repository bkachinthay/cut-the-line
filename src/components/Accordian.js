import { useState } from "preact/hooks";

function Accordian({
  children = null,
  collapsedLabel = "Show more",
  expandedLabel = "Show less",
  classes = "",
  style = {}
}) {
  const [expanded, toggleExpanded] = useState(false);
  return (
    <div class={classes} style={{ ...style }}>
      <div class={expanded ? "" : "dn"}>{children}</div>
      <a
        class="mt2 db ttu b no-underline red pointer"
        onClick={() => toggleExpanded(!expanded)}
      >
        {expanded ? expandedLabel : collapsedLabel}
      </a>
    </div>
  );
}

export default Accordian;
