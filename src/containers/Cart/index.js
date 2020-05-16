import { connect } from "redux-zero/preact";
import { Text } from "utils/intl";
import Counter from "components/Counter";
import { VegIcon } from "components/Icons";
import Price from "components/Price";
import sum from "utils/sum";
import actions from "./actions";

function Cart({ cart, vendorName, setItemCount, setOrder }) {
  const total = sum(cart.map((item) => item.count * item.price));
  return (
    <div class="w-100 measure center">
      <div class="w-100 b--dotted b--gray bw1 bl-0 bt-0 br-0 pb2">
        <h2 class="f3 ma0 lh-title">
          <Text id={"vendorIntl.name"}>{vendorName}</Text>
        </h2>
        <ul class="list pl0 mt3">
          {cart.map(({ id, name, price, isVeg, count }) => (
            <li class="flex items-start lh-copy mb3" key={id}>
              <div class="flex-none">
                <VegIcon
                  classes="w1 mt1"
                  style={{
                    fill: isVeg ? "#008000" : "#d40000",
                  }}
                />
              </div>
              <span class="db pl2 flex-auto">
                <Text id={`vendorIntl.${name.replace(/\s/g, "_")}`}>
                  {name}
                </Text>
              </span>
              <div class="flex-none">
                <Counter
                  cnt={count}
                  setCount={(cnt) => setItemCount(id, cnt)}
                />
              </div>
              <span class="flex-none w3 pl3">
                <Price value={price * count} />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div class="">
        <h2 class="f3 lh-title ma0 mt2">
          <Text id="cart.billDetails">Bill Details</Text>
        </h2>
        <div class="bb b--black-20 mt3">
          <Text id="cart.itemTotal">Item Total</Text>
          <span class="fr">
            <Price value={total} />
          </span>
        </div>
        <div class="bb b--black-20 mt3">
          <Text id="cart.taxesAndCharges">Taxes and Charges</Text>
          <span class="fr">
            <Price value={0} />
          </span>
        </div>
        <div class="bb b--black-20 mt3 b">
          <Text id="cart.toPay">To Pay</Text>
          <span class="fr">
            <Price value={total} />
          </span>
        </div>
        <div class="mt4 flex justify-center">
          <a
            class="dib no-underline ba b--red bg-red grow white f3 pv2 pa3 pointer"
            onClick={() => setOrder(total)}
          >
            <Text id="cart.pay" fields={{ amount: total || 0 }}>
              Pay <Price value={total} />
            </Text>
          </a>
        </div>
      </div>
    </div>
  );
}

export default connect(
  ({ cart, currVendor: { name: vendorName = "" } }) => ({
    cart: Object.values(cart).filter((item) => item && item.count),
    vendorName,
  }),
  actions
)(Cart);
