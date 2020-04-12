import { useEffect } from "preact/hooks";
import { connect } from "redux-zero/preact";
import ItemCard from "containers/ItemCard";
import CartPreview from "containers/CartPreview";
import pusher from "../../pusher";
import actions from "./actions";

function Menu({
  vendorId,
  getMenu,
  setOrderStatus,
  setOrdersBefore,
  loading,
  payload,
  error,
}) {
  useEffect(() => {
    getMenu(vendorId);
    pusher.connect("me");
    pusher.subscribe(
      `presence-${vendorId}`,
      () => console.log("subscribe sucess", pusher),
      () => console.log("subcribe failed")
    );
    pusher.bind("client-order-status-updated", ({ order }) =>
      setOrderStatus(order)
    );
    pusher.bind("client-queue-length-updated", ({ queue }) =>
      setOrdersBefore(queue)
    );
  }, [getMenu, setOrderStatus, setOrdersBefore, vendorId]);
  const vendorName = vendorId;
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
        <h2 class="f3 ma0 lh-title">{vendorName}</h2>
        <p class="f4 ma0 mt3 lh-copy">
          Menu description some long text to goi wuth the heading shoudl not be
          too king other wse it will overflow
        </p>
      </div>
      <div class="mw6 center">{itemsList}</div>
      <CartPreview />
    </div>
  );
}

export default connect(
  ({ menu: { loading, payload, error } }) => ({ loading, payload, error }),
  actions
)(Menu);
