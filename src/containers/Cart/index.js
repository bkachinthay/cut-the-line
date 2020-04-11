import { connect } from "redux-zero/preact";
import Counter from "components/Counter";
import { VegIcon } from "components/Icons";
import Price from "components/Price";
import { sum } from "utils";
import actions from "./actions";

function Cart({ cart, vendorName, setItemCount, setOrder }) {
  const total = sum(cart.map((item) => item.count * item.price));
  return (
    <div class="w-100 measure center">
      <div class="w-100 b--dotted b--gray bw1 bl-0 bt-0 br-0 pb2">
        <h2 class="f3 ma0 lh-title">{vendorName}</h2>
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
              <span class="db pl2 flex-auto">{name}</span>
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
        <h2 class="f3 lh-title ma0 mt2">Bill Details</h2>
        <div class="bb b--black-20 mt3">
          Item Total
          <span class="fr">
            <Price value={total} />
          </span>
        </div>
        <div class="bb b--black-20 mt3">
          Taxes and Charges
          <span class="fr">
            <Price value={0} />
          </span>
        </div>
        <div class="bb b--black-20 mt3 b">
          To Pay
          <span class="fr">
            <Price value={total} />
          </span>
        </div>
        <div class="mt4 flex justify-center">
          <a
            class="dib no-underline ba b--red bg-red grow white f3 pv2 pa3 pointer"
            onClick={() => setOrder(total)}
          >
            Pay <Price value={total} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default connect(
  ({ cart, currVendor: { vendorName } }) => ({
    cart: Object.values(cart).filter((item) => item && item.count),
    vendorName: vendorName || "",
  }),
  actions
)(Cart);
