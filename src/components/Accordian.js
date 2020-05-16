import { useState } from "preact/hooks";
import { Text } from "utils/intl";

function Accordian({ children = null, classes = "", style = {} }) {
  const [expanded, toggleExpanded] = useState(false);
  return (
    <div class={classes} style={{ ...style }}>
      <div class={expanded ? "" : "dn"}>{children}</div>
      <a
        class="mt2 db ttu b no-underline red pointer"
        onClick={() => toggleExpanded(!expanded)}
      >
        {expanded ? (
          <Text id="accordian.expanded">Show less</Text>
        ) : (
          <Text id="accordian.collapsed">Show more</Text>
        )}
      </a>
    </div>
  );
}

export default Accordian;
