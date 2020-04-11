import { route } from "preact-router";
import Match from "preact-router/match";
import { BackIcon } from "./Icons";

// const PAGES = ["cart", "orders"];

function backURL(currPath) {
  if (currPath === "/orders") {
    return ["/cart", "Orders"];
  } else if (currPath === "/cart") {
    return ["/v/1", "Cart"]; // use venderId from state here
  }
  // } else if (/^\/v\/[1-9]+\/?.*/.test(currentPage)) {
  // }
  return ["/", "Vender"];
}

function Header() {
  return (
    <Match path="/">
      {({ path }) => {
        const [backUrl, heading] = backURL(path);
        return (
          <h1 class="mv0 w-100 bg-red white f3 fw3 pa2 lh-title flex items-center fixed top-0 mw7 z-999">
            <a
              class="w2 h2 mr3 pointer no-underline"
              onClick={() => route(backUrl)}
            >
              <BackIcon classes="w2" />
            </a>
            <span>{heading}</span>
          </h1>
        );
      }}
    </Match>
  );
}

export default Header;
