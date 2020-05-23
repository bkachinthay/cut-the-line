import { connect } from "redux-zero/preact";
import { route } from "preact-router";
import Match from "preact-router/match";
import { BackIcon } from "components/Icons";
import Dropdown from "components/Dropdown";
import actions from "./actions";

// "home" -> "menu" -> "cart" -> "orders"

function backURL(currPath, vendorId) {
  if (currPath === "/orders") {
    return [vendorId ? `/v/${vendorId}` : "/", "Orders"];
  } else if (currPath === "/cart") {
    return [vendorId ? `/v/${vendorId}` : "/", "Cart"];
  } else if (/^\/v\/\w+\/?$/.test(currPath)) {
    return ["/", "Vendor"];
  } else if (currPath === "/") {
    return ["", "Home"];
  }
  return ["/", ""];
}

function Header({ vendorId, setLanguage, language }) {
  const langaugeItem =
    language == "hindi"
      ? { label: "In English", callback: () => setLanguage("english") }
      : { label: "हिन्दी में", callback: () => setLanguage("hindi") };
  return (
    <Match path="/">
      {({ path }) => {
        const [backUrl, heading] = backURL(path, vendorId);
        return (
          <h1 class="mv0 w-100 bg-red white f3 fw3 pa2 lh-title flex items-center fixed top-0 mw7 z-3">
            {backUrl && (
              <a
                class="w2 h2 mr3 pointer no-underline"
                onClick={() => route(backUrl)}
              >
                <BackIcon classes="w2" />
              </a>
            )}
            <span class="flex-auto">{heading}</span>
            <Dropdown
              align="left"
              links={[
                { link: "/vendor/orders", label: "Completed Orders" },
                langaugeItem,
              ]}
            />
          </h1>
        );
      }}
    </Match>
  );
}

export default connect(
  ({ currVendor: { id: vendorId = "" } = {}, language } = {}) => ({
    vendorId,
    language,
  }),
  actions
)(Header);
