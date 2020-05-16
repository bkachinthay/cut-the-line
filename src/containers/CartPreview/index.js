import { connect } from "redux-zero/preact";
import { Text } from "utils/intl";
import { Link } from "preact-router/match";
import ItemCount from "components/ItemCount";
import Price from "components/Price";
import sum from "utils/sum";

function CartPreview({ price, itemCount }) {
  if (!itemCount) {
    return null;
  }
  return (
    <div class="fixed left-0 bottom-0 w-100">
      <Link
        href="/cart"
        class="db no-underline center bg-red white mw6 pv3 ph3 ph4-ns flex justify-between pointer f5 fw6"
      >
        <span class="lh-copy">
          <ItemCount count={itemCount} /> | <Price value={price} />
        </span>
        <span class="lh-copy ttu">
          <Text id="cartPreview.viewCart">View Cart</Text>
        </span>
      </Link>
    </div>
  );
}

export default connect(({ cart = {} }) => ({
  price: sum(
    Object.values(cart).map(({ count, price }) =>
      count && price ? count * price : 0
    )
  ),
  itemCount: sum(Object.values(cart).map(({ count }) => count || 0)),
}))(CartPreview);
