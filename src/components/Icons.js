export function SearchIcon({ style = {}, classes = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={classes}
      style={{ fill: "currentColor", ...style }}
      viewBox="0 0 26 28"
      aria-hidden="true"
    >
      <path d="M18 13c0-3.859-3.141-7-7-7s-7 3.141-7 7 3.141 7 7 7 7-3.141 7-7zm8 13c0 1.094-.906 2-2 2a1.96 1.96 0 0 1-1.406-.594l-5.359-5.344a10.971 10.971 0 0 1-6.234 1.937c-6.078 0-11-4.922-11-11s4.922-11 11-11 11 4.922 11 11c0 2.219-.672 4.406-1.937 6.234l5.359 5.359c.359.359.578.875.578 1.406z" />
    </svg>
  );
}

export function VegIcon({ style = {}, classes = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={classes}
      style={{ fill: "currentColor", ...style }}
      viewBox="0 0 24 24"
    >
      <path d="M 4 2 C 2.9069372 2 2 2.9069372 2 4 L 2 20 C 2 21.093063 2.9069372 22 4 22 L 19.986328 22 C 21.088484 22 22.001048 21.075077 21.986328 19.972656 L 21.986328 19.970703 L 21.763672 3.9726562 L 21.763672 3.9707031 C 21.747857 2.8893913 20.845711 2 19.763672 2 L 4 2 z M 4 4 L 19.763672 4 L 19.986328 20 L 4 20 L 4 4 z M 11.992188 7 A 5 5 0 0 0 6.9921875 12 A 5 5 0 0 0 11.992188 17 A 5 5 0 0 0 16.992188 12 A 5 5 0 0 0 11.992188 7 z" />
    </svg>
  );
}

export function CheckIcon({ style = {}, classes = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={classes}
      style={{ fill: "currentColor", ...style }}
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  );
}

export function BackIcon({ style = {}, classes = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={classes}
      style={{ fill: "currentColor", ...style }}
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    </svg>
  );
}

export function MoreIcon({ style = {}, classes = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class={classes}
      style={{ fill: "currentColor", ...style }}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );
}
