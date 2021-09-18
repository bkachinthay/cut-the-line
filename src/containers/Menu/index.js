import { useEffect } from "preact/hooks";
import { connect } from "redux-zero/preact";
import { Text } from "utils/intl";
import ItemCard from "containers/ItemCard";
import CartPreview from "containers/CartPreview";
import actions from "./actions";

function Menu({
  vendorId,
  vendorName,
  vendorDescription,
  getMenu,
  loading,
  payload,
  error,
}) {
  useEffect(() => {
    getMenu(vendorId);
  }, [getMenu, vendorId]);
  let itemsList = null;
  if (loading) {
    itemsList = <div class="black-70 tc f4">Loading...</div>;
  } else if (error) {
    itemsList = <div class="black-70 tc f4">Failed to fetch items</div>;
  } else if (payload && payload.length) {
    itemsList = payload.map(({ id, name, price, is_veg }) => (
      <ItemCard key={id} id={id} name={name} price={price} isVeg={is_veg} />
    ));
  }

  return (
    <div class="w-100 pb5">
      <div class="w-100 tc b--dashed b--gray bw1 bl-0 bt-0 br-0 pb4">
        <h2 class="f3 ma0 lh-title">
          <Text id="vendorIntl.name">{vendorName}</Text>
        </h2>
        <p class="f4 ma0 mt3 lh-copy">
          <Text id="vendorIntl.description">{vendorDescription}</Text>
        </p>
      </div>
      <div class="mw6 center">{itemsList}</div>
      <CartPreview />
    </div>
  );
}

export default connect(
  ({
    menu: { loading, payload, error },
    currVendor: {
      name: vendorName,
      description: vendorDescription,
      vendorUsername,
    },
  }) => ({
    loading,
    payload,
    error,
    vendorName,
    vendorDescription,
    vendorUsername,
  }),
  actions
)(Menu);
