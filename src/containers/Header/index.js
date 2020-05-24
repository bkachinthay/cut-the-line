import { connect } from "redux-zero/preact";
import { route } from "preact-router";
import Match from "preact-router/match";
import { BackIcon } from "components/Icons";
import Dropdown from "components/Dropdown";
import { logout } from "user";
import actions from "./actions";

function Header({ backURL, links, vendorId, setLanguage, language }) {
  const langaugeItem =
    language == "hindi"
      ? { label: "In English", callback: () => setLanguage("english") }
      : { label: "हिन्दी में", callback: () => setLanguage("hindi") };
  return (
    <Match path="/">
      {({ path }) => {
        const [backUrl, heading] = backURL(path, vendorId);
        const filteredLinks = links.filter(({ link }) => link !== path);
        return (
          <h1 class="mv0 w-100 bg-red white f3 fw3 pa2 lh-title flex items-center fixed top-0 mw7 z-3">
            {backUrl ? (
              <a
                class="w2 h2 mr3 pointer no-underline"
                onClick={() => route(backUrl)}
              >
                <BackIcon classes="w2" />
              </a>
            ) : (
              <div class="w2 h2" />
            )}
            <span class="flex-auto">{heading}</span>
            {path !== "/login" ? (
              <Dropdown
                align="left"
                links={[
                  ...filteredLinks,
                  langaugeItem,
                  {
                    label: "Logout",
                    callback: () => logout().then(() => route("/login")),
                  },
                ]}
              />
            ) : null}
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
