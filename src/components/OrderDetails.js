import { VegIcon } from "components/Icons";
import Price from "components/Price";

function OrderDetails({ items = [], showPrice = true }) {
  return (
    <div>
      {/* <h3 class="f4 ma0 mt2">Order details</h3> */}
      <ul class="list pl0 mt2">
        {items.map(({ id, name, count, isVeg, price }) => (
          <li class="f5 lh-copy flex items-start" key={id}>
            <div class="flex-none">
              <VegIcon
                classes="w1 mt1"
                style={{
                  fill: isVeg ? "#008000" : "#d40000",
                }}
              />
            </div>
            <span class="ml1 flex-auto">
              {name} ✖ {count}
            </span>
            {showPrice ? (
              <span class="flex-none w3 ml1">
                <Price value={price * count} />
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderDetails;
