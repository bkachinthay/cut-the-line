import { connect } from "redux-zero/preact";
import { Link } from "preact-router/match";
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
          {`${itemCount} Items`} | <Price value={price} />
        </span>
        <span class="lh-copy ttu">View Cart</span>
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
