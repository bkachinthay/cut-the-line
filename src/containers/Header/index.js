import { connect } from "redux-zero/preact";
import { route } from "preact-router";
import Match from "preact-router/match";
import { BackIcon } from "components/Icons";

// "home" -> "menu" -> "cart" -> "orders"

function backURL(currPath, vendorId) {
  if (currPath === "/orders") {
    return [vendorId ? `/v/${vendorId}` : "", "Orders"];
  } else if (currPath === "/cart") {
    return [vendorId ? `/v/${vendorId}` : "", "Cart"];
  } else if (/^\/v\/\w+\/?$/.test(currPath)) {
    return ["/", "Vendor"];
  } else if (currPath === "/") {
    return ["", "Home"];
  }
  return ["/", ""];
}

function Header({ vendorId }) {
  return (
    <Match path="/:page/:id?">
      {({ path }) => {
        const [backUrl, heading] = backURL(path, vendorId);
        return (
          <h1 class="mv0 w-100 bg-red white f3 fw3 pa2 lh-title flex items-center fixed top-0 mw7 z-999">
            {backUrl && (
              <a
                class="w2 h2 mr3 pointer no-underline"
                onClick={() => route(backUrl)}
              >
                <BackIcon classes="w2" />
              </a>
            )}
            <span>{heading}</span>
          </h1>
        );
      }}
    </Match>
  );
}

export default connect(({ currVendor: { id: vendorId } } = {}) => ({
  vendorId,
}))(Header);
