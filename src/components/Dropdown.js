import { useState } from "preact/hooks";
import { route } from "preact-router";
import { MoreIcon } from "components/Icons";

function Dropdown({ align, links = [] }) {
  const [showContent, setShowContent] = useState(false);
  const alignStyle = align === "left" ? { right: "50%" } : { left: "50%" };
  return (
    <div class="relative">
      <button
        class="button-reset bn bg-inherit hover-bg-black-10 white pointer pv1 br-100"
        onclick={() => setShowContent(!showContent)}
      >
        <MoreIcon classes="w2" />
      </button>
      <div
        class={`fixed top-0 left-0 w-100 h-100 z-4 ${
          showContent ? "db" : "dn"
        }`}
        onClick={() => setShowContent(false)}
      />
      <div
        class={`absolute bg-white w5 black f4 z-5 shadow-5 ${
          showContent ? "db" : "dn"
        }`}
        style={{ top: "50%", ...alignStyle }}
      >
        {links.map(({ link, label, callback }) => (
          <li
            role="button"
            onClick={() => {
              setShowContent(false);
              if (link) {
                route(link);
              } else if (typeof callback === "function") {
                callback();
              }
            }}
            class="db hover-bg-black-10 fn black pointer f4 pa3 tl"
          >
            {label}
          </li>
        ))}
      </div>
    </div>
  );
}

export default Dropdown;
