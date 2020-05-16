import { connect } from "redux-zero/preact";
import { Text } from "utils/intl";
import Counter from "components/Counter";
import Price from "components/Price";
import { VegIcon } from "components/Icons";
import actions from "./actions";

function ItemCard({ name, price, isVeg, count, setItemCount }) {
  return (
    <div class="ba b--silver mh2 mv3 pa2 br2 flex items-start">
      <div class="flex-none">
        <VegIcon
          classes="w1"
          style={{
            fill: isVeg ? "#008000" : "#d40000",
          }}
        />
      </div>
      <div class="ph2 flex-auto">
        <h4 class="ma0 lh-title">
          <Text id={`vendorIntl.${name.replace(/\s/g, "_")}`}>{name}</Text>
        </h4>
        <span class="f5 fw3 lh-copy">
          <Price value={price} />
        </span>
      </div>
      <div class="flex-none">
        <Counter cnt={count} setCount={setItemCount} />
      </div>
    </div>
  );
}
export default connect(({ cart }, { id }) => {
  const { count = 0 } = cart[id] || {};
  return { count };
}, actions)(ItemCard);
