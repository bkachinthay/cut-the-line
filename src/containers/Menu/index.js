import { useEffect } from "preact/hooks";
import { connect } from "redux-zero/preact";
import { Text } from "utils/intl";
import ItemCard from "containers/ItemCard";
import CartPreview from "containers/CartPreview";
import pusher from "../../pusher";
import actions from "./actions";

function Menu({
  vendorId,
  vendorName,
  vendorDescription,
  vendorUsername,
  getMenu,
  setOrderStatus,
  setOrdersBefore,
  loading,
  payload,
  error,
}) {
  useEffect(() => {
    getMenu(vendorId);
  }, [getMenu, vendorId]);
  useEffect(() => {
    if (vendorUsername) {
      pusher.init("me", `presence-${vendorUsername}`, [
        ["client-order-status-updated", ({ order }) => setOrderStatus(order)],
        ["client-queue-length-updated", ({ queue }) => setOrdersBefore(queue)],
      ]);
    }
    return pusher.destroy;
  }, [setOrderStatus, setOrdersBefore, vendorUsername]);
  let itemsList = null;
  if (loading) {
    itemsList = <div class="black-70 tc f4">Loading...</div>;
  } else if (error) {
    itemsList = <div class="black-70 tc f4">Failed to fetch items</div>;
  } else if (payload && payload.length) {
    itemsList = payload.map(({ id, name, price, isVeg }) => (
      <ItemCard key={id} id={id} name={name} price={price} isVeg={isVeg} />
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
