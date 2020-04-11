import { Link } from "preact-router/match";

function VendorCard({ id, name, description }) {
  return (
    <Link
      class="db no-underline red b--light-red ba mh2 mv3 pa2 br2 shadow-hover pointer"
      href={`/v/${id}`}
    >
      <h2 class="ma0 lh-title">{name}</h2>
      <p class="f4 ma0 lh-copy">{description}</p>
    </Link>
  );
}

export default VendorCard;
